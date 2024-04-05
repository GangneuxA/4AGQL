const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id,  member}, {}) => {
    try {

        const classroom = await Classroom.findById(id);

        if (!classroom) {
            throw new Error('Classroom with this ID does not exist.');
        }

        classroom.member.push(member);

        const updatedClassroom = await classroom.save();
        
        return updatedClassroom;
    } catch (error) {
        throw new Error(error.message);
    }
}
