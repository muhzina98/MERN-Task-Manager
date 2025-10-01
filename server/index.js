import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./route/authRoutes.js"
import taskRoutes from "./route/taskRoutes.js";
import {  globalErrorHandler } from "./middleware/errorMiddleware.js";
import connectDatabase from './config/connectDatabase.js'
dotenv.config();
connectDatabase();
const app = express();


app.use(cors(
{
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(globalErrorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})