import api from "./api";

// params = { search, status, priority, category, sortBy, order }
export const getTasks = (params) => api.get("/tasks", { params });
export const getTaskById = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
