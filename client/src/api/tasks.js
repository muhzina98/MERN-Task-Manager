import axios from "axios";

const API = axios.create({ baseURL: "/tasks" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTasks = async () => (await API.get("/")).data;
export const addTask = async (task) => (await API.post("/", task)).data;
export const updateTask = async (id, task) => (await API.put(`/${id}`, task)).data;
export const deleteTask = async (id) => (await API.delete(`/${id}`)).data;
