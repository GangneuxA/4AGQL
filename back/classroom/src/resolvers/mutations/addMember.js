const { Classroom } = require("../../models/Classroom");

module.exports = async (_, { id, member }, { req }) => {
  try {
    if (!req.user) throw new Error("Unauthorized access!");
    if (req.user.role !== "teacher")
      throw new Error("Unauthorized acccess for student");

    const classroom = await Classroom.findById(id);

    if (!classroom) {
      throw new Error("Classroom with this ID does not exist.");
    }

    classroom.member.push(member);

    const updatedClassroom = await classroom.save();

    return updatedClassroom;
  } catch (error) {
    throw new Error(error.message);
  }
};
