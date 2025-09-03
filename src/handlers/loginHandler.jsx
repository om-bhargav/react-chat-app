import { auth, db } from "../firebase.jsx";
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
