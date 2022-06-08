import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "../components/chat/Chat";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
