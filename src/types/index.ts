export type ProjectRole = "ADMIN" | "MEMBER";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  name?: string;
  email: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  createdByUserId: number;
  createdAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface AddMemberRequest {
  userId: number;
  role: ProjectRole;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  assignedToUserId: number;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  projectId: number;
  assignedToUserId: number;
  createdByUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface UserTaskCountResponse {
  userId: number;
  taskCount: number;
}

export interface DashboardResponse {
  projectId: number;
  totalTasks: number;
  tasksByStatus: Partial<Record<TaskStatus, number>>;
  tasksPerUser: UserTaskCountResponse[];
  overdueTasks: number;
}