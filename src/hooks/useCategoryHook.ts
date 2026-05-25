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
import { FirebaseCategory, FirebasePhoto, FirebaseProject } from "../services/firebase/types";

function useCategoryHook() {
  const getProjectPhotos = async (projectId: string): Promise<FirebasePhoto[]> => {
    try {
      const photosQuery = query(collection(firestore, "projectPhotos"), where("projectId", "==", projectId));
      const photosSnapshot = await getDocs(photosQuery);

      return photosSnapshot.docs.map((photoDoc) => ({
        ...docWithId<Omit<FirebasePhoto, "id">>(photoDoc),
        photoUrl: (photoDoc.data().photoUrl as string) || (photoDoc.data().photoBase64 as string) || "",
      }));
    } catch (error) {
      console.error("Error fetching project photos:", error);
      return [];
    }
  };

  const getProjectsByCategory = async (categoryId: string): Promise<FirebaseProject[]> => {
    const projectsQuery = query(collection(firestore, "projects"), where("projectCategoryId", "==", categoryId));
    const projectsSnapshot = await getDocs(projectsQuery);

    const projects = await Promise.all(
      projectsSnapshot.docs.map(async (projectDoc) => {
        const project = docWithId<Omit<FirebaseProject, "id" | "ProjectPhotos">>(projectDoc);
        let ProjectPhotos = await getProjectPhotos(projectDoc.id);
        const coverImageUrl = (project as any).coverImageUrl || "";

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
          ...project,
          description: project.description || "",
          especificDetails: project.especificDetails || "",
          coverImageUrl,
          ProjectPhotos,
        };
      })
    );

    return sortByCreatedAtDesc(projects);
  };

  const categoryControllerCreate = async (name: string, description: string) => {
    try {
      const normalizedName = name.trim();
      const existsQuery = query(collection(firestore, "projectCategories"), where("name", "==", normalizedName));
      const existsSnapshot = await getDocs(existsQuery);

      if (!existsSnapshot.empty) {
        return {
          status: "error",
          message: "Categoria já existe",
          data: null,
        };
      }

      const response = await addDoc(collection(firestore, "projectCategories"), {
        name: normalizedName,
        description: description || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        status: 201,
        message: "Created",
        data: {
          id: response.id,
          name: normalizedName,
          description: description || "",
          Project: [],
        },
      };
    } catch (error: any) {
      console.error("Error creating category:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao criar categoria.",
        data: null,
      };
    }
  };

  const categoryControllerFindAll = async (name = "", page = 1, perPage = 10) => {
    try {
      const snapshot = await getDocs(collection(firestore, "projectCategories"));
      let categories: FirebaseCategory[] = snapshot.docs.map((categoryDoc) => ({
        ...docWithId<Omit<FirebaseCategory, "id">>(categoryDoc),
        description: (categoryDoc.data().description as string) || "",
        Project: [],
      }));

      if (name) {
        const search = normalizeText(name);
        categories = categories.filter(
          (category) =>
            normalizeText(category.name).includes(search) ||
            normalizeText(category.description).includes(search)
        );
      }

      categories = sortByCreatedAtDesc(categories);

      return {
        status: 200,
        message: "OK",
        data: paginate(categories, page, perPage),
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar categorias.",
        data: null,
      };
    }
  };

  const categoryControllerFindOne = async (id: string) => {
    try {
      const categoryRef = doc(firestore, "projectCategories", id);
      const categorySnapshot = await getDoc(categoryRef);

      if (!categorySnapshot.exists()) {
        return {
          status: 404,
          message: "Categoria não encontrada",
          data: null,
        };
      }

      const category = categorySnapshot.data();
      const projects = await getProjectsByCategory(id);

      return {
        status: 200,
        message: "OK",
        data: {
          id: categorySnapshot.id,
          name: category.name || "",
          description: category.description || "",
          Project: projects,
          createdAt: category.createdAt || null,
          updatedAt: category.updatedAt || null,
        },
      };
    } catch (error: any) {
      console.error("Error fetching category:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar categoria.",
        data: null,
      };
    }
  };

  const categoryControllerUpdate = async (id: string, name: string, description: string) => {
    try {
      await updateDoc(doc(firestore, "projectCategories", id), {
        name: name.trim(),
        description: description || "",
        updatedAt: serverTimestamp(),
      });

      return {
        status: 200,
        message: "OK",
        data: {
          id,
          name: name.trim(),
          description: description || "",
          Project: [],
        },
      };
    } catch (error: any) {
      console.error("Error updating category:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao atualizar categoria.",
        data: null,
      };
    }
  };

  const categoryControllerDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "projectCategories", id));

      return {
        status: 200,
        message: "OK",
        data: null,
      };
    } catch (error: any) {
      console.error("Error delete category:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao excluir categoria.",
        data: null,
      };
    }
  };

  return {
    categoryControllerCreate,
    categoryControllerFindAll,
    categoryControllerFindOne,
    categoryControllerUpdate,
    categoryControllerDelete,
  };
}

export default useCategoryHook;
