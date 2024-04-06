const { Grade } = require("../../models/Grade");

module.exports = async (_, { id }, { req }) => {
  if (!req.user) throw new Error("Unauthorized access!");
  if (req.user.role !== "teacher")
    throw new Error("Unauthorized acccess for student");

  const result = await Grade.findByIdAndDelete(id);
  return result;
};
