import React, { useContext } from 'react'
import "../../../styles/messages.css";
import { FaEllipsisV, FaPaperclip, FaRegSmile, FaPaperPlane, FaWindowClose } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useState } from 'react';
import { useEffect } from 'react';
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import authContext from '../../../../context/userContext';
import moment from "moment";
const messages = (props) => {
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(authContext);
  const [messageList, setMessageList] = useState([]);
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    let req = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      body: formData,
      method: "POST"
    });
    let res = await req.json();
    return res.secure_url;
  }

  const handleMessage = async (e) => {
    if (message.trim() === "") return;
    let d = new Date();
    if(!image){
      await updateDoc(doc(db, "chats", props.currentUser.chatid), {
        messages: arrayUnion({
          senderid: user.id,
          text: message,
          timestamp: Date.now(),
        })
      });
    }else{
      await updateDoc(doc(db, "chats", props.currentUser.chatid), {
        messages: arrayUnion({
          senderid: user.id,
          img: await uploadImage(),
          timestamp: Date.now(),
        })
      });
    }
    let chats = await getDoc(doc(db, "userchats", props.currentUser.receiverid));
    chats = chats.data().chats;
    chats.forEach(element => {
      if (element.receiverid === user.id) {
        element.isseen = false
        element.lastmessage = message.slice(0, 15)
        element.updatedat = Date.now()
      }
    });
    await updateDoc(doc(db, "userchats", props.currentUser.receiverid), { "chats": chats });
    setMessage("");
    setImage(null);
  }
  const handleImage = (file) => {
    setImage(file);
    setMessage(file.name);
  }
  useEffect(() => {
    if (props.currentUser) {
      const unSub = onSnapshot(doc(db, "chats", props.currentUser.chatid), async (e) => {
        let chats = await getDoc(doc(db, "userchats", user.id));
        chats = chats.data().chats;
        chats.sort((a, b) => b.timestamp - a.timestamp);
        chats.forEach(element => {
          if (element.receiverid === props.currentUser.receiverid) {
            element.isseen = true;
          }
        });
        updateDoc(doc(db, "userchats", user.id), { chats: chats }).then(() => {
          document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight;
        })
        setMessageList(e.data().messages);
      });

      return () => {
        unSub()
      }
    }

  }, [props.currentUser]);
  return (
    <div className={`rside d-lg-flex ${props.currentUser === null ? "d-none" : "d-flex"}`}>
      {props.currentUser === null ? <div className='h3 m-auto'>Please select a chat!</div> :
        <>
          <div className="rinfo position-sticky top-0 bg-white">
            <div className="subinfo">
              <button className='btn' onClick={e => props.setCurrentUser(null)}><i className="bi bi-arrow-left h4 fw-bolder"></i></button>
              <img src={props.currentUser.avatar || "/default.png"} alt="" />
              <div>
                <h4 className='mb-0'>{props.currentUser.name}</h4>
                <small>{props.currentUser.bio}</small>
              </div>
            </div>
            <FaEllipsisV style={{ cursor: "pointer" }} />
          </div>
          <div className="chats">
            <div className='position-absolute' style={{ bottom: "10%" }}><EmojiPicker open={displayEmoji} onEmojiClick={(e) => setMessage(prev => prev + e.emoji)}></EmojiPicker></div>
            <div className='align-self-center text-center p-2 text-sm bg-secondary rounded text-white'><i className='bi bi-lock-fill'></i> End-to-End Encrypted, Your Messages Are Safe With Us!</div>
            {
              messageList.map((msg, ind) => {
                return (<div key={ind} className={`message ${msg.senderid === user.id ? "sender" : "receiver"}`}>
                  {msg.text && <p>{msg.text}</p>}
                  {msg.img && <img src={msg.img} className='rounded' style={{ height: "13rem" }} />}
                  <small>{moment(msg.timestamp).fromNow()}</small>
                </div>)
              })
            }
          </div>
          <div className="mbar position-sticky bottom-0">
            <FaRegSmile onClick={e => setDisplayEmoji(prev => !prev)} className="icons" />
            {
              image ?
                <FaWindowClose className='icons' onClick={() => { setImage(null); setMessage("") }} /> :
                <label htmlFor="file">
                  <FaPaperclip className="icons" />
                </label>
            }
            <input type="file" id="file" onChange={(e) => handleImage(e.target.files[0])} className='d-none' />
            <input type="text" disabled={image ? true : false} value={message} onChange={e => setMessage(e.target.value)} placeholder='Enter Message To Send' />
            <button className='btn btn-success' onClick={handleMessage}>Send <FaPaperPlane style={{ cursor: "pointer", fontSize: "larger" }} /></button>

          </div>
        </>
      }
    </div>)
}

export default messages