import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    "Firebase config missing! Ensure NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set in .env.local"
  );
}

// Initialize Firebase (singleton)
let app;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully for project:", firebaseConfig.projectId);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  throw error;
}

export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize anonymous auth (client-side only)
if (typeof window !== "undefined") {
  signInAnonymously(auth)
    .then(() => console.log("Firebase anonymous auth successful"))
    .catch((error) => {
      console.error("Firebase anonymous auth error:", error.code, error.message);
    });
}
