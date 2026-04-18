import { apiClient } from "./api-client";
import type { Notification, PaginatedResponse, ApiResponse } from "@/types";

const BASE_PATH = "/api/notifications";

export const notificationsService = {
  getNotifications: (params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Notification>>>(
      `${BASE_PATH}`,
      { params: params as Record<string, string | number> },
    ),

  markAsRead: (id: string) =>
    apiClient.patch<ApiResponse<Notification>>(`${BASE_PATH}/${id}/read`),

  markAllAsRead: () =>
    apiClient.patch<ApiResponse<null>>(`${BASE_PATH}/read-all`),

  getUnreadCount: () =>
    apiClient.get<ApiResponse<{ count: number }>>(`${BASE_PATH}/unread-count`),
};
