import React, { useEffect, useState } from "react";
import "../../../styles/chatList.css";
import Info from "../info/info";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import authContext from "../../../../context/userContext";
import { useContext } from "react";
const chatList = (props) => {
  const { user, setChatsList, chatsList } = useContext(authContext);
  const [filteredChats,setFilteredChats] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", user.id), async (e) => {
      let userChats = e.data().chats;
      userChats.sort((a,b)=>b.updatedat-a.updatedat);
      let promises = userChats.map(async (element) => {
        let userRef = await getDoc(doc(db, "users", element.receiverid));
        // console.log(element);
        return { ...element, "name": userRef.data().name, "bio": userRef.data().bio,"avatar":userRef.data().avatar };
      });
      let data = await Promise.all(promises);
      setChatsList(data);
      setFilteredChats(data);
    });
    return () => {
      unSub();
    };
  }, [user]);
  return (
    <div
      className={`lside d-lg-flex ${props.currentUser === null ? "d-flex" : "d-none"
        }`}
    >
      <Info filteredChats={filteredChats} setFilteredChats={setFilteredChats}/>
      <div className="chatlist">
        {filteredChats.map((element) =>
          <div className="chat" onClick={() => props.setCurrentUser(element)} key={element.receiverid}>
            <img src={element.avatar || "/default.png"} alt="" />
            <div className="chatinfo flex-grow-1" >
              <h6>{element.name}</h6>
              <p>
                {element.lastmessage}
              </p>
            </div>
            {element.isseen === false &&
              <span className="p-2 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
            }
          </div>
        )}
        {filteredChats.length === 0 && (
          <div className="align-self-center justify-self-center m-auto">
            <h3 className="mb-0">No Users Found!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default chatList;
