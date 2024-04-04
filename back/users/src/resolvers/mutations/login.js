const { Users } = require("../../models/Users")
module.exports = async (_, {email ,password}, {models}) => {

  const result = await Users.findOne({ email: email });

  const isValidPassword =  true;

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return {
    id: result.id,
    token: result.id,
  };
}