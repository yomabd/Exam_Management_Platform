const mongoose = require("mongoose");

//define question schema
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (options) {
        return options !== undefined && options.length >= 2;
      },
      message: (props) => `${props.value} does not have at least two options`,
    },
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (correctAnswer) {
        // Ensure the correctAnswer is one of the options
        return this.options.includes(correctAnswer);
      },
      message: (props) => `${props.value} is not one of the options`,
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
    required: false,
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
            question.options.length >= 2 &&
            question.correctAnswer &&
            question.options.includes(question.correctAnswer)
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
    paragraphs: {
      type: [String],
      required: false,
    },
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
      required: true,
      enum: ["auto", "none"],
    },
    GeneralInstruction: {
      heading: {
        type: String,
        required: false,
      },
      paragraphs: {
        type: [String],
        required: false,
      },
    },
    chapters: {
      type: [chapterSchema],
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);
module.exports = QuestionBank;
