import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./route/authRoutes.js";
import taskRoutes from "./route/taskRoutes.js";
import { globalErrorHandler } from "./middleware/errorMiddleware.js";
import connectDatabase from "./config/connectDatabase.js";
import path from "path";

dotenv.config();
connectDatabase();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  
  app.get("/", (req, res) => res.send("API is running"));
}

// Global error handler
app.use(globalErrorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
