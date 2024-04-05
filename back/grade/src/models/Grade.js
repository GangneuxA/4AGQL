const mongoose = require("mongoose");

const Grade = mongoose.model("Grade", {
  student: String,
  course: String,
  grade: Number
});

module.exports = { Grade };