import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "professor", "student"],
      required: true
    },

    // Login OTP for 2FA
    otpCode: {
      type: String,
      default: null
    },

    otpExpires: {
      type: Date,
      default: null
    },

    // Forgot password OTP
    resetOtp: {
      type: String,
      default: null
    },

    resetOtpExpiry: {
      type: Date,
      default: null
    },

    // Password reset link/token
    resetPasswordToken: {
      type: String,
      default: null
    },

    resetPasswordExpires: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);