// AuthGuard.jsx
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
