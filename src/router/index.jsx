import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";

import Registr from "../pages/registr/Registr";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Details from "../components/detail/Details";
import Yourprofile from "../components/yourprofile/Yourprofile";
import Join from "../components/join/Join";
import Sidebar from "../components/sidebar/Sidebar";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/detail/:groupId" element={<Details />} />
          <Route path="/search/:searchId" element={<Join />} />
        </Route>
        <Route path="/search/:searchId" element={<Sidebar />} />
        <Route path="/" element={<Profile />} />
        <Route path="/yourprofile" element={<Yourprofile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registr" element={<Registr />} />
      </Routes>
    </div>
  );
}

export default Routers;
