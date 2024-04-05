const { Users } = require("../../models/Users")
module.exports = async (_, {}, {req}) => {
    if(!req.user.id) return "error"
    const result = await Users.findByIdAndDelete(req.user.id);
    return result;
}