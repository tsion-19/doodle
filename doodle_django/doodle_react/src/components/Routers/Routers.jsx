import "../../App.css";
// import "./index.css";
import Navbar from "../../pages/Navbar";
import Welcome from "../../pages/Welcome";
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
import Creation from "../../pages/Creation";
import Manage from "../../pages/Manage";
import Dashboard from "../../pages/Dashboard";
import Preference from "../../pages/Preference";
import Register from "../Login/Regsiter";
import Login from "../Login/Login";
import Feedback from "../../pages/Feedback";
import User from "../../pages/User";

function Routers() {
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
    <div>
      {/* <Navbar /> */}
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
        <Route path="/preference" element={<Preference />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default Routers;
