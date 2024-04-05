const { Users } = require("../../models/Users")

module.exports = async (_, {input}, { req }) => {
    if(!req.user) return "error"
    return await Users.find({});
}





