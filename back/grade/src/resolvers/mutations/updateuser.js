const { Users } = require("../../models/Users")
module.exports = async (_, {id,  name, email, age,password}, {models}) => {
    const result = await Users.findByIdAndUpdate(id, {name, email,age,password });
    return result;
}
