import { useState, useEffect } from "react";
import "./App.css";
import ChatScreen from "./pages/chat-screen/chatScreen";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signpup from "./pages/signup/signup";
import toast from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/userContext.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase.jsx";
import { auth } from "./firebase.jsx";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function App() {
  const value = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userData = await getDoc(doc(db, "users", user.uid));
        value.setUser(userData.data());
        let userChats = (await getDoc(doc(db,"userchats",user.uid))).data().chats;
        let promises = userChats.map(async (element)=>{
          let userRef = await getDoc(doc(db,"users",element.receiverid));
          return {...element,"name":userRef.data().name,"bio":userRef.data().bio};
        });
        let data = await Promise.all(promises);
        value.setChatsList(data);
        // console.log(data);
        value.setLoggedIn(true);
        navigate("/");
      }
    });
    return () => {
      unSub();
    }
  }, []);
  return (
    <Routes>
      {value.loggedIn ? (
        <Route path="/" element={<ChatScreen />}></Route>
      ) : (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signpup />}></Route>
        </>
      )}
      <Route path="*" element={<h1>This page Does Not Exist!</h1>}></Route>
    </Routes>
  );
}

export default App;
