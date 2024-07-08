import axios from "./axios";
export const getTasks = async () => await axios.get("/tasks");
export const getTask = async (id: string) => await axios.get(`/tasks/${id}`);
export const createTask = async (body: any) => await axios.post("/tasks", body);
export const getByType = async (id: string) => await axios.get(`/tasks/getbytype/${id}`);
export const updateTask = async (id:string,  body: any) => await axios.put(`/tasks/${id}`, body);
export const deleteTask = async (id:string) => await axios.delete(`/tasks/${id}`);

