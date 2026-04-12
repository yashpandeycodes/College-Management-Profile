import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

export default mongoose.model("Course", courseSchema);