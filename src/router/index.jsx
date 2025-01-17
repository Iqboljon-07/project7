import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";

import Registr from "../pages/registr/Registr";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registr" element={<Registr />} />
      </Routes>
    </div>
  );
}

export default Routers;
