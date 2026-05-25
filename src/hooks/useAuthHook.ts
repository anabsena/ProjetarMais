import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "../services/firebase/firebase";

function useAuthHook() {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const userDoc = await getDoc(doc(firestore, "users", credential.user.uid));

      if (!userDoc.exists()) {
        await firebaseSignOut(firebaseAuth);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        return {
          status: "error",
          message: "Usuário não possui perfil administrativo cadastrado no Firestore.",
        };
      }

      const userProfile = userDoc.data();

      if (userProfile.active === false || userProfile.role !== "admin") {
        await firebaseSignOut(firebaseAuth);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        return {
          status: "error",
          message: "Usuário sem permissão administrativa.",
        };
      }

      const accessToken = await credential.user.getIdToken();

      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", credential.user.uid);

      window.location.pathname = "/projects";

      return {
        status: "success",
        message: "",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: error?.message || "Erro ao autenticar usuário.",
      };
    }
  };

  const handleSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/sign-in");
  };

  const signOut = async () => {
    await firebaseSignOut(firebaseAuth);
    await handleSignOut();
  };

  return {
    signIn,
    signOut,
  };
}

export default useAuthHook;
