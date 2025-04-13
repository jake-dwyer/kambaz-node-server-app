import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
 },
 { collection: "assignments" }
);
export default assignmentSchema;