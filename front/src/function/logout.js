import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const history = useNavigate();
  localStorage.clear();
  history("/login");
  return null;
};

export default LogoutButton;
