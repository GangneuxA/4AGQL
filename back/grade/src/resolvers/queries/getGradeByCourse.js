
const { Grade } = require("../../models/Grade")

module.exports = async (_, {course}, {}) => {
    return await Grade.find({course: course});
}