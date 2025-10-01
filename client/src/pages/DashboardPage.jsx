import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask, updateTask } from "../redux/slices/taskSlice";
import TaskForm from "../components/TaskForm";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { list: tasks, loading, error } = useSelector((state) => state.tasks);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleToggleComplete = (task) => {
    dispatch(updateTask({ id: task._id, data: { completed: !task.completed } }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Tasks</h1>

      <TaskForm taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
        {tasks.length === 0 && !loading ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: task.completed ? "#e0ffe0" : "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 5px" }}>{task.title}</h3>
                <p style={{ margin: "0 0 10px" }}>{task.description}</p>
                {task.dueDate && <p style={{ fontSize: "0.9em", color: "#555" }}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                <p>Status: {task.completed ? <span style={{ color: "green" }}>Completed</span> : <span style={{ color: "red" }}>Pending</span>}</p>
              </div>
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => setTaskToEdit(task)}>Edit</button>
                <button onClick={() => dispatch(deleteTask(task._id))}>Delete</button>
                <button onClick={() => handleToggleComplete(task)}>
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
