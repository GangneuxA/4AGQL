const { Users } = require("../../models/Users")

module.exports = async (_, {input}, {models}) => {
    return await Users.find({});
}





