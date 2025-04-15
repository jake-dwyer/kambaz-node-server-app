import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  module: String,
  points: Number,
  group: String,
  displayGrade: String,
  submissionType: String,
  options: {
    textEntry: Boolean,
    websiteURL: Boolean,
    mediaRecordings: Boolean,
    studentAnnotation: Boolean,
    fileUploads: Boolean,
  },
  assignTo: String,
  dueDate: String,
  availableFrom: String,
  availableUntil: String,
  description: String,
}, { collection: "assignments" });

export default assignmentSchema;