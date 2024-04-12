import React from 'react';
import 'fomantic-ui-css/semantic.min.css'; 
import { Link } from 'react-router-dom'; 
import isAuthenticated from "../utils/isAuthenticated";
import isTeacher from './isTeacher';

const Navbar = () => {
  if (isTeacher()){
    return (
      <div className="ui inverted menu">
        <div className="ui container">
          <Link to="/" className="header item">
            Home
          </Link>
          <Link to="/profile" className="item">
            profil
          </Link>
          <Link to="/grades" className="item">
            All grades
          </Link>
          <Link to="/classroom" className="item">
            Edit classroom
          </Link>
          <div className="right menu">
            <Link to="/logout" className="item">
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (isAuthenticated()) {
    return (
      <div className="ui inverted menu">
        <div className="ui container">
          <Link to="/" className="header item">
            Home
          </Link>
          <Link to="/profile" className="item">
            profil
          </Link>
          <Link to="/mynote" className="item">
            MyGrades
          </Link>
          <div className="right menu">
            <Link to="/logout" className="item">
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="ui inverted menu">
      <div className="ui container">
        <Link to="/" className="header item">
          Home
        </Link>
        <Link to="/profile" className="item">
          profil
        </Link>
        <div className="right menu">
          <Link to="/login" className="item">
            Login
          </Link>
          <Link to="/register" className="item">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;