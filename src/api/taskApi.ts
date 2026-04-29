import axios from "axios";
import type {
    CreateTaskRequest,
    TaskResponse,
    UpdateTaskStatusRequest,
} from "../types";

const TASK_BASE_URL =
  import.meta.env.VITE_PROJECT_API_URL || "http://localhost:8082/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createTask = async (
  projectId: number,
  data: CreateTaskRequest
): Promise<TaskResponse> => {
  const response = await axios.post<TaskResponse>(
    `${TASK_BASE_URL}/projects/${projectId}/tasks`,
    data,
    getAuthHeaders()
  );

  return response.data;
};

export const getProjectTasks = async (
  projectId: number
): Promise<TaskResponse[]> => {
  const response = await axios.get<TaskResponse[]>(
    `${TASK_BASE_URL}/projects/${projectId}/tasks`,
    getAuthHeaders()
  );

  return response.data;
};

export const getMyTasks = async (): Promise<TaskResponse[]> => {
  const response = await axios.get<TaskResponse[]>(
    `${TASK_BASE_URL}/tasks/my`,
    getAuthHeaders()
  );

  return response.data;
};

export const updateTaskStatus = async (
  taskId: number,
  data: UpdateTaskStatusRequest
): Promise<TaskResponse> => {
  const response = await axios.patch<TaskResponse>(
    `${TASK_BASE_URL}/tasks/${taskId}/status`,
    data,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteTask = async (taskId: number): Promise<string> => {
  const response = await axios.delete<string>(
    `${TASK_BASE_URL}/tasks/${taskId}`,
    getAuthHeaders()
  );

  return response.data;
};