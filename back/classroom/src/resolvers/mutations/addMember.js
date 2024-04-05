const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id,  member}, {}) => {
    const classroom = await Classroom.findById(id);
    classroom.member.push(member);
    return await classroom.save();
}
