// Kambaz/Quiz/schema.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "fill-in-the-blank"],
    required: true,
  },
  title: String,
  points: { type: Number, default: 1 },
  questionText: String,
  choices: [String],
  correctChoiceIndex: Number,
  correctAnswer: String,
  possibleAnswers: [String],
  correctTrueFalse: Boolean,
}, { _id: true });

const attemptSchema = new mongoose.Schema({
  student: String,
  answers: [mongoose.Schema.Types.Mixed],
  score: Number,
  takenAt: { type: Date, default: Date.now },
}, { _id: false });

const quizSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled Quiz" },
  description: String,
  course: String,
  createdBy: String,
  published: { type: Boolean, default: false },
  quizType: {
    type: String,
    enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    default: "Graded Quiz",
  },
  assignmentGroup: {
    type: String,
    enum: ["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes",
  },
  points: { type: Number, default: 0 },
  settings: {
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockAfterAnswering: { type: Boolean, default: false },
  },
  availability: {
    dueDate: Date,
    availableFrom: Date,
    availableUntil: Date,
  },
  questions: [questionSchema],
  attempts: [attemptSchema],
}, { collection: "quizzes", timestamps: true });

export default quizSchema;