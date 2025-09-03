import React, { useState } from 'react'
import ChatList from '../../components/chats/chatList/chatList';
import Info from '../../components/chats/info/info';
import Messages from '../../components/chats/messages/messages';
import { useEffect } from 'react';
const chatScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  // useEffect(()=>{
  //   if(currentUser){

  //   }
  // },[currentUser]);
  return (
    <div className='mcontainer'>
      <title>Chatpal - User Chats</title>
      <ChatList currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Messages currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  )
}

export default chatScreen;