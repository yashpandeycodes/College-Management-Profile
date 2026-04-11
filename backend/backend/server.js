import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

console.log("SERVER FILE LOADED");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/student", studentRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/hello", (req, res) => {
  res.send("Hello route working");
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port 5000");
});