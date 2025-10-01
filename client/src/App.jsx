import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
import TasksPage from "./pages/TasksPage.jsx";


export default function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <Navbar />  
     
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/tasks" element={token ? <TasksPage /> : <Navigate to="/login" />} /> 

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
   </>
  );
}
