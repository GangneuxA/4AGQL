const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id}, {}) => {
    const result = await Classroom.findByIdAndDelete(id);
    return result;
}