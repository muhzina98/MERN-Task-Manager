import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../redux/slices/taskSlice";
import TaskForm from "../components/TaskForm";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.tasks);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => { dispatch(getTasks()); }, [dispatch]);

  return (
    <div>
      <h1>My Tasks</h1>
      <TaskForm taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />
      {loading && <p>Loading...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}
      <ul>
        {list.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description}
            <button onClick={() => setTaskToEdit(task)}>Edit</button>
            <button onClick={() => dispatch(deleteTask(task._id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
