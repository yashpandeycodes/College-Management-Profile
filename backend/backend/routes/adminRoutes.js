import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Course from "../models/Course.js";
import CalendarEvent from "../models/CalendarEvent.js";
import LoginLog from "../models/LoginLog.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { getPriority } from "os";

const router = express.Router();

router.get("/check", (req, res) => {
  console.log("ADMIN CHECK HIT");
  res.send("Admin route check working");
});


router.get("/users", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    console.log("GET USERS HIT");
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.post("/users", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // temporary placeholder password
    const tempPassword = await bcrypt.hash("temp123456", 10);

    const resetToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      name,
      email,
      password: tempPassword,
      role,
      resetPasswordToken: resetToken,
      resetPasswordExpires: Date.now() + 24 * 60 * 60 * 1000
    });

    await user.save();

    const setPasswordLink = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Set Your Password",
      `Hello ${user.name},\n\nPlease set your password using this link:\n${setPasswordLink}\n\nThis link is valid for 24 hours.`
    );

    res.json({ message: "User added successfully and password set link sent to email" });

  } catch (error) {
    console.log("ADD USER ERROR:", error);
    res.status(500).json({ message: "Error adding user" });
  }
});

router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Get all courses - admin only
router.get("/courses", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const courses = await Course.find().populate("professor", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Add course - admin only
router.post("/courses", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { title, code, professor } = req.body;

    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const course = new Course({
      title,
      code,
      professor: professor || null
    });

    await course.save();

    res.json({ message: "Course added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding course" });
  }
});

// Delete course - admin only
router.delete("/courses/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
});

router.get("/calendar", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const events = await CalendarEvent.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching calendar" });
  }
});

router.post("/calendar", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { title, date, description, category, audience, priority } = req.body;

    const event = new CalendarEvent({
      title,
      date,
      description,
      category,
      audience,
      priority
    });

    await event.save();

    res.json({ message: "Calendar event added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding event" });
  }
});

router.delete("/calendar/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Calendar event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
});

router.get("/login-logs", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ loginTime: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching login logs" });
  }
});

export default router;