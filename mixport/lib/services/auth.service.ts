import { apiClient } from "./api-client";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  ApiResponse,
} from "@/types";

const BASE_PATH = "/api/auth";

export const authService = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>(`${BASE_PATH}/login`, data),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>(`${BASE_PATH}/register`, data),

  logout: () => apiClient.post<ApiResponse<null>>(`${BASE_PATH}/logout`),

  me: () => apiClient.get<ApiResponse<User>>(`${BASE_PATH}/me`),

  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<AuthResponse>>(`${BASE_PATH}/refresh`, {
      refreshToken,
    }),
};
