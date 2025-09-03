import React from "react";
import { Layout } from "../../components/chats/Layout";
import { FaArrowRight } from "react-icons/fa";
import "../../styles/home.css";
import {useNavigate} from "react-router-dom";
const home = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Home - Start Chatting Today With ChatPal">
      <div className="shadow container-fluid d-flex justify-content-between py-3 px-5 gap-3">
        <div className="d-flex gap-3 align-items-center">
          <img src="/logo.png" height={30} width={30} />
          <h3>ChatPal</h3>
        </div>
        <ul className="justify-content-center align-items-center gap-3 list-unstyled mb-0 d-none d-md-flex">
          <li>
            <a className="text-decoration-none text-dark" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="text-decoration-none text-dark" href="#testimonials">
              Testimonials
            </a>
          </li>
          <li>
            <a className="text-decoration-none text-dark" href="#about">
              About Us
            </a>
          </li>
          <li>
            <a className="text-decoration-none text-dark" href="#contact">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <div
        id="home"
        className="mt-2 d-flex justify-content-between align-items-center px-5 py-3 flex-wrap-reverse"
        style={{ backgroundColor: "#157efd" }}
      >
        <div className="w-50 w-sm-100 d-flex flex-column gap-3">
          <p className="text-white display-3 fw-bolder">
            Signup And Chat With Anyone You Want to!
          </p>
          <p className="text-light h4 text-opacity-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            debitis repudiandae eos esse ipsum. Nostrum accusamus asperiores
            ullam repellat, voluptatum sequi, aliquid blanditiis vero at iure
            dolorem expedita, eum veritatis.
          </p>
          <div className="d-flex gap-4 flex-md-row flex-column">
            <button onClick={()=>navigate("/login")} className="btn btn-info rounded-pill text-lg text-light px-5 py-2">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </button>
            <button onClick={()=>navigate("/signup")} className="btn btn-light rounded-pill text-lg px-5 py-2">
              Get Started <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center d-none d-md-block">
          <img src="/mobile.png" style={{ height: "35rem", width: "20rem" }} />
        </div>
      </div>
      <div
        id="testimonials"
        className="d-flex align-items-center justify-content-center flex-column gap-3 mt-3"
      >
        <div className="d-flex align-items-center flex-column">
          <h3 className="border-bottom p-2 border-primary">
            Testimonials Section
          </h3>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="d-flex justify-content-center">
          <div className="row container-fluid justify-content-center gap-5">
            <div className="shadow-lg col-xs-1 col-md-3 rounded p-4">
              <img
                className="rounded-circle mb-3"
                src="/default.png"
                style={{ height: "5rem" }}
                alt=""
              />
              <h5>Lorem, ipsum.</h5>
              <p className="text-secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
                quibusdam quaerat quam atque dolor quos alias distinctio
                excepturi ut. Fuga voluptatum necessitatibus ab nobis id
                quibusdam ducimus sapiente, rerum dolores illo commodi omnis et
                suscipit tenetur. Blanditiis deserunt hic ex!
              </p>
            </div>
            <div className="shadow-lg col-xs-1 col-md-3 rounded p-4">
              <img
                className="rounded-circle mb-3"
                src="/default.png"
                style={{ height: "5rem" }}
                alt=""
              />
              <h5>Lorem, ipsum.</h5>
              <p className="text-secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
                quibusdam quaerat quam atque dolor quos alias distinctio
                excepturi ut. Fuga voluptatum necessitatibus ab nobis id
                quibusdam ducimus sapiente, rerum dolores illo commodi omnis et
                suscipit tenetur. Blanditiis deserunt hic ex!
              </p>
            </div>
            <div className="shadow-lg col-xs-1 col-md-3 rounded p-4">
              <img
                className="rounded-circle mb-3"
                src="/default.png"
                style={{ height: "5rem" }}
                alt=""
              />
              <h5>Lorem, ipsum.</h5>
              <p className="text-secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
                quibusdam quaerat quam atque dolor quos alias distinctio
                excepturi ut. Fuga voluptatum necessitatibus ab nobis id
                quibusdam ducimus sapiente, rerum dolores illo commodi omnis et
                suscipit tenetur. Blanditiis deserunt hic ex!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="about" className="mt-5 shadow-lg py-4">
        <div className="d-flex align-items-center flex-column">
          <h3 className="border-bottom p-2 border-primary">About Section</h3>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="d-flex justify-content-md-between justify-content-xs-center relative align-items-center px-5">
          <div className="w-50 w-sm-100 d-flex flex-column gap-3">
            <p className="display-5 fw-bolder">Our platform allows users to create groups, share diverse content, and more.</p>
            <p className="text-secondary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestias laudantium nihil quos ducimus magnam saepe fugiat
              repudiandae quis animi beatae veritatis, incidunt sed. Quasi
              numquam, assumenda ut reiciendis dicta accusantium ipsum
              voluptatibus fugit laborum, illo molestiae rerum sequi, qui unde.
            </p>
            <div className="d-flex gap-3 flex-md-row flex-column">
                <button className="btn btn-primary rounded-pill px-4 py-2"><i className="bi bi-linkedin"></i> LinkedIn Profile</button>
                <button className="btn btn-dark rounded-pill px-4 py-2"><i className="bi bi-github"></i> GitHub Link</button>
            </div>
          </div>
          <div className="absolute bototm-0 right-10 d-none d-md-block">
            <img src="/about.png" />
          </div>
        </div>
      </div>
      <div id="contact" className="container-fluid mt-4 d-flex flex-column align-items-center py-4" style={{backgroundColor:"#fafafa"}}>
        <div className='d-flex align-items-center flex-column'>
                    <h3 className='border-bottom p-2 border-primary'>Contact Us</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
        <div className="row container gap-4">
            <div>
                <label>Enter Your Name:</label>
                <input type="text" className="form-control" />
            </div>
            <div>
                <label>Enter Your Email:</label>
                <input type="text" className="form-control" />
            </div>
            <div>
                <label htmlFor="">Enter Your Message:</label>
                <textarea className="form-control" rows="3"></textarea>
            </div>
            <div className="d-md-block d-flex flex-column">
            <button className="btn btn-primary">Send Now</button>
            </div>
        </div>
      </div>
      <footer className="container-fluid bg-dark w-100 mt-5 mb-0 d-flex justify-content-between px-3 py-5 h-50 flex-md-row flex-column align-items-center">
        <div>
            <img src="/logo.png" height={100} width={100} />
            <h3 className="text-white fw-bold">ChatPal</h3>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-5">

        <div className="text-center">
            <h2 className="text-light fw-bold">Pages</h2>
        <ul className="list-unstyled mb-0">
            <li className="text-light">Home</li>
            <li className="text-light">Contact Us</li>
            <li className="text-light">About Us</li>
            <li className="text-light">Testimonials</li>
        </ul>
        </div>
         <div className="text-center">
            <h2 className="text-light fw-bold">Pages</h2>
        <ul className="list-unstyled mb-0">
            <li className="text-light">Home</li>
            <li className="text-light">Contact Us</li>
            <li className="text-light">About Us</li>
            <li className="text-light">Testimonials</li>
        </ul>
        </div>
         <div className="text-center">
            <h2 className="text-light fw-bold">Pages</h2>
        <ul className="list-unstyled mb-0">
            <li className="text-light">Home</li>
            <li className="text-light">Contact Us</li>
            <li className="text-light">About Us</li>
            <li className="text-light">Testimonials</li>
        </ul>
        </div>
         <div className="text-center">
            <h2 className="text-light fw-bold">Pages</h2>
        <ul className="list-unstyled mb-0">
            <li className="text-light">Home</li>
            <li className="text-light">Contact Us</li>
            <li className="text-light">About Us</li>
            <li className="text-light">Testimonials</li>
        </ul>
        </div>
        </div>
      </footer>
    </Layout>
  );
};

export default home;
