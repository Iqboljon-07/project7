import React from "react";

import { Outlet } from "react-router-dom";
import Profile from "../profile/Profile";

function Layout() {
  return (
    <>
      <Profile />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

//https://nt-shopping-list.onrender.com/api
