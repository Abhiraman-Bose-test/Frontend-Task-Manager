import axios from "axios";
import type { AuthResponse, LoginRequest, SignupRequest } from "../types";

const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:8081/api/auth";

export const signup = async (data: SignupRequest) => {
  const response = await axios.post(`${AUTH_BASE_URL}/signup`, data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_BASE_URL}/login`, data);
  return response.data;
};