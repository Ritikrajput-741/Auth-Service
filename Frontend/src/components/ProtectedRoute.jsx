import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userAllData"));

  return userData ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
