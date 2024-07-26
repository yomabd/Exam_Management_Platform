const Result = require("../models/resultModel");

//controller to submit exam results
const submitResult = async (req, res) => {
  const user = req?.user;
  if (!user) {
    return res
      .status(401)
      .json({ message: "Unathorized User! Please log in." });
  }
  const { examId, score } = req.body;
  if (!examId || !score) {
    return res
      .status(401)
      .json({ message: "Credentials submitted cannot be empty!" });
  }

  try {
    const result = new Result({
      examId,
      candidateId: req.user._id,
      score,
    });
    await result.save();
    res.status(201).json({ message: "Result submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting result", error });
  }
};

const retrieveResult = async (req, res) => {
  const user = req?.user;
  if (!user) {
    return res
      .status(401)
      .json({ message: "Unathorized User! Please log in." });
  }
  const { examId } = req.params;

  try {
    const results = await Result.find({ examId }).populate(
      "candidateId",
      "firstname lastname email"
    );
    if (!results) {
      return res.status(404).json({ message: "Result not found!" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
};

module.exports = {
  submitResult,
  retrieveResult,
};
