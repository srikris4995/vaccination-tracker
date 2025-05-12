import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/AuthService";

function PrivateRoute({ children }) {
    const token = getToken(); // Retrieve the token from localStorage or AuthService
    return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;