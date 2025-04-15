// Kambaz/Quiz/dao.js
import model from "./model.js";

export const createQuiz = async (courseId, fullQuiz) => {
    const payload = {
      title: fullQuiz.title || "Untitled Quiz",
      description: fullQuiz.description || "",
      course: courseId,
      createdBy: fullQuiz.createdBy || "unknown",
      quizType: fullQuiz.quizType || "Graded Quiz",
      assignmentGroup: fullQuiz.assignmentGroup || "Quizzes",
      points: fullQuiz.points || 0,
      settings: {
        shuffleAnswers: fullQuiz.settings?.shuffleAnswers ?? true,
        timeLimit: fullQuiz.settings?.timeLimit ?? 20,
        multipleAttempts: fullQuiz.settings?.multipleAttempts ?? false,
        howManyAttempts: fullQuiz.settings?.howManyAttempts ?? 1,
        showCorrectAnswers: fullQuiz.settings?.showCorrectAnswers ?? false,
        accessCode: fullQuiz.settings?.accessCode ?? "",
        oneQuestionAtATime: fullQuiz.settings?.oneQuestionAtATime ?? true,
        webcamRequired: fullQuiz.settings?.webcamRequired ?? false,
        lockAfterAnswering: fullQuiz.settings?.lockAfterAnswering ?? false,
      },
      availability: {
        dueDate: fullQuiz.availability?.dueDate ?? null,
        availableFrom: fullQuiz.availability?.availableFrom ?? null,
        availableUntil: fullQuiz.availability?.availableUntil ?? null,
      },
      questions: fullQuiz.questions || [],
      attempts: fullQuiz.attempts || [],
    };
  
    return model.create(payload);
  };  
  
export const findQuizzesByCourse = async (courseId) => {
  return model.find({ course: courseId });
};

export const findQuizById = async (quizId) => {
  return model.findById(quizId);
};

export const updateQuiz = async (quizId, updates) => {
  return model.findByIdAndUpdate(quizId, updates, { new: true });
};

export const deleteQuiz = async (quizId) => {
  return model.findByIdAndDelete(quizId);
};

export const setQuizPublished = async (quizId, published) => {
  return model.findByIdAndUpdate(quizId, { published }, { new: true });
};
