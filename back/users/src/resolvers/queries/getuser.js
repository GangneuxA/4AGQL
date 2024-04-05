
const { Users } = require("../../models/Users")

module.exports = async (_, {id}, { req }) => {
    if(!req.user.id) return "error"
    return await Users.findById(id);
}