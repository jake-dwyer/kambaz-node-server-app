import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("Quiz", schema);
export default model;
