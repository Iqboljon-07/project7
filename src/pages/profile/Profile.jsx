import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Main from "../../components/main/Main";
import { Navigate } from "react-router-dom";
import "./style.css";
import { useStateValue } from "../../context";
function Profile() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="global">
      <Navbar />
      <div className="global_item">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default Profile;
