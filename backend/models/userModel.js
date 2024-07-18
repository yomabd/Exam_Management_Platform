const mongoose = require("mongoose");

//create userSchema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "candidate"],
  },
  assignedExams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionBank",
    },
  ],

  date: {
    type: Date,
    default: Date.now(),
  },
});

// initiate a model to interface with users documents
const users = mongoose.model("users", userSchema);

//export users model
module.exports = users;
