const { Users } = require("../../models/Users");

module.exports = async (_, {}, { req }) => {
  if (!req.user) throw new Error("Unauthorized access!");
  const result = await Users.findByIdAndUpdate(req.user.id, {
    role: "teacher",
  });
  return result;
};
