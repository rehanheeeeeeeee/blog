// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9bwb-I3TVaSQ0QN2kqnKf6tJpwtz6MiU",
  authDomain: "medium-clone-29e1c.firebaseapp.com",
  projectId: "medium-clone-29e1c",
  storageBucket: "medium-clone-29e1c.appspot.com",
  messagingSenderId: "955974556292",
  appId: "1:955974556292:web:c6321c2bafd888750440d1",
  measurementId: "G-Q7B41JCT8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);
