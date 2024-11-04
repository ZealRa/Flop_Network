import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {
        /* <Route path="/profile" element={<Profile />} /> */
        <Route path="/login" element={<Login />} />
      }
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
