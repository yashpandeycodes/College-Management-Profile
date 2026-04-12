import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import professorController from "../controllers/professorController.js"

const router = express.Router();

router.get("/assignments",
  authMiddleware,
  roleMiddleware("professor"),
  professorController.GetAssignment
);


router.post("/assignments",
  authMiddleware,
  roleMiddleware("professor"),
  professorController.PostAssignment
);


router.delete(
  "/assignments/:id",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.DeleteAssignment
);

router.get(
  "/submissions",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.GetSubmissions
);

router.delete(
  "/submissions/:id",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.DeleteSubmissions
);

router.get(
  "/students",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.GetStudents
);

router.get(
  "/courses",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.GetCourses
);

router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.GetAnalytics
);

router.post(
  "/grades",
  authMiddleware,
  roleMiddleware("professor"),
professorController.PostGrades
);

router.post(
  "/attendance",
  authMiddleware,
  roleMiddleware("professor"),
  professorController.PostAttendance
 
);
router.get(
  "/tests",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.GetTest
);

router.post(
  "/tests",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.PostTest
);

router.delete(
  "/tests/:id",
  authMiddleware,roleMiddleware("professor"),
  professorController.DeleteTest
);

router.get(
  "/test-submissions",
  authMiddleware,
  roleMiddleware("professor"),
 professorController.GetTestSubmission
);

router.get(
  "/calendar",
  authMiddleware,
  roleMiddleware("professor"),
  professorController.GetCalendar
);



export default router;