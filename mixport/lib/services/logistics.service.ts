import { apiClient } from "./api-client";
import type { LogisticsShipment, ApiResponse } from "@/types";

const BASE_PATH = "/api/logistics";

export const logisticsService = {
  getShipment: (orderId: string) =>
    apiClient.get<ApiResponse<LogisticsShipment>>(
      `${BASE_PATH}/orders/${orderId}/shipment`,
    ),

  getShipments: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient.get<ApiResponse<LogisticsShipment[]>>(`${BASE_PATH}/shipments`, {
      params: params as Record<string, string | number>,
    }),

  trackShipment: (trackingNumber: string) =>
    apiClient.get<ApiResponse<LogisticsShipment>>(
      `${BASE_PATH}/track/${trackingNumber}`,
    ),
};
