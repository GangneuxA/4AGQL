const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id, member}, {}) => {

    const classroom = await Classroom.findById(id);

    const memberIndex = classroom.member.indexOf(member);

    classroom.member.splice(memberIndex, 1);

    return await classroom.save();
}