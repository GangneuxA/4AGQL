const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id}, {}) => {
    const classroom = await Classroom.findById(id);

    if (classroom.member.length !== 0) {
        return 'the member list is not empty';
    }

    const result = await Classroom.findByIdAndDelete(id);
    return result;
}