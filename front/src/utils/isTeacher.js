const isTeacher = () => {
  const accessToken = localStorage.getItem("role");
  return accessToken === "teacher";
};

export default isTeacher;
