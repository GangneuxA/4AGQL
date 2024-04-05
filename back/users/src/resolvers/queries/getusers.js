const { Users } = require("../../models/Users")

module.exports = async (_, {input}, { req }) => {
    if(!req.user) throw new Error("Unauthorized access!");
    return await Users.find({});
}





