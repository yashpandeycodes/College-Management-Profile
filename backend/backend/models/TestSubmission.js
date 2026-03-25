import mongoose from "mongoose";

const testSubmissionSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    obtainedMarks: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      default: "submitted"
    }
  },
  { timestamps: true }
);

export default mongoose.models.TestSubmission || mongoose.model("TestSubmission", testSubmissionSchema);