import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    marks: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Grade", gradeSchema);