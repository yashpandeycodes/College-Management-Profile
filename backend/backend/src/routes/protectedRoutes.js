import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import protectedController from "../controllers/protectedController.js"

const router = express.Router();

router.get("/admin", authMiddleware, roleMiddleware("admin"),protectedController.GetAdmin );

router.get("/professor", authMiddleware, roleMiddleware("professor"),protectedController.GetProfessor );

router.get("/student", authMiddleware, roleMiddleware("student"), protectedController.GetStudent);

router.get("/common", authMiddleware,protectedController.GetCommon );

export default router;