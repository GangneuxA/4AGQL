const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id, member}, {}) => {

    try {

        const classroom = await Classroom.findById(id);

        if (!classroom) {
            throw new Error('Classroom with this ID does not exist.');
        }

        const memberIndex = classroom.member.indexOf(member);

        if (memberIndex === -1) {
            throw new Error('Member not found in the classroom.');
        }

        classroom.member.splice(memberIndex, 1);

        const updatedClassroom = await classroom.save();
        
        return updatedClassroom;
    } catch (error) {
        throw new Error(error.message);
    }
}