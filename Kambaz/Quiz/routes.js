// Kambaz/Quiz/routes.js
import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const fullQuiz = req.body;
    try {
      const quiz = await dao.createQuiz(courseId, fullQuiz);
      res.json(quiz);
    } catch (err) {
      console.error("Error creating quiz:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const updated = await dao.updateQuiz(quizId, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const quizzes = await dao.findQuizzesByCourse(req.params.courseId);
      res.json(quizzes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    try {
      const quiz = await dao.findQuizById(req.params.quizId);
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    try {
      const result = await dao.deleteQuiz(req.params.quizId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/quizzes/:quizId/publish", async (req, res) => {
    try {
      const updated = await dao.setQuizPublished(req.params.quizId, req.body.published);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}
