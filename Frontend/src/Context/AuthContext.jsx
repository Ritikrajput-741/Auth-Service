import { createContext, useState } from "react";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  // Server http
  const serverUrl = "https://auth-service-3-qevr.onrender.com";
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
