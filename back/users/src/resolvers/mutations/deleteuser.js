const { Users } = require("../../models/Users")
module.exports = async (_, {id}, {models}) => {
    const result = await Users.findByIdAndDelete(id);
    return result;
}