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
import Register from "../../pages/Regsiter";
import Login from "../../pages/Login";
import Feedback from "../../pages/Feedback";
import User from "../../pages/User";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "../../pages/Logout";

function
  Routers() {
  const user = sessionStorage.getItem("user");
  // if (
  //   !token &&
  //   location.pathname !== "/" &&
  //   location.pathname !== "/login" &&
  //   !location.pathname.includes("/register")
  // ) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" name="Home" element={<Welcome />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectPath="/" isAllowed={!user}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute redirectPath="/" isAllowed={!user}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute redirectPath="/" isAllowed={!!user}>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route path="/create" element={<Creation />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default Routers;
