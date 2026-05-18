import { createContext, useState } from "react";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  // Server http
  const serverUrl = "http://localhost:5001";
  const [userFullData, setUserFullData] = useState("");
  let value = {
    serverUrl,
    userFullData,
    setUserFullData,
  };
  return (
    <>
      <authContext.Provider value={value}>{children}</authContext.Provider>
    </>
  );
};

export default AuthContext;
