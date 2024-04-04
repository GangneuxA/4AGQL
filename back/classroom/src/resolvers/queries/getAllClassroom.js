const { Classroom } = require("../../models/Classroom")

module.exports = async (_, {}, {}) => {
    return await Classroom.find({});
}





