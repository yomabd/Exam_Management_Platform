const mongoose = require("mongoose");

//define question schema
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

//define chapter schema

const chapterSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  //  chapters:[]
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
  instruction: {
    heading: {
      type: String,
      required: false,
    },
    paragraphs: [
      {
        type: String,
        required: false,
      },
    ],
  },
});

//// define questionBanks schema schema

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
    time: {
      type: Number,
      required: false,
    },
    chaptersMode: {
      type: String,
      required: false,
      enum: ["auto", "none"],
    },
    GeneralInstruction: {
      type: {
        heading: {
          type: String,
          required: false,
        },
        paragraphs: [{ type: String, required: false }],
      },
    },
    chapters: { type: [chapterSchema], required: false },
  },
  {
    timestamps: true,
  }
);

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);
module.exports = QuestionBank;
