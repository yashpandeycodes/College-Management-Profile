import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import studentController  from "../controllers/studentController.js"

const router = express.Router();

router.get(
  "/assignments",
  authMiddleware,
  roleMiddleware("student"),
  studentController.GetStuAssignment
);

router.post(
  "/submit/:assignmentId",
  authMiddleware,
  roleMiddleware("student"),
  studentController.PostStuAssignment
  
);
router.get(
  "/grades",
  authMiddleware,
  roleMiddleware("student"),
  studentController.GetGrades
);

router.get(
  "/attendance",
  authMiddleware,
  roleMiddleware("student"),
 studentController.GetStuAttendance
);

router.get(
  "/calendar",
  authMiddleware,
  roleMiddleware("student"),
  studentController.GetCalendar
  
);

router.get(
  "/tests",
  authMiddleware,
  roleMiddleware("student"),
  studentController.GetStuTest
 
);

router.post(
  "/submit-test/:testId",
  authMiddleware,
  roleMiddleware("student"),
  studentController.PostStuTest
 
);

export default router;