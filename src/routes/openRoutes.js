import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { storage as LocalStorage } from "../config/storage";
import 'react-toastify/dist/ReactToastify.css';
import Toastify from "../components/SnackBar/Toastify";
import { toast } from "react-toastify";
const OpenRoutes = ({children}) => {
  // const [state, setstate] = useState(false);
  const acc_Token = LocalStorage.fetch.authToken();
  if (acc_Token) {
    setTimeout(() => {
        toast.error("You are already logged in");
      }, 500);
          return <Navigate to="/profile" replace />
  } else {
    
}
return children

};

export default OpenRoutes;
