import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditProfile from "./pages/editProfile";
import CreatePost from "./components/CreatePost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/createPost" element={<CreatePost />} />
    </Routes>
  );
};

export default AppRoutes;
