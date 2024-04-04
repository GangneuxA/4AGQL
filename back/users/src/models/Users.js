const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    pseudo: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'student',
      required: true
    },
    password: {
      type: String,
      required: true
    },
});

const Users = mongoose.model("Users", UsersSchema);
module.exports = { Users };