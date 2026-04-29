import axios from "axios";
import type {
    AddMemberRequest,
    CreateProjectRequest,
    DashboardResponse,
    ProjectResponse,
} from "../types";

const PROJECT_BASE_URL =
  import.meta.env.VITE_PROJECT_API_URL || "http://localhost:8082/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createProject = async (
  data: CreateProjectRequest
): Promise<ProjectResponse> => {
  const response = await axios.post<ProjectResponse>(
    `${PROJECT_BASE_URL}/projects`,
    data,
    getAuthHeaders()
  );

  return response.data;
};

export const getMyProjects = async (): Promise<ProjectResponse[]> => {
  const response = await axios.get<ProjectResponse[]>(
    `${PROJECT_BASE_URL}/projects`,
    getAuthHeaders()
  );

  return response.data;
};

export const addMember = async (
  projectId: number,
  data: AddMemberRequest
): Promise<string> => {
  const response = await axios.post<string>(
    `${PROJECT_BASE_URL}/projects/${projectId}/members`,
    data,
    getAuthHeaders()
  );

  return response.data;
};

export const getProjectDashboard = async (
  projectId: number
): Promise<DashboardResponse> => {
  const response = await axios.get<DashboardResponse>(
    `${PROJECT_BASE_URL}/projects/${projectId}/dashboard`,
    getAuthHeaders()
  );

  return response.data;
};