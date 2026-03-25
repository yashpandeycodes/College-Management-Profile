import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/professor", authMiddleware, roleMiddleware("professor"), (req, res) => {
  res.json({ message: "Welcome Professor" });
});

router.get("/student", authMiddleware, roleMiddleware("student"), (req, res) => {
  res.json({ message: "Welcome Student" });
});

router.get("/common", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

export default router;