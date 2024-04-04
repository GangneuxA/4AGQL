const { Users } = require("../../models/Users")
module.exports = async (_, {id, email, pseudo,password}, {models}) => {
    const result = await Users.findByIdAndUpdate(id, {pseudo, email,password });
    return result;
}
