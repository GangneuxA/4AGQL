import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./function/UserDetails.js";
import Home from "./function/Home.js";
import LoginForm from "./function/login.js";
import DetailClassroom from "./function/DetailClassroom.js";
import RegisterPage from "./function/register.js";
import LogoutButton from "./function/logout.js";
import MyNotesPage from "./function/mynotes.js";
import GradeDetails from "./function/GradeDetails.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/mynote" element={<MyNotesPage />} />
        <Route path="/grades" element={<GradeDetails />} />
        <Route path="/detailCLassroom" element={<DetailClassroom />} />
      </Routes>
    </Router>
  );
}

export default App;
