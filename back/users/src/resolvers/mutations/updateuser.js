const { Users } = require("../../models/Users");

module.exports = async (_, { email, pseudo, password }, { req }) => {
    if(!req.user.id) return "error"
    const result = await Users.findByIdAndUpdate(req.user.id, { pseudo, email, password });
    return result;
};