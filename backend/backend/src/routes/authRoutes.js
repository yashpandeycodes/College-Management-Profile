import express from "express";
import authController from "../controllers/authController.js"

const router = express.Router();

router.post("/register",authController.PostRegister);

router.post("/login",authController.PostLogin);

router.post("/forgot-password",authController.PostForgotPassword );

router.post("/reset-password/:token",authController.PostResetPassword );

router.post("/verify-otp",authController.PostVerifyOtp );

export default router;