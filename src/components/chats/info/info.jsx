import React, { useState } from "react";
import "../../../styles/info.css";
import {
  FaEdit,
  FaSearch,
  FaPlus,
  FaSignOutAlt,
  FaMinus,
} from "react-icons/fa";
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import {
  updateDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
  getDoc,
  arrayUnion,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import authContext from "../../../../context/userContext";
import toast from "react-hot-toast";
const info = ({filteredChats,setFilteredChats}) => {
  const { user, setUser, setLoggedIn, setChatsList, chatsList } = useContext(authContext);
  const [searchedChats, setSearchedChats] = useState([]);
  const [search,setSearch] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    const { eml } = Object.fromEntries(data);
    let searches = await getDocs(
      query(collection(db, "users"), where("email", "==", eml))
    );
    setSearchedChats(searches.docs.filter((e) => e.id != user.id));
  };
  const logOut = () => {
    signOut(auth)
      .then((user) => {
        setUser({});
        setLoggedIn(false);
        toast.success("Logged Out Successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const uploadAvatar = async (file)=>{
    let formData = new FormData();
    formData.append("file",file[0]);
    formData.append("upload_preset",import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    let req = await fetch(import.meta.env.VITE_CLOUDINARY_URL,{
      body:formData,
      method:"POST"
    });
    let res = await req.json();
    await updateDoc(doc(db,"users",user.id),{
      "avatar":res.secure_url
    });
    setUser({...user,"avatar":res.secure_url});
  }
  const searchHandler = (e)=>{
    setSearch(e.target.value);
    setFilteredChats(chatsList.filter((ele)=>ele.name.includes(e.target.value)));
  };
  const updateProfile = async (e) => {
    setUser({ ...user, name: name, bio: bio });
    await updateDoc(doc(db, "users", user.id), {
      name: name,
      bio: bio,
    });
    toast.success("Changes Saved Successfully!");
  };
  const addUser = async (id) => {
    if (chatsList.find((e) => id === e.receiverid)) {
      toast.success("User Already In List!");
    } else {
      let chatRef = await addDoc(collection(db, "chats"), { messages: [] });
      let userProf = await getDoc(doc(db, "users", id));
      await updateDoc(doc(db, "userchats", user.id), {
        chats: arrayUnion({
          receiverid: id,
          lastmessage: "",
          isseen: true,
          chatid: chatRef.id,
          updatedat: Date.now(),
        }),
      });
      await updateDoc(doc(db, "userchats", id), {
        chats: arrayUnion({
          receiverid: user.id,
          lastmessage: "",
          isseen: true,
          chatid: chatRef.id,
          updatedat: Date.now()
        }),
      });
      toast.success("User Added Successfully!");
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="modal fade"
        id="editModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Your Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="">Edit Your Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="nm"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="">Edit Your Bio:</label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    className="form-control"
                  />
                </div>
                <div className="col-12 d-flex flex-column">
                  <button className="btn btn-success" onClick={updateProfile}>
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="info position-sticky top-0 bg-white">
        <div className="wrapper">
          <div className="subinfo">
            <label htmlFor="profilePic" className="position-relative" role="button">
              <div id="overlay" className="d-none position-absolute start-50 top-50 translate-middle h-100 w-100 justify-content-center align-items-center rounded-circle" style={{background:"rgba(0,0,0,0.5)"}}><i className="bi bi-camera"></i></div>
              <img src={user.avatar || "/default.png"} alt="" />
            </label>
            <input type="file" onChange={(e)=>uploadAvatar(e.target.files)} id="profilePic" className="d-none"/>
            <h5>{user.name}</h5>
          </div>
          <div className="prof-icons d-flex gap-4">
            <FaEdit
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              style={{
                cursor: "pointer",
                fontSize: "x-large",
                color: "darkgreen",
              }}
            />
            <FaSignOutAlt
              onClick={logOut}
              style={{ cursor: "pointer", fontSize: "x-large", color: "red" }}
            />
          </div>
        </div>
        <div className="searchbars position-relative">
          <div className="searchbar">
            <FaSearch style={{ fontSize: "larger" }} />
            <input type="text" value={search} onChange={searchHandler} placeholder="Enter Name To Search" />
          </div>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="btn btn-info text-white shadow-none"
          >
            {open ? <FaMinus /> : <FaPlus />}
          </button>
          {open && (
            <div
              className="position-absolute top-100 w-100 border mt-1 p-2 bg-white rounded"
              style={{ maxHeight: "50vh", overflow: "auto" }}
            >
              <label htmlFor="" className="h5">
                Search A User:
              </label>
              <form className="d-flex gap-3" onSubmit={handleSearch}>
                <input
                  placeholder="Enter Email To Search"
                  className="flex-grow-1 form-control"
                  type="email"
                  name="eml"
                />
                <button className="btn btn-secondary">Search</button>
              </form>
              <div className="d-flex flex-column gap-3 mt-3">
                {searchedChats.length > 0 ? (
                  searchedChats.map((e) => {
                    return (
                      <div
                        className="d-flex gap-2 align-items-center"
                        key={e.id}
                      >
                        <img
                          className="rounded-circle"
                          src={e.data().avatar || "/default.png"}
                          height={50}
                          width={50}
                          alt=""
                        />
                        <h6 className="flex-grow-1 mb-0">{e.data().name}</h6>
                        <button
                          className="btn btn-info text-white"
                          onClick={() => addUser(e.id)}
                        >
                          Add User
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <h5 className="text-center">No Related Matches!</h5>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default info;
