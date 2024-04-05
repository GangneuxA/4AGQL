const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sign, verify } = jwt;

const setTokens = (id, role) => {
  // si vous souhaitez inclure plus que l'identifiant de l'utilisateur dans le JWT, incluez-le ici
  const user = { user: { id } };
  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_DURATION,
  });
  return { id, accessToken, refreshToken ,role };
};

// Les deux fonctions suivantes encapsulent verify() dans un bloc try/catch pour atténuer les erreurs JWT expirés
const validateAccessToken = (token) => {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.message !== 'jwt expired')
      console.error(`Access token error: ${error.message}`);
  }
};

const validateRefreshToken = (token) => {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.message !== 'jwt expired')
      console.error(`Refresh token error: ${error.message}`);
  }
};

const comparePromise = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

module.exports = { setTokens, validateAccessToken, validateRefreshToken, comparePromise };
