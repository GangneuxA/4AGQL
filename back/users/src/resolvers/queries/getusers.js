const { Users } = require("../../models/Users");

module.exports = async (_, { input }, { req }) => {
  //   console(req.users);
  return await Users.find({});
};
