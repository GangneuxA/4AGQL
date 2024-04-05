const { Grade } = require("../../models/Grade")
module.exports = async (_, {student, course, grade}, {}) => {

    if(!req.user) throw new Error("Unauthorized access!");
    if(req.user.role === 'teacher') throw new Error("Unauthorized acccess for student")

    const newGrade = new Grade({
      student,
      course,
      grade
    });
    await newGrade.save();
    return newGrade;
}