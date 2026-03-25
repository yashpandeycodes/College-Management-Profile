import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    maxMarks: {
      type: Number,
      default: 100
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.models.Test || mongoose.model("Test", testSchema);