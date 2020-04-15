import React, { useState, createContext } from "react";
import { getUser, removeUserSession } from "../Utils/Commons";

export const UserContext = createContext();

function Index(props) {
  const [user, setUser] = useState(getUser());

  const refreshUser = () => {
    setUser(getUser());
  };

  const contextValue = {
    user,
    refreshUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Index;
