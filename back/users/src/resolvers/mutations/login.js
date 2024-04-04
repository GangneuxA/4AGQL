const { Users } = require("../../models/Users")
const { signToken, verifyPassword } = require("../../utils/index");

module.exports = async (_, {email ,password}, {models}) => {

  const result = await Users.findOne({ email: email });

  const isValidPassword =  true;

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return {
    id: result.id,
    token: signToken({ userId: result.id }),
  };
}