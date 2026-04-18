import { apiClient } from "./api-client";
import type { Order, PaginatedResponse, ApiResponse } from "@/types";

const BASE_PATH = "/api/orders";

export const ordersService = {
  getOrders: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Order>>>(`${BASE_PATH}`, {
      params: params as Record<string, string | number>,
    }),

  getOrderById: (id: string) =>
    apiClient.get<ApiResponse<Order>>(`${BASE_PATH}/${id}`),

  createOrder: (data: {
    items: { productId: string; quantity: number }[];
    shippingAddressId: string;
  }) => apiClient.post<ApiResponse<Order>>(`${BASE_PATH}`, data),

  updateOrderStatus: (id: string, status: string) =>
    apiClient.patch<ApiResponse<Order>>(`${BASE_PATH}/${id}/status`, {
      status,
    }),

  cancelOrder: (id: string) =>
    apiClient.post<ApiResponse<Order>>(`${BASE_PATH}/${id}/cancel`),

  getExporterOrders: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
      `${BASE_PATH}/exporter`,
      { params: params as Record<string, string | number> },
    ),

  getClientOrders: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
      `${BASE_PATH}/client`,
      { params: params as Record<string, string | number> },
    ),
};
