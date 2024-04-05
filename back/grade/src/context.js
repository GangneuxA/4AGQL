const { setTokens, validateAccessToken, validateRefreshToken } = require('./jwt');

const context = async ({ req, res }) => {
  let id 
  let role

  let accessToken = req.headers['x-access-token']?.replace(/^null$/, '');
  let refreshToken = req.headers['x-refresh-token']?.replace(/^null$/, '');

  if (accessToken) {
    const decodedAccessToken = validateAccessToken(accessToken);
    id = decodedAccessToken?.user?.id;
    role = decodedAccessToken?.user?.role;
    if (!id) {
      if (refreshToken) {
        const tokenUser = validateRefreshToken(refreshToken)?.user;
        if (tokenUser) {
          id = tokenUser.id;
          role = tokenUser.role;
          ({ accessToken, refreshToken } = setTokens(tokenUser.id , tokenUser.role));
          res.set('x-access-token', accessToken);
          res.set('x-refresh-token', refreshToken);
        }
      } else {
        console.info(`Invalid/expired access token presented but refreshToken null or missing!`);
      }
    }
    if (id) {
      req.user = {id, role};
    }
    console.log(role)
    console.log(id)
  }
  return { req, res };
};

module.exports = context;
