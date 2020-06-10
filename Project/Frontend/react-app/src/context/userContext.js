import React, { useState, createContext } from "react";
import { getUser, getToken } from "../Utils/Commons";

export const UserContext = createContext();

function Index(props) {
  // const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());

  // const refreshUser = () => {
  //   setUser(getUser());
  // };

  const refreshToken = () => {
    setToken(getToken());
  };

  const contextValue = {
    // user,
    // refreshUser,
    token,
    refreshToken,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Index;