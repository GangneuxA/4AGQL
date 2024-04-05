const { Users } = require("../../models/Users")
const { comparePromise, setTokens }= require('../../jwt');
const { GraphQLError } = require('graphql');

module.exports = async (_, {email ,password}, {models}) => {

  const user = await Users.findOne({ email: email });

  if (user && (await comparePromise(password, user.password))) {
    const settoken =  setTokens(user.id);
    return { id: settoken.id , accessToken: settoken.accessToken , refreshToken: settoken.refreshToken  }
  } else {
    throw new GraphQLError('Invalid credentials', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
}