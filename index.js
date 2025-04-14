import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import Hello from "./Hello.js";
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

// ✅ Proper CORS config
app.use(cors({
  origin: isDev ? "http://localhost:5173" : process.env.NETLIFY_URL,
  credentials: true,
}));

// ✅ JSON middleware
app.use(express.json());

// ✅ Session config
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
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = new URL(`https://${process.env.NODE_SERVER_DOMAIN}`).hostname;
}

app.set("trust proxy", 1); // needed for secure cookies behind proxies
app.use(session(sessionOptions));

// ✅ Routes
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
