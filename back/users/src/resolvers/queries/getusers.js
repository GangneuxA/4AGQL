const { Users } = require("../../models/Users")

module.exports = async (_, {input}, {}) => {
    return await Users.find({});
}





