const { Grade } = require("../../models/Grade")

module.exports = async (_, {}, {req}) => {
    console.log(req.user)
    return await Grade.find({}).sort({course: 1});
}





