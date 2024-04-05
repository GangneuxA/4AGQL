const { Users } = require("../../models/Users");
const bcrypt = require('bcrypt');

module.exports = async (_, { email, pseudo, password }, { req }) => {
    if(!req.user) throw new Error("Unauthorized access!");
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await Users.findByIdAndUpdate(req.user.id, { pseudo, email, password: hashedPassword });
    return result;
};