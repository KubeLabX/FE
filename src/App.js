import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Dash_Student from "./components/Dash_Student";
import Dash_Professor from "./components/Dash_Professor";
import Dash_CPU from "./components/Dash_CPU";
import Dash_Mem from "./components/Dash_Mem";
import Dash_Rate from "./components/Dash_Rate";
import PodGraph from "./components/PodGraph";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/dash_cpu" element={<Dash_CPU />} />
          <Route path="/dash_mem" element={<Dash_Mem />} />
          <Route path="/dash_rate" element={<Dash_Rate />} />
          <Route path="/dash_stu" element={<Dash_Student />} />
          <Route path="/dash_pro" element={<Dash_Professor />} />
          <Route path="/podgraph" element={<PodGraph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
