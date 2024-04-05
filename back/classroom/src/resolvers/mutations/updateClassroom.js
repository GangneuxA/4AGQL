const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {id,  name, numberMax}, {}) => {
    const result = await Classroom.findByIdAndUpdate(id, {name, numberMax });
    return result;
}
