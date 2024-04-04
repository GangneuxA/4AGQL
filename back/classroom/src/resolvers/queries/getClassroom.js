
const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {name}, {}) => {
    return await Classroom.find({
        name: name
    });
}