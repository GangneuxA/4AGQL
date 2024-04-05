import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './function/UserDetails.js'; 
import Home from './function/Home.js'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/user/:id" element={<UserDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;

