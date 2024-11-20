import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Dash_Student from "./components/Dash_Student";
import Dash_Professor from "./components/Dash_Professor";
import Dashboard from "./components/Dashboard";
import PodGraph from "./components/PodGraph";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dash_stu" element={<Dash_Student />} />
          <Route path="/dash_pro" element={<Dash_Professor />} />
          <Route path="/podgraph" element={<PodGraph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
