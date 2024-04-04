
const { Users } = require("../../models/Users")

module.exports = async (_, {id}, {models}) => {
    return await Users.findById(id);
}