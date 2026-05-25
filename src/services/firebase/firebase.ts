import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCFIolL_J4c3imuXyFfDTUJoV9Cm1DJYfg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "projetar-mais.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "projetar-mais",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "300141287366",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:300141287366:web:c7763545895b27ea4d84c7",
};

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth: Auth = getAuth(firebaseApp);
export const firestore: Firestore = getFirestore(firebaseApp);

let secondaryApp: FirebaseApp | null = null;

export const getSecondaryFirebaseAuth = (): Auth => {
  if (!secondaryApp) {
    secondaryApp = initializeApp(firebaseConfig, "admin-user-creation");
  }

  return getAuth(secondaryApp);
};
