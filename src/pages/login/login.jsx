import React from "react";
import { auth, db } from "../../firebase.jsx";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../styles/login.css";
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { Layout } from "../../components/chats/Layout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast"
import AuthContext from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
const login = () => {
    const navigate = useNavigate();
    const {setUser,setLoggedIn} = useContext(AuthContext);
    const loginHandler = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        let {email,pass} =  Object.fromEntries(data);
        signInWithEmailAndPassword(auth,email,pass).then(async (userCredential)=>{
            let user = userCredential.user;
            let userData = await getDoc(doc(db,"users",user.uid));
            setUser(userData.data());
            setLoggedIn(true);
            toast.success("You Have Logged in successfully !");
            await navigate("/");
        }).catch((err)=>toast.error(err.message));
    };


    return (
        <Layout
            title="ChatPal - Login"
            classes="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
        >
            <form className="login py-4 shadow-lg" onSubmit={loginHandler}>
                <AiOutlineLogin size={32} />
                <h3>Login Into Your Account</h3>
                <div className="field">
                    <label htmlFor="">Enter Your Email:</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="form-control"
                        name="email"
                    />
                </div>
                <div className="field">
                    <label htmlFor="">Enter Your Password:</label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="form-control"
                        name="pass"
                    />
                </div>
                <div className="field">
                    <input
                        type="submit"
                        className="btn btn-info text-light"
                        value="Login"
                    />
                </div>
                <div style={{ justifySelf: "end" }}>
                    <Link to="/signup">
                        <small>Don't have an Account!</small>
                    </Link>
                </div>
                <div className="options py-2">
                    <p>Or Login Using</p>
                    <div className="option-icons">
                        <img src="/google.png" alt="" />
                        <img src="/facebook.jpeg" alt="" />
                        <img src="/x.png" alt="" />
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default login;
