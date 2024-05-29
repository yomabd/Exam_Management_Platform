const express = require("express");
const mongoose = require("mongoose");
const qBank = require("./models/questionBankModel.js");
const questionBankRoutes = require("./routes/questionbank.route.js");
const questionRoutes = require("./routes/questionroute.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connection link
const uri =
  "mongodb+srv://yomabd:empYomabd27@clusteremp.cyaqufk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterEMP";

//connect to mongodb using mongoose
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection to mongodb established!");
    app.listen(3005, () => {
      console.log("Listening to connections at PORT 3005");
    });
  })
  .catch((error) => {
    console.log(`error occured: ${error}`);
  });

// Mount the question bank routes
app.use("/api", questionBankRoutes);

// Mount the question routes
app.use("/api", questionRoutes);

///////////......................//////////////////////////////////

app.get("/api/exams", async (req, res) => {
  try {
    const questions = await qBank.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Default backend route
app.get("/", (req, res) => {
  //   res.send("......QUESTIONS BANKS........");
  //   res.status(200).json("Take a look at it carefully");
  res.status(200).json({ questionBanks, status: res.statusCode });
  console.log("This is the middleware");
});

//sample data
const questionBanks = [
  {
    name: "Bank 1",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "London", "Rome"],
        correctAnswer: "Paris",
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correctAnswer: "Jupiter",
      },
    ],
  },

  {
    name: "Bank 2",
    questions: [
      {
        question: "What is the capital of Nigeria?",
        options: ["Lafiagi", "Kano", "Abuja", "Kwar"],
        correctAnswer: "Abuja",
      },
      {
        question: "What is the smallest unit of life?",
        options: ["matter", "cell", "organs", "intestines"],
        correctAnswer: "cell",
      },
    ],
  },

  {
    name: "Bank 2",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "London", "Rome"],
        correctAnswer: "Paris",
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correctAnswer: "Jupiter",
      },
    ],
  },
];
