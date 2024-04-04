const { Grade } = require("../../models/Grade")
module.exports = async (_, {student, course, grade}, {}) => {

    const newGrade = new Grade({
      student,
      course,
      grade
    });
    await newGrade.save();
    return newGrade;
}