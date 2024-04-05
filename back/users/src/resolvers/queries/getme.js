const { Users } = require("../../models/Users")

module.exports = async (_, {}, { req }) => {
    if(!req.user) throw new Error("Unauthorized access!");
    return await Users.findById(req.user.id);
}