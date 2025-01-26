import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/home";
import Layout from "./component/Layout";
import UserDashboard from "./component/UserDashboard";
import AdminDashboard from "./component/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="home" element={<Home />} />
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
