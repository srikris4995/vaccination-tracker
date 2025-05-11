import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem("authenticated") === "true";
  
       return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;