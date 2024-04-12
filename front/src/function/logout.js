import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  React.useEffect(() => {
    handleLogout();
  }, []); 

  return <h1>Success Logout</h1>;
};

export default LogoutButton;
