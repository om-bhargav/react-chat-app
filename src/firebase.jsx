import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLMcKeXcTsTysEmxRFSyEfFU37MCnNHkc",
  authDomain: "react-chat-app-e94b3.firebaseapp.com",
  projectId: "react-chat-app-e94b3",
  storageBucket: "react-chat-app-e94b3.firebasestorage.app",
  messagingSenderId: "601841837970",
  appId: "1:601841837970:web:253a8aad592c5ef248434b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
