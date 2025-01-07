import axios from "axios";
import { Task } from "@/types/task";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
});

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const taskApi = {
  getTasks: async () => {
    const response = await api.get<ApiResponse<Task[]>>("/tasks");
    return response.data;
  },

  createTask: async (data: Pick<Task, "title" | "description">) => {
    const response = await api.post<ApiResponse<Task>>("/tasks", data);
    return response.data;
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/tasks/${id}`);
    return response.data;
  },

  reorderTasks: async (tasks: { _id: string; order: number }[]) => {
    const response = await api.put<ApiResponse<Task[]>>("/tasks/reorder", {
      tasks,
    });
    return response.data;
  },
};
