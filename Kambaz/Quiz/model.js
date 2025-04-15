// Kambaz/Quiz/model.js
import mongoose from "mongoose";
import schema from "./schema.js";

const QUIZ_MODEL = "Quiz";

const model = mongoose.models[QUIZ_MODEL] || mongoose.model(QUIZ_MODEL, schema);
export default model;
