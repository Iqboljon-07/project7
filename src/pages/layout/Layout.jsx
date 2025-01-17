import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

//https://nt-shopping-list.onrender.com/api
