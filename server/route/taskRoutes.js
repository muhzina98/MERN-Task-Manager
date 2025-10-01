import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskControllers.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;