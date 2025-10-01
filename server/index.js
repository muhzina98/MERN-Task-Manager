import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./route/authRoutes.js";
import taskRoutes from "./route/taskRoutes.js";
import { globalErrorHandler } from "./middleware/errorMiddleware.js";
import connectDatabase from "./config/connectDatabase.js";

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

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

else {
  app.get("/", (req, res) => res.send("API is running"));
}

// Global error handler
app.use(globalErrorHandler);

// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
