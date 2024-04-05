const { Grade } = require("../../models/Grade")

module.exports = async (_, {id, grade}, {}) => {
    const result = await Grade.findByIdAndUpdate(id, {grade});
    return result;
}
