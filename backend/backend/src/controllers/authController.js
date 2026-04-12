import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import LoginLog from "../models/LoginLog.js";
import sendEmail from "../utils/sendEmail.js";

const PostRegister= async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  await user.save();

  res.status(201).json({ message: "User registered" });
}

const PostLogin= async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otpCode = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(
      user.email,
      "Login OTP",
      `Your OTP is ${otp}`
    );

    res.status(201).json({
      message: "OTP sent to email",
      otpRequired: true,
      email: user.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login error" });
  }
}

const PostForgotPassword=async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.SET_PASSWORD_LINK}/${resetToken}`;

    console.log("FORGOT EMAIL:", user.email);
    console.log("RESET LINK:", resetLink);

    const emailSent = await sendEmail(
      user.email,
      "Password Reset Link",
      `Click this link to reset your password:\n\n${resetLink}\n\nThis link is valid for 15 minutes.`
    );

    console.log("EMAIL SENT STATUS:", emailSent);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send reset link email" });
    }

    res.status(401).json({
      message: "Reset password link sent to your email"
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Error generating reset link" });
  }
}

const PostResetPassword=async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(201).json({ message: "Password set/reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error resetting password" });
  }
}

const PostVerifyOtp=async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otpCode || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP generated" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await LoginLog.create({
      email: user.email,
      role: user.role
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "OTP verification error" });
  }
}

export default {PostRegister,PostLogin,PostForgotPassword,PostVerifyOtp,PostResetPassword};