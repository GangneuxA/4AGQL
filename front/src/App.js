import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './function/UserDetails.js'; 
import Home from './function/Home.js'; 
import LoginForm from './function/login.js'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/profile" element={<UserDetails/>} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </Router>
  );
}

export default App;

