import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/slices/taskSlice";

export default function TaskForm({ taskToEdit, clearEdit }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    if (taskToEdit) setTask({ ...taskToEdit, dueDate: taskToEdit.dueDate?.split("T")[0] });
  }, [taskToEdit]);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      dispatch(updateTask({ id: taskToEdit._id, data: task }));
      clearEdit();
    } else {
      dispatch(addTask(task));
    }
    setTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <input
        type="text"
        name="title"
        value={task.title}
        placeholder="Title"
        onChange={handleChange}
        required
        style={{ flex: "1 1 200px", padding: "8px" }}
      />
      <input
        type="text"
        name="description"
        value={task.description}
        placeholder="Description"
        onChange={handleChange}
        required
        style={{ flex: "2 1 300px", padding: "8px" }}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        style={{ flex: "1 1 150px", padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>
        {taskToEdit ? "Update" : "Add"} Task
      </button>
      {taskToEdit && <button type="button" onClick={clearEdit} style={{ padding: "8px 12px" }}>Cancel</button>}
    </form>
  );
}
