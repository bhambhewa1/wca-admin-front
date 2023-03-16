import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { storage as LocalStorage } from "../config/storage";
import { toast } from "react-toastify";
import Toastify from "../components/SnackBar/Toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOGIN } from "./constURL";

const ProtectedRoute = ({ children }) => {
  const acc_Token = LocalStorage.fetch.authToken();
  if (acc_Token) {
  } else {
    console.log("actoken");
    setTimeout(() => {
      toast.error("Please Log in first ");
      localStorage.clear();
    }, 500);

    return <Navigate to={LOGIN} replace />;
  }
  return children;
};

export default ProtectedRoute;
