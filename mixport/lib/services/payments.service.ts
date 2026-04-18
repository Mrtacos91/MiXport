import { apiClient } from "./api-client";
import type { Payment, PaginatedResponse, ApiResponse } from "@/types";

const BASE_PATH = "/api/payments";

export const paymentsService = {
  getPayments: (params?: { page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Payment>>>(`${BASE_PATH}`, {
      params: params as Record<string, string | number>,
    }),

  getPaymentById: (id: string) =>
    apiClient.get<ApiResponse<Payment>>(`${BASE_PATH}/${id}`),

  getPaymentByOrderId: (orderId: string) =>
    apiClient.get<ApiResponse<Payment>>(`${BASE_PATH}/order/${orderId}`),

  createPaymentIntent: (orderId: string) =>
    apiClient.post<ApiResponse<{ clientSecret: string }>>(
      `${BASE_PATH}/intent`,
      { orderId },
    ),

  confirmPayment: (paymentId: string) =>
    apiClient.post<ApiResponse<Payment>>(`${BASE_PATH}/${paymentId}/confirm`),
};
