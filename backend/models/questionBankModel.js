const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: function () {
      // Only required if the field is present
      return this.question !== undefined;
    },
  },
  options: [
    {
      type: String,
      required: function () {
        // Only required if the field is present
        return this.options !== undefined;
      },
    },
  ],
  correctAnswer: {
    type: String,
    required: function () {
      // Only required if the field is present
      return this.correctAnswer !== undefined;
    },
    validate: {
      validator: function (value) {
        // Ensure the correctAnswer is one of the options
        return !this.options || this.options.includes(value);
      },
      message: (props) => `${props.value} is not a valid option`,
    },
  },
});

const questionBankSchema = new mongoose.Schema(
  {
    examname: {
      type: String,
      required: true,
    },
    examlevel: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (questions) {
          // If questions are provided, ensure they are complete
          return questions.every(
            (question) =>
              question.question &&
              question.options &&
              question.options.length > 0 &&
              question.correctAnswer
          );
        },
        message:
          "All fields in each question must be filled if questions are provided",
      },
    },
  },
  {
    timestamps: true,
  }
);

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);
module.exports = QuestionBank;
