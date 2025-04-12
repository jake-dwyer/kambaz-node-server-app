import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const result = await dao.enrollUserInCourse(userId, courseId);
      res.json(result);
    } catch (err) {
      console.error("Error enrolling:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const result = await dao.unenrollUserFromCourse(userId, courseId);
      res.json(result);
    } catch (err) {
      console.error("Error unenrolling:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/users/:userId/courses", async (req, res) => {
    const { userId } = req.params;
    try {
      const courses = await dao.findCoursesForUser(userId);
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/courses/:courseId/users", async (req, res) => {
    const { courseId } = req.params;
    try {
      const users = await dao.findUsersForCourse(courseId);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userEnrollments = await dao.findEnrollmentsForUser(userId);
      res.send(userEnrollments);
    } catch (err) {
      console.error("🔥 Failed to get enrollments:", err);
      res.status(500).json({ error: err.message });
    }
  });  

  app.get("/api/enrollments", async (req, res) => {
    const all = await dao.findAllEnrollments();
    res.json(all);
  });
}
