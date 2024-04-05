const mongoose = require("mongoose");

const Classroom = mongoose.model("Classroom", {
  name: String,
  numberMax: Number,
  member: [{
    type: String
  }]
});

module.exports = { Classroom };