import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Creation from "./pages/Creation";
import Manage from "./pages/Manage";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/create" element={<Creation />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default App;
