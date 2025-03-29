import React from "react";
import { Navigate } from "react-router-dom";

function Private({ children }) {
 return localStorage.getItem("valid",true) ? children : <Navigate to="/" />

}

export default Private;
