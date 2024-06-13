export const transformData = (questionBank) => {
  return {
    name: `Exam: ${questionBank.examname}`,
    toggled: true,
    children: [
      {
        name: `Level: ${questionBank.examlevel}`,
      },
      {
        name: `Time: ${questionBank.time}`,
      },
      {
        name: "General Instruction",
        children: [
          {
            name: `Heading: ${questionBank.GeneralInstruction.heading}`,
          },
          ...questionBank.GeneralInstruction.paragraphs.map(
            (paragraph, index) => ({
              name: `Paragraph ${index + 1}: ${paragraph}`,
            })
          ),
        ],
      },
      {
        name: "Chapters",
        children: questionBank.chapters.map((chapter) => ({
          name: `Chapter: ${chapter.name}`,
          toggled: true,
          children: [
            {
              name: `Time: ${chapter.time}`,
            },
            {
              name: "Questions",
              children: chapter.questions.map((question) => ({
                name: `Question: ${question.question}`,
                toggled: true,
                children: question.options.map((option, index) => ({
                  name: `Option ${index + 1}: ${option}${
                    option === question.correctAnswer ? " (Correct Answer)" : ""
                  }`,
                })),
              })),
            },
            {
              name: "Instruction",
              children: [
                {
                  name: `Heading: ${chapter.instruction.heading}`,
                },
                ...chapter.instruction.paragraphs.map((paragraph, index) => ({
                  name: `Paragraph ${index + 1}: ${paragraph}`,
                })),
              ],
            },
          ],
        })),
      },
    ],
  };
};
