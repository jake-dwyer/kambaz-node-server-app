import model from "./model.js";

// Create a new quiz
export const createQuiz = async (courseId, facultyId) => {
    const newQuiz = await model.create({ course: courseId, createdBy: facultyId });
    return newQuiz;
  };
  
  // Get all quizzes for a course
  export const findQuizzesByCourse = async (courseId) => {
    return model.find({ course: courseId });
  };
  
  // Get a single quiz by ID
  export const findQuizById = async (quizId) => {
    return model.findById(quizId);
  };
  
  // Update quiz metadata
  export const updateQuiz = async (quizId, updates) => {
    return model.findByIdAndUpdate(quizId, updates, { new: true });
  };
  
  // Delete quiz
  export const deleteQuiz = async (quizId) => {
    return model.findByIdAndDelete(quizId);
  };
  
  // Publish or unpublish quiz
  export const setQuizPublished = async (quizId, published) => {
    return model.findByIdAndUpdate(quizId, { published }, { new: true });
  };
  
  // Add a question
  export const addQuestion = async (quizId, question) => {
    return model.findByIdAndUpdate(
      quizId,
      { $push: { questions: question } },
      { new: true }
    );
  };
  
  // Update a question
  export const updateQuestion = async (quizId, questionId, updates) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    Object.assign(question, updates);
    await quiz.save();
    return quiz;
  };
  
  // Delete a question
  export const deleteQuestion = async (quizId, questionId) => {
    return model.findByIdAndUpdate(
      quizId,
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );
  };
  
  // Record a student quiz attempt
  export const recordStudentAttempt = async (quizId, studentId, answers, score) => {
    return model.findByIdAndUpdate(
      quizId,
      { $push: { attempts: { student: studentId, answers, score, takenAt: new Date() } } },
      { new: true }
    );
  };
  