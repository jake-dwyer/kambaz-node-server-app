import * as dao from "./quizDao.js";

export default function QuizRoutes(app) {
  // Faculty creates quiz
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body;
    try {
      const quiz = await dao.createQuiz(courseId, userId);
      res.json(quiz);
    } catch (err) {
      console.error("Error creating quiz:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Faculty updates quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const updated = await dao.updateQuiz(quizId, req.body);
      res.json(updated);
    } catch (err) {
      console.error("Error updating quiz:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Faculty deletes quiz
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const deleted = await dao.deleteQuiz(quizId);
      res.json(deleted);
    } catch (err) {
      console.error("Error deleting quiz:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Get quizzes for a course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await dao.findQuizzesByCourse(courseId);
      res.json(quizzes);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Get single quiz by ID
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await dao.findQuizById(quizId);
      res.json(quiz);
    } catch (err) {
      console.error("Error fetching quiz:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Publish/unpublish quiz
  app.post("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const { published } = req.body;
    try {
      const result = await dao.setQuizPublished(quizId, published);
      res.json(result);
    } catch (err) {
      console.error("Error updating publish status:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Add question to quiz
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    try {
      const updated = await dao.addQuestion(quizId, req.body);
      res.json(updated);
    } catch (err) {
      console.error("Error adding question:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Update a question
  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    try {
      const updated = await dao.updateQuestion(quizId, questionId, req.body);
      res.json(updated);
    } catch (err) {
      console.error("Error updating question:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Delete a question
  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    try {
      const updated = await dao.deleteQuestion(quizId, questionId);
      res.json(updated);
    } catch (err) {
      console.error("Error deleting question:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Submit a student quiz attempt
  app.post("/api/quizzes/:quizId/submit", async (req, res) => {
    const { quizId } = req.params;
    const { studentId, answers, score } = req.body;
    try {
      const result = await dao.recordStudentAttempt(quizId, studentId, answers, score);
      res.json(result);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      res.status(500).json({ error: err.message });
    }
  });
}
