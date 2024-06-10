export const transformData = (questionBank) => {
  return {
    name: questionBank.examname,
    toggled: true, // Default state for expanded
    children: questionBank.chapters.map((chapter) => ({
      name: chapter.name,
      toggled: true,
      children: chapter.questions.map((question) => ({
        name: question.question,
        toggled: true,
        children: question.options.map((option, index) => ({
          name: `Option ${index + 1}: ${option}${
            option === question.correctAnswer ? " (Correct Answer)" : ""
          }`,
        })),
      })),
    })),
    examlevel: questionBank.examlevel,
    time: questionBank.time,
    chaptersMode: questionBank.chaptersMode,
    GeneralInstruction: questionBank.GeneralInstruction,
  };
};
