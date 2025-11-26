"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "gym-application-519ec",
  storageBucket: "gym-application-519ec.firebasestorage.app",
  messagingSenderId: "478137383214",
  appId: "1:478137383214:web:c62a5a72e8ebf1ebdc22bf",
  measurementId: "G-MTHTM6WTGS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics, app };
