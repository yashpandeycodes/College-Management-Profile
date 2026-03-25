import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    loginTime: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.models.LoginLog || mongoose.model("LoginLog", loginLogSchema);