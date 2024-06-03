const mongoose = require("mongoose");
const QuestionBank = require("../models/questionBankModel"); // Adjust the path if needed
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const updateQuestionBanks = async () => {
  try {
    // Find all question banks with non-empty questions field
    const questionBanks = await QuestionBank.find({
      questions: { $exists: true, $ne: [] },
    });

    // Log the number of question banks found
    console.log(`Found ${questionBanks.length} question banks`);

    // Update each question bank
    for (const qb of questionBanks) {
      console.log(`Updating question bank: ${qb._id}`);
      console.log(`Current state: ${JSON.stringify(qb, null, 2)}`);

      // Check if the `questions` field exists and move to `chapters`
      if (qb.questions && qb.questions.length > 0) {
        console.log(
          `Moving questions to chapters for question bank: ${qb._id}`
        );

        if (!qb.chapters || qb.chapters.length === 0) {
          qb.chapters = [
            {
              questions: qb.questions,
              time: 0, // Default value for time
              name: "Default Chapter", // Default value for name
              instruction: {
                heading: "", // Default value for heading
                paragraphs: [], // Default value for paragraphs
              },
            },
          ];
        } else {
          qb.chapters[0].questions = qb.questions;
        }

        // Remove the old `questions` field
        qb.questions = undefined;

        // Save the updated question bank
        await qb.save();
        console.log(`Saved updated question bank: ${qb._id}`);
      } else {
        console.log(`No questions to move for question bank: ${qb._id}`);
      }
    }

    console.log("Question banks updated successfully");
  } catch (error) {
    console.error("Error updating question banks:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Run the update script
updateQuestionBanks();
