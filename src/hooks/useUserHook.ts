import { createUserWithEmailAndPassword, signOut as firebaseSecondarySignOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore, getSecondaryFirebaseAuth } from "../services/firebase/firebase";
import { docWithId, normalizeText, paginate, sortByCreatedAtDesc } from "../services/firebase/firestore-helpers";
import { FirebaseUserProfile } from "../services/firebase/types";

function useUserHook() {
  const userControllerCreate = async (name: string, email: string, password: string) => {
    try {
      const secondaryAuth = getSecondaryFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(secondaryAuth, email, password);

      await setDoc(doc(firestore, "users", credential.user.uid), {
        name: name.trim(),
        email: email.trim(),
        role: "admin",
        active: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await firebaseSecondarySignOut(secondaryAuth);

      return {
        status: 201,
        message: "Created",
        data: {
          id: credential.user.uid,
          name: name.trim(),
          email: email.trim(),
          role: "admin",
          active: true,
        },
      };
    } catch (error: any) {
      console.error("Error creating user:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao criar usuário.",
        data: null,
      };
    }
  };

  const userControllerFindAll = async (name = "", page = 1, perPage = 10) => {
    try {
      const snapshot = await getDocs(collection(firestore, "users"));
      let users: FirebaseUserProfile[] = snapshot.docs.map((userDoc) => ({
        ...docWithId<Omit<FirebaseUserProfile, "id">>(userDoc),
        name: (userDoc.data().name as string) || "",
        email: (userDoc.data().email as string) || "",
      }));

      users = users.filter((user) => user.active !== false);

      if (name) {
        const search = normalizeText(name);
        users = users.filter(
          (user) => normalizeText(user.name).includes(search) || normalizeText(user.email).includes(search)
        );
      }

      users = sortByCreatedAtDesc(users);

      return {
        status: 200,
        message: "OK",
        data: paginate(users, page, perPage),
      };
    } catch (error: any) {
      console.error("Error fetching users:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar usuários.",
        data: null,
      };
    }
  };

  const userControllerFindone = async (id: string) => {
    try {
      const userSnapshot = await getDoc(doc(firestore, "users", id));

      if (!userSnapshot.exists()) {
        return {
          status: 404,
          message: "Usuário não encontrado",
          data: null,
        };
      }

      return {
        status: 200,
        message: "OK",
        data: {
          id: userSnapshot.id,
          ...userSnapshot.data(),
        },
      };
    } catch (error: any) {
      console.error("Error fetching user:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao buscar usuário.",
        data: null,
      };
    }
  };

  const userControllerUpdate = async (id: string, userData: { name?: string; password?: string }) => {
    try {
      await updateDoc(doc(firestore, "users", id), {
        ...(userData.name !== undefined ? { name: userData.name.trim() } : {}),
        updatedAt: serverTimestamp(),
      });

      const updatedUser = await userControllerFindone(id);

      return {
        status: 200,
        message: userData.password
          ? "Dados atualizados. Para alterar a senha de outro usuário, use Firebase Admin/Cloud Functions."
          : "OK",
        data: updatedUser.data,
      };
    } catch (error: any) {
      console.error("Error updating user:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao atualizar usuário.",
        data: null,
      };
    }
  };

  const userControllerDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "users", id));

      return {
        status: 200,
        message: "OK",
        data: null,
      };
    } catch (error: any) {
      console.error("Error deleting user:", error);

      return {
        status: "error",
        message: error?.message || "Erro ao excluir usuário.",
        data: null,
      };
    }
  };

  return {
    userControllerCreate,
    userControllerFindAll,
    userControllerFindone,
    userControllerUpdate,
    userControllerDelete,
  };
}

export default useUserHook;
