import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = { ...req.body, course: courseId };
    const created = await dao.createAssignment(newAssignment);
    res.send(created);
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.send(assignments);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const updated = await dao.updateAssignment(assignmentId, updates);
    res.send(updated);
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.send(status);
  });
}
