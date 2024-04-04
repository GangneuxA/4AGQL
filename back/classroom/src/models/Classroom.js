const mongoose = require("mongoose");

const Classroom = mongoose.model("Classroom", {
  name: String,
  numberMax: Number
});

module.exports = { Classroom };