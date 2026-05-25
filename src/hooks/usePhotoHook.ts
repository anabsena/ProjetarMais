import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../services/firebase/firebase";
import { docWithId, normalizeText, paginate, sortByCreatedAtDesc } from "../services/firebase/firestore-helpers";
import { FirebasePhoto } from "../services/firebase/types";

const FIRESTORE_DOCUMENT_SAFE_LIMIT = 900_000;
const MAX_IMAGE_WIDTH = 1600;
const MAX_IMAGE_HEIGHT = 1200;
const IMAGE_QUALITY = 0.72;

const detectMimeFromBytes = (bytes: Uint8Array, fallback = "") => {
  if (bytes.length >= 8) {
    const isPng =
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a;

    if (isPng) return "image/png";
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (bytes.length >= 6) {
    const header = String.fromCharCode(...bytes.slice(0, 6));

    if (header === "GIF87a" || header === "GIF89a") {
      return "image/gif";
    }
  }

  if (bytes.length >= 12) {
    const riff = String.fromCharCode(...bytes.slice(0, 4));
    const webp = String.fromCharCode(...bytes.slice(8, 12));

    if (riff === "RIFF" && webp === "WEBP") {
      return "image/webp";
    }
  }

  const textStart = new TextDecoder("utf-8", { fatal: false })
    .decode(bytes.slice(0, Math.min(bytes.length, 512)))
    .trimStart()
    .toLowerCase();

  if (textStart.startsWith("<svg") || textStart.startsWith("<?xml") || textStart.includes("<svg")) {
    return "image/svg+xml";
  }

  return fallback || "application/octet-stream";
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
};

const readFileAsDataUrl = async (file: File): Promise<{ dataUrl: string; mimeType: string }> => {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const mimeType = detectMimeFromBytes(bytes, file.type);
  const base64 = arrayBufferToBase64(buffer);

  return {
    dataUrl: `data:${mimeType};base64,${base64}`,
    mimeType,
  };
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Erro ao carregar imagem para compactação."));
    image.src = src;
  });
};

const compressRasterImageToDataUrl = async (originalDataUrl: string, mimeType: string): Promise<string> => {
  const image = await loadImage(originalDataUrl);

  const scale = Math.min(MAX_IMAGE_WIDTH / image.width, MAX_IMAGE_HEIGHT / image.height, 1);
  const width = Math.max(Math.round(image.width * scale), 1);
  const height = Math.max(Math.round(image.height * scale), 1);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    return originalDataUrl;
  }

  context.drawImage(image, 0, 0, width, height);

  const outputType = mimeType === "image/webp" ? "image/webp" : "image/jpeg";
  const compactedDataUrl = canvas.toDataURL(outputType, IMAGE_QUALITY);

  return compactedDataUrl.length < originalDataUrl.length ? compactedDataUrl : originalDataUrl;
};

const fileToFirestoreDataUrl = async (file: File): Promise<{ dataUrl: string; mimeType: string }> => {
  const { dataUrl, mimeType } = await readFileAsDataUrl(file);

  if (mimeType.startsWith("image/") && mimeType !== "image/svg+xml" && mimeType !== "image/gif") {
    const compactedDataUrl = await compressRasterImageToDataUrl(dataUrl, mimeType);
    const compactedMimeType = compactedDataUrl.match(/^data:([^;,]+)[;,]/)?.[1] || mimeType;

    return {
      dataUrl: compactedDataUrl,
      mimeType: compactedMimeType,
    };
  }

  return { dataUrl, mimeType };
};

