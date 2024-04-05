const { Grade } = require("../../models/Grade")

module.exports = async (_, {}, {}) => {
    return await Grade.find({}).sort({course: 1});
}





