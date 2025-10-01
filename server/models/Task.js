import { model, Schema } from "mongoose";

const taskSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date }
}, { timestamps: true });

const Task = model("Task", taskSchema);
export default Task;