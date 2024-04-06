const { Classroom } = require("../../models/Classroom");

module.exports = async (_, { id }, { req }) => {
  try {
    if (!req.user) throw new Error("Unauthorized access!");
    if (req.user.role !== "teacher")
      throw new Error("Unauthorized acccess for student");

    const classroom = await Classroom.findById(id);

    if (classroom.member.length !== 0) {
      throw new Error("the member list is not empty");
    }

    const result = await Classroom.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