function usePhotoHook() {
  const photoControllerCreate = async (projectId: string, file: File) => {
    try {
      const { dataUrl: photoDataUrl, mimeType } = await fileToFirestoreDataUrl(file);

      if (photoDataUrl.length > FIRESTORE_DOCUMENT_SAFE_LIMIT) {
        return {
          status: "error",
          message:
            "Imagem muito grande para salvar direto no Firestore. Reduza/comprima a imagem e tente novamente.",
          data: null,
        };
      }

      const response = await addDoc(collection(firestore, "projectPhotos"), {
        projectId,
        photoUrl: photoDataUrl,
        photoBase64: photoDataUrl,
        fileName: file.name,
        contentType: mimeType,
        size: file.size,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Mantém uma capa também no documento do projeto.
      // Isso evita que a listagem pública dependa exclusivamente do join manual
      // na coleção projectPhotos e deixa o fluxo mais próximo do backend antigo.
      const projectRef = doc(firestore, "projects", projectId);
      const projectSnapshot = await getDoc(projectRef);

      if (projectSnapshot.exists()) {
        const projectData = projectSnapshot.data();

        if (!projectData.coverImageUrl) {
          await updateDoc(projectRef, {
            coverImageUrl: photoDataUrl,
            coverPhotoId: response.id,
            updatedAt: serverTimestamp(),
          });
        }
      }

      return {
        status: 201,
        message: "Created",
        data: {
          id: response.id,
          projectId,
          photoUrl: photoDataUrl,
          photoBase64: photoDataUrl,
          fileName: file.name,
          contentType: mimeType,
          size: file.size,
        },
      };
    } catch (error: any) {
      console.error("Error creating photo:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao enviar foto.",
        data: null,
      };
    }
  };

  const photoControllerFindAll = async (projectId = "", photos = "", page = 1, perPage = 10) => {
    try {
      const photosQuery = projectId
        ? query(collection(firestore, "projectPhotos"), where("projectId", "==", projectId))
        : query(collection(firestore, "projectPhotos"));

      const snapshot = await getDocs(photosQuery);
      let data: FirebasePhoto[] = snapshot.docs.map((photoDoc) => ({
        ...docWithId<Omit<FirebasePhoto, "id">>(photoDoc),
        photoUrl: (photoDoc.data().photoUrl as string) || (photoDoc.data().photoBase64 as string) || "",
      }));

      if (photos) {
        const search = normalizeText(photos);
        data = data.filter(
          (photo) =>
            normalizeText(photo.photoUrl).includes(search) ||
            normalizeText(photo.fileName).includes(search)
        );
      }

      data = sortByCreatedAtDesc(data);

      return {
        status: 200,
        message: "OK",
        data: paginate(data, page, perPage),
      };
    } catch (error: any) {
      console.error("Error fetching photos:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar fotos.",
        data: null,
      };
    }
  };

  const photoControllerFindOne = async (id: string) => {
    try {
      const photoSnapshot = await getDoc(doc(firestore, "projectPhotos", id));

      if (!photoSnapshot.exists()) {
        return {
          status: 404,
          message: "Foto não encontrada",
          data: null,
        };
      }

      const data = photoSnapshot.data();

      return {
        status: 200,
        message: "OK",
        data: {
          id: photoSnapshot.id,
          ...data,
          photoUrl: data.photoUrl || data.photoBase64 || "",
        },
      };
    } catch (error: any) {
      console.error("Error fetching photo:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar foto.",
        data: null,
      };
    }
  };

  const photoControllerUpdate = async (projectId: string, photos: object[]) => {
    try {
      const validFiles = photos.filter((photo): photo is File => photo instanceof File);
      const currentPhotos = await photoControllerFindAll(projectId, "", 1, 999);

      if (currentPhotos.status === 200 && currentPhotos.data?.data?.length) {
        await Promise.all(currentPhotos.data.data.map((photo) => photoControllerDelete(photo.id)));
      }

      const createdPhotos = await Promise.all(validFiles.map((file) => photoControllerCreate(projectId, file)));
      const failedUpload = createdPhotos.find((response) => response.status === "error");

      if (failedUpload) {
        return failedUpload;
      }

      return {
        status: 200,
        message: "OK",
        data: createdPhotos.map((response) => response.data).filter(Boolean),
      };
    } catch (error: any) {
      console.error("Error updating photos:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao atualizar fotos.",
        data: null,
      };
    }
  };

  const photoControllerDelete = async (photoId: string) => {
    try {
      const photoRef = doc(firestore, "projectPhotos", photoId);
      const photoSnapshot = await getDoc(photoRef);
      const photoData = photoSnapshot.exists() ? photoSnapshot.data() : null;
      const projectId = photoData?.projectId as string | undefined;
      const deletedPhotoUrl = (photoData?.photoUrl as string | undefined) || (photoData?.photoBase64 as string | undefined) || "";

      await deleteDoc(photoRef);

      if (projectId) {
        const projectRef = doc(firestore, "projects", projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (projectSnapshot.exists()) {
          const projectData = projectSnapshot.data();
          const wasCover = projectData.coverPhotoId === photoId || projectData.coverImageUrl === deletedPhotoUrl;

          if (wasCover) {
            const remainingPhotosQuery = query(collection(firestore, "projectPhotos"), where("projectId", "==", projectId));
            const remainingPhotosSnapshot = await getDocs(remainingPhotosQuery);
            const nextPhoto = remainingPhotosSnapshot.docs[0];
            const nextPhotoData = nextPhoto?.data();
            const nextCoverImageUrl = nextPhotoData
              ? ((nextPhotoData.photoUrl as string) || (nextPhotoData.photoBase64 as string) || "")
              : "";

            await updateDoc(projectRef, {
              coverImageUrl: nextCoverImageUrl,
              coverPhotoId: nextPhoto?.id || "",
              updatedAt: serverTimestamp(),
            });
          }
        }
      }

      return {
        status: 200,
        message: "OK",
        data: null,
      };
    } catch (error: any) {
      console.error("Error delete photo:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao excluir foto.",
        data: null,
      };
    }
  };

  return {
    photoControllerCreate,
    photoControllerFindAll,
    photoControllerFindOne,
    photoControllerUpdate,
    photoControllerDelete,
  };
}

export default usePhotoHook;
