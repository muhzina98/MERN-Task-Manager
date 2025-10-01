import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Fetch all tasks
export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const res = await axiosClient.get("/tasks");
  return res.data;
});

// Add new task
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const res = await axiosClient.post("/tasks", task);
  return res.data;
});

// Update task
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, data }) => {
  const res = await axiosClient.put(`/tasks/${id}`, data);
  return res.data;
});

// Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axiosClient.delete(`/tasks/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getTasks
      .addCase(getTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getTasks.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(getTasks.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // addTask
      .addCase(addTask.fulfilled, (state, action) => { state.list.push(action.payload); })

      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
