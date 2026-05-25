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
import { firebaseAuth, firestore } from "../services/firebase/firebase";
import { docWithId, normalizeText, paginate, sortByCreatedAtDesc } from "../services/firebase/firestore-helpers";
import { FirebasePhoto, FirebaseProject } from "../services/firebase/types";

function useProjectHook() {
  const getPhotosByProjectId = async (projectId: string): Promise<FirebasePhoto[]> => {
    try {
      const photosQuery = query(collection(firestore, "projectPhotos"), where("projectId", "==", projectId));
      const photosSnapshot = await getDocs(photosQuery);

      return sortByCreatedAtDesc(
        photosSnapshot.docs.map((photoDoc) => ({
          ...docWithId<Omit<FirebasePhoto, "id">>(photoDoc),
          photoUrl: (photoDoc.data().photoUrl as string) || (photoDoc.data().photoBase64 as string) || "",
        }))
      );
    } catch (error) {
      console.error("Error fetching project photos:", error);
      return [];
    }
  };

  const mapProjectWithPhotos = async (projectDoc: any): Promise<FirebaseProject> => {
    const projectData = docWithId<Omit<FirebaseProject, "id" | "ProjectPhotos">>(projectDoc);
    let ProjectPhotos = await getPhotosByProjectId(projectDoc.id);
    const coverImageUrl = (projectData as any).coverImageUrl || "";

    if (!ProjectPhotos.length && coverImageUrl) {
      ProjectPhotos = [
        {
          id: `${projectDoc.id}-cover`,
          projectId: projectDoc.id,
          photoUrl: coverImageUrl,
          photoBase64: coverImageUrl,
        },
      ];
    }

    return {
      ...projectData,
      name: projectData.name || "",
      description: projectData.description || "",
      especificDetails: projectData.especificDetails || "",
      projectCategoryId: projectData.projectCategoryId || "",
      coverImageUrl,
      ProjectPhotos,
    };
  };

  const projectControllerCreate = async (
    name: string,
    description: string,
    especificDetails: string,
    projectCategoryId: string
  ) => {
    try {
      const currentUserId = firebaseAuth.currentUser?.uid || localStorage.getItem("userId") || "";

      const response = await addDoc(collection(firestore, "projects"), {
        name: name.trim(),
        description: description || "",
        especificDetails: especificDetails || "",
        projectCategoryId,
        userId: currentUserId,
        coverImageUrl: "",
        coverPhotoId: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        status: 201,
        message: "Created",
        data: {
          id: response.id,
          name: name.trim(),
          description: description || "",
          especificDetails: especificDetails || "",
          projectCategoryId,
          userId: currentUserId,
          coverImageUrl: "",
          coverPhotoId: "",
          ProjectPhotos: [],
        },
      };
    } catch (error: any) {
      console.error("Error creating project:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao criar projeto.",
        data: null,
      };
    }
  };

  const projectControllerFindAll = async (
    name = "",
    especificDetails = "",
    description = "",
    page = 1,
    perPage = 10
  ) => {
    try {
      const snapshot = await getDocs(collection(firestore, "projects"));
      let projects = await Promise.all(snapshot.docs.map(mapProjectWithPhotos));

      const nameSearch = normalizeText(name);
      const detailsSearch = normalizeText(especificDetails);
      const descriptionSearch = normalizeText(description);

      if (nameSearch) {
        projects = projects.filter((project) => normalizeText(project.name).includes(nameSearch));
      }

      if (detailsSearch) {
        projects = projects.filter((project) => normalizeText(project.especificDetails).includes(detailsSearch));
      }

      if (descriptionSearch) {
        projects = projects.filter((project) => normalizeText(project.description).includes(descriptionSearch));
      }

      projects = sortByCreatedAtDesc(projects);

      return {
        status: 200,
        message: "OK",
        data: paginate(projects, page, perPage),
      };
    } catch (error: any) {
      console.error("Error fetching projects:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar projetos.",
        data: null,
      };
    }
  };

  const projectControllerFindOne = async (id: string) => {
    try {
      const projectSnapshot = await getDoc(doc(firestore, "projects", id));

      if (!projectSnapshot.exists()) {
        return {
          status: 404,
          message: "Projeto não encontrado",
          data: null,
        };
      }

      const project = await mapProjectWithPhotos(projectSnapshot);

      return {
        status: 200,
        message: "OK",
        data: project,
      };
    } catch (error: any) {
      console.error("Error fetching project:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar projeto.",
        data: null,
      };
    }
  };

  const projectControllerUpdate = async (
    id: string,
    name?: string,
    description?: string,
    especificDetails?: string,
    projectCategoryId?: string
  ) => {
    try {
      const payload: Record<string, any> = {
        updatedAt: serverTimestamp(),
      };

      if (name !== undefined) payload.name = name.trim();
      if (description !== undefined) payload.description = description || "";
      if (especificDetails !== undefined) payload.especificDetails = especificDetails || "";
      if (projectCategoryId !== undefined) payload.projectCategoryId = projectCategoryId;

      await updateDoc(doc(firestore, "projects", id), payload);
      const updatedProject = await projectControllerFindOne(id);

      return {
        status: 200,
        message: "OK",
        data: updatedProject.data,
      };
    } catch (error: any) {
      console.error("Error updating project:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao atualizar projeto.",
        data: null,
      };
    }
  };

  const projectControllerDelete = async (id: string) => {
    try {
      const photos = await getPhotosByProjectId(id);

      await Promise.all(photos.map((photo) => deleteDoc(doc(firestore, "projectPhotos", photo.id))));
      await deleteDoc(doc(firestore, "projects", id));

      return {
        status: 200,
        message: "OK",
        data: null,
      };
    } catch (error: any) {
      console.error("Error delete project:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao excluir projeto.",
        data: null,
      };
    }
  };

  return {
    projectControllerCreate,
    projectControllerFindAll,
    projectControllerFindOne,
    projectControllerUpdate,
    projectControllerDelete,
  };
}

export default useProjectHook;
