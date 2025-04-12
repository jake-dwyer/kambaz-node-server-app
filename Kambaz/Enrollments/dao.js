import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function enrollUserInCourse(user, course) {
    const existing = await model.findOne({ user, course });
    if (existing) {
      return existing; // Already enrolled, just return it
    }
    const newEnrollment = { user, course, _id: `${user}-${course}` };
    return model.create(newEnrollment);   }   

   export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
   }   

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export async function findEnrollmentsForUser(userId) {
    return await model.find({ user: userId });
  }
