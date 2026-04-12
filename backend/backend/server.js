import app from "./src/App.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

console.log("SERVER FILE LOADED");


connectDB();


app.listen(process.env.PORT, () => {
  console.log("Server started on port 5000");
});