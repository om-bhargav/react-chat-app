import React from "react";
import "../../styles/signup.css";
import { FaRegUserCircle } from "react-icons/fa";
import { Layout } from "../../components/chats/Layout";
import { Link } from "react-router-dom";
import signupHandler from "../../handlers/signupHandler.jsx";
const signup = () => {
  
  return (
    <Layout
      title="ChatPal - Signup"
      classes="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
    >
      <form className="signup py-4 shadow-lg" onSubmit={signupHandler}>
        <FaRegUserCircle size={32} />
        <h3>Create Your Account</h3>
        <div className="field">
          <label htmlFor="">Enter Your Name:</label>
          <input
            type="name"
            placeholder="Enter Your Name"
            className="form-control"
            name="name"
          />
        </div>
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
          <label htmlFor="">Confirm Your Password:</label>
          <input
            type="password"
            placeholder="Confirm Your Password"
            className="form-control"
            name="cpass"
          />
        </div>
        <div className="field">
          <input
            type="submit"
            className="btn btn-info text-light"
            value="Signup"
          />
        </div>
        <div style={{ justifySelf: "end" }}>
          <Link to="/login">
            <small>Already have an Account!</small>
          </Link>
        </div>
        <div className="options py-2">
          <p>Or Signup Using</p>
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

export default signup;
