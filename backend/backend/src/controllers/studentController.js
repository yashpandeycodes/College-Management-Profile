
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Grade from "../models/Grade.js";
import Attendance from "../models/Attendance.js";
import CalendarEvent from "../models/CalendarEvent.js";
import Test from "../models/Test.js";
import TestSubmission from "../models/TestSubmission.js";

const GetStuAssignment= async (req, res) => {
    try {
      const assignments = await Assignment.find().populate("professor", "name email");
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching assignments" });
    }
  }

  const PostStuAssignment=async (req, res) => {
    try {
      const { content } = req.body;

      const existingSubmission = await Submission.findOne({
        assignment: req.params.assignmentId,
        student: req.user.id
      });

      if (existingSubmission) {
        return res.status(400).json({ message: "Already submitted" });
      }

      const submission = new Submission({
        assignment: req.params.assignmentId,
        student: req.user.id,
        content
      });

      await submission.save();

      res.json({ message: "Assignment submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error submitting assignment" });
    }
  }

  const GetGrades=async (req, res) => {
    try {
      const grades = await Grade.find({ student: req.user.id }).populate("course", "title code");
      res.json(grades);
    } catch (error) {
      res.status(500).json({ message: "Error fetching grades" });
    }
  }

  const GetStuAttendance= async (req, res) => {
    try {
      const attendance = await Attendance.find({ student: req.user.id }).populate("course", "title code");
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: "Error fetching attendance" });
    }
  }

  const GetCalendar=async (req, res) => {
    try {
      const events = await CalendarEvent.find({
        audience: { $in: ["All", "Students"] }
      }).sort({ date: 1 });

      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching calendar" });
    }
  }

  const GetStuTest=  async (req, res) => {
    try {
      const tests = await Test.find().populate("course", "title code").populate("professor", "name email");
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tests" });
    }
  }

    const PostStuTest= async (req, res) => {
    try {
      const { content } = req.body;

      const existingSubmission = await TestSubmission.findOne({
        test: req.params.testId,
        student: req.user.id
      });

      if (existingSubmission) {
        return res.status(400).json({ message: "Test already submitted" });
      }

      const submission = new TestSubmission({
        test: req.params.testId,
        student: req.user.id,
        content
      });

      await submission.save();

      res.json({ message: "Test submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error submitting test" });
    }
  }

  export default {GetCalendar,GetGrades,GetStuAssignment,GetStuAttendance,GetStuTest,PostStuAssignment,PostStuTest}