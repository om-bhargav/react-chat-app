import React from "react";
import { auth, db } from "../firebase.jsx";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const signupHandler = (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  const { name, email, pass, cpass } = Object.fromEntries(data);
  if (pass != cpass) {
    toast.error("Password Does Not Match !");
    return;
  }

  createUserWithEmailAndPassword(auth, email, pass)
    .then(async (userCredential) => {
      let user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name,
        email,
        avatar: "",
        bio: "Hey There I am Using ChatPal",
        createdAt: serverTimestamp()
      });
      await setDoc(doc(db, "userchats", user.uid), {
        chats: [],
      });
      toast.success("Account Created! You can Login Now");
    })
    .catch((err) => {
      toast.error(err.message);
    });
  return <div>signupHandler</div>;
};

export default signupHandler;
