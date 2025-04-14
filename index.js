import express from 'express';
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import Hello from "./Hello.js"
import Lab5 from "./Labs/Lab5/index.js";
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();
const isDev = process.env.NODE_ENV === "development";

app.use(
  cors({
    origin: isDev
      ? "http://localhost:5173"
      : "https://a6--cosmic-donut-a20d76.netlify.app",
    credentials: true,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: isDev ? "lax" : "none",
    secure: !isDev,
  },
};

if (!isDev) {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.get("/debug/assignments", async (req, res) => {
  const data = await mongoose.connection.db.collection("assignments").find().toArray();
  res.json(data);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
