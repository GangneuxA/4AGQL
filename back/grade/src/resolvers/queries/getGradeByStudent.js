
const { Grade } = require("../../models/Grade")

module.exports = async (_, {student}, {}) => {
    return await Grade.find({student: student});
}