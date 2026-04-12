import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      enum: ["Exam", "Holiday", "Assignment", "Registration", "Event"],
      default: "Event"
    },
    audience: {
      type: String,
      enum: ["All", "Students", "Professors"],
      default: "All"
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium"
    }
  },
  { timestamps: true }
);

export default mongoose.models.CalendarEvent ||
  mongoose.model("CalendarEvent", calendarEventSchema);