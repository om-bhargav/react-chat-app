import { createContext, useState } from "react";
const authContext = createContext();
export default authContext;

const AuthProvider = ({children}) => {
  const [loggedIn,setLoggedIn] = useState(false);
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(false);
  const [chatsList,setChatsList] = useState([]);
  const value = {
      loggedIn,
      setLoggedIn,
      user,
      setUser,
      loading,
      setLoading,
      chatsList,
      setChatsList,
  }
  return <authContext.Provider value={value}>
    {children}
  </authContext.Provider>
}

export { AuthProvider };