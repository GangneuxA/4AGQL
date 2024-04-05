const { Grade } = require("../../models/Grade")

module.exports = async (_, {id}, {}) => {
    const result = await Grade.findByIdAndDelete(id);
    return result;
}