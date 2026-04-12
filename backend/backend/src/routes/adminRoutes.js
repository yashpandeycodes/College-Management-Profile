import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/check", (req, res) => {
  console.log("ADMIN CHECK HIT");
  res.send("Admin route check working");
});


router.get("/users", authMiddleware, roleMiddleware("admin"), adminController.GetUsers );

router.post("/users", authMiddleware, roleMiddleware("admin"), adminController.PostUsers );

router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), adminController.DeleteUsers);

router.get("/courses", authMiddleware, roleMiddleware("admin"), adminController.GetCourses);

router.post("/courses", authMiddleware, roleMiddleware("admin"), adminController.PostCourses);


router.delete("/courses/:id", authMiddleware, roleMiddleware("admin"), adminController.DeleteCourses);

router.get("/calendar", authMiddleware, roleMiddleware("admin"),adminController.GetCalender);

router.post("/calendar", authMiddleware, roleMiddleware("admin"),adminController.PostCalender );

router.delete("/calendar/:id", authMiddleware, roleMiddleware("admin"), adminController.DeleteCalender);

router.get("/login-logs", authMiddleware, roleMiddleware("admin"),adminController.GetLoginLogs );

export default router;