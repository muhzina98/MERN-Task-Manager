import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI, register as registerAPI } from "../../api/auth.js";

const token = localStorage.getItem("token") || null;

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const data = await loginAPI(credentials);
  localStorage.setItem("token", data.token);
  return data;
});

export const register = createAsyncThunk("auth/register", async (user) => {
  return await registerAPI(user);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.token = action.payload.token; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state) => { state.loading = false; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
