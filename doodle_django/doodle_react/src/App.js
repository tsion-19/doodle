import "./App.css";
import Navbar from "./pages/Navbar";
import Welcome from "./pages/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Creation from "./pages/Creation";
import Manage from "./pages/Manage";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Regsiter";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  console.log(token);
  if (
    !token &&
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/create" element={<Creation />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
