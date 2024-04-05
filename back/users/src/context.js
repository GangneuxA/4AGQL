const { setTokens, validateAccessToken, validateRefreshToken } = require('./jwt');
const { Users } = require('./models/Users');

const context = async ({ req, res }) => {
  let accessToken = req.headers['x-access-token']?.replace(/^null$/, '');
  let refreshToken = req.headers['x-refresh-token']?.replace(/^null$/, '');

  if (accessToken) {
    const decodedAccessToken = validateAccessToken(accessToken);
    let id = decodedAccessToken?.user?.id;
    if (!id) {
      if (refreshToken) {
        const tokenUser = validateRefreshToken(refreshToken)?.user;
        if (tokenUser) {
          id = tokenUser.id;
          ({ accessToken, refreshToken } = setTokens(tokenUser));
          res.set('x-access-token', accessToken);
          res.set('x-refresh-token', refreshToken);
        }
      } else {
        console.info(`Invalid/expired access token presented but refreshToken null or missing!`);
      }
    }
    if (id) req.user = await Users.findById(id);
    
  }
  return { req, res };
};

module.exports = context;
