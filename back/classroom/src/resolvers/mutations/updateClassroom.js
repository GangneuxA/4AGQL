    const { Classroom } = require("../../models/Classroom")

    module.exports = async (_, {id,  name, numberMax}, {}) => {
        try {
    
            const existingClassroom = await Classroom.findById(id);
            if (!existingClassroom) {
                throw new Error(' Classroomwith this ID does not exist.');
            }

            const result = await Classroom.findByIdAndUpdate(id, { name, numberMax });
    
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
