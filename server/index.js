import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./route/authRoutes.js"
import taskRoutes from "./route/taskRoutes.js";
import {  globalErrorHandler } from "./middleware/errorMiddleware.js";
import connectDatabase from './config/connectDatabase.js'
import path from "path"; 

dotenv.config();
connectDatabase();
const app = express();
const __dirname = path.resolve();



app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));

app.use(express.json());


app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.use(globalErrorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})