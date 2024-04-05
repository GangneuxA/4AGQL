// Fonction pour vérifier si l'utilisateur est connecté
const isAuthenticated = () => {
  // Vérifier la présence du jeton d'accès dans le localStorage
  const accessToken = localStorage.getItem("accessToken");
  // Si le jeton d'accès est présent, l'utilisateur est considéré comme connecté
  return accessToken !== null;
};

export default isAuthenticated;
