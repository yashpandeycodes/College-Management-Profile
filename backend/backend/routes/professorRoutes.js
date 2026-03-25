import express from "express";
import Assignment from "../models/Assignment.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Submission from "../models/Submission.js";
import Grade from "../models/Grade.js";
import Attendance from "../models/Attendance.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Test from "../models/Test.js";
import TestSubmission from "../models/TestSubmission.js";
import CalendarEvent from "../models/CalendarEvent.js";

const router = express.Router();


// Get assignments (professor)
router.get("/assignments",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {

    try {

      const assignments = await Assignment.find({
        professor: req.user.id
      });

      res.json(assignments);

    } catch (error) {
      res.status(500).json({ message: "Error fetching assignments" });
    }
  }
);


// Add assignment
router.post("/assignments",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {

    try {

      const { title, description, course, dueDate } = req.body;

      const assignment = new Assignment({
        title,
        description,
        course,
        dueDate,
        professor: req.user.id
      });

      await assignment.save();

      res.json({ message: "Assignment added" });

    } catch (error) {
      res.status(500).json({ message: "Error adding assignment" });
    }
  }
);


// Delete assignment

router.delete(
  "/assignments/:id",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const assignment = await Assignment.findOneAndDelete({
        _id: req.params.id,
        professor: req.user.id
      });

      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting" });
    }
  }
);

router.get(
  "/submissions",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const assignments = await Assignment.find({ professor: req.user.id }).select("_id");

      const assignmentIds = assignments.map((a) => a._id);

      const submissions = await Submission.find({
        assignment: { $in: assignmentIds }
      })
        .populate("student", "name email")
        .populate("assignment", "title");

      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching submissions" });
    }
  }
);

router.delete(
  "/submissions/:id",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const submission = await Submission.findById(req.params.id).populate("assignment");

      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      if (String(submission.assignment.professor) !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      await Submission.findByIdAndDelete(req.params.id);

      res.json({ message: "Submission deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting submission" });
    }
  }
);

router.get(
  "/students",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).select("name email");
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students" });
    }
  }
);

router.get(
  "/courses",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const courses = await Course.find().select("title code");
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses" });
    }
  }
);

router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const totalStudents = await User.countDocuments({ role: "student" });

      const totalSubmissions = await Submission.countDocuments();

      const grades = await Grade.find();

      const attendance = await Attendance.find();

      let avgMarks = 0;
      let avgAttendance = 0;

      if (grades.length > 0) {
        avgMarks =
          grades.reduce((sum, g) => sum + (g.marks || 0), 0) /
          grades.length;
      }

      if (attendance.length > 0) {
        avgAttendance =
          attendance.reduce((sum, a) => sum + (a.percentage || 0), 0) /
          attendance.length;
      }

      res.json({
        totalStudents,
        totalSubmissions,
        avgMarks: avgMarks.toFixed(2),
        avgAttendance: avgAttendance.toFixed(2)
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching analytics" });
    }
  }
);

router.post(
  "/grades",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const { student, course, marks } = req.body;

      const existingGrade = await Grade.findOne({ student, course });

      if (existingGrade) {
        existingGrade.marks = marks;
        await existingGrade.save();
        return res.json({ message: "Grade updated successfully" });
      }

      const grade = new Grade({
        student,
        course,
        marks
      });

      await grade.save();

      res.json({ message: "Grade uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading grade" });
    }
  }
);

router.post(
  "/attendance",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const { student, course, percentage } = req.body;

      const existingAttendance = await Attendance.findOne({ student, course });

      if (existingAttendance) {
        existingAttendance.percentage = percentage;
        await existingAttendance.save();
        return res.json({ message: "Attendance updated successfully" });
      }

      const attendance = new Attendance({
        student,
        course,
        percentage
      });

      await attendance.save();

      res.json({ message: "Attendance uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading attendance" });
    }
  }
);
router.get(
  "/tests",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const tests = await Test.find({ professor: req.user.id }).populate("course", "title code");
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tests" });
    }
  }
);

router.post(
  "/tests",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const { title, course, maxMarks, dueDate } = req.body;

      const test = new Test({
        title,
        course: course || null,
        maxMarks,
        dueDate,
        professor: req.user.id
      });

      await test.save();

      res.json({ message: "Test added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding test" });
    }
  }
);

router.delete(
  "/tests/:id",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      await Test.findOneAndDelete({
        _id: req.params.id,
        professor: req.user.id
      });

      res.json({ message: "Test deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting test" });
    }
  }
);

router.get(
  "/test-submissions",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const tests = await Test.find({ professor: req.user.id }).select("_id");
      const testIds = tests.map((t) => t._id);

      const submissions = await TestSubmission.find({
        test: { $in: testIds }
      })
        .populate("student", "name email")
        .populate("test", "title");

      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching test submissions" });
    }
  }
);

router.get(
  "/calendar",
  authMiddleware,
  roleMiddleware("professor"),
  async (req, res) => {
    try {
      const events = await CalendarEvent.find({
        audience: { $in: ["All", "Professors"] }
      }).sort({ date: 1 });

      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching calendar" });
    }
  }
);



export default router;