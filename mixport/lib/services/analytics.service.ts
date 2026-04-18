import { apiClient } from "./api-client";
import type {
  AnalyticsOverview,
  RevenueDataPoint,
  TopProduct,
  ApiResponse,
} from "@/types";

const BASE_PATH = "/api/analytics";

export const analyticsService = {
  getOverview: (period?: "7d" | "30d" | "90d" | "1y") =>
    apiClient.get<ApiResponse<AnalyticsOverview>>(`${BASE_PATH}/overview`, {
      params: period ? { period } : undefined,
    }),

  getRevenueTrend: (period?: "7d" | "30d" | "90d" | "1y") =>
    apiClient.get<ApiResponse<RevenueDataPoint[]>>(`${BASE_PATH}/revenue`, {
      params: period ? { period } : undefined,
    }),

  getTopProducts: (limit?: number) =>
    apiClient.get<ApiResponse<TopProduct[]>>(`${BASE_PATH}/top-products`, {
      params: limit ? { limit } : undefined,
    }),

  getOrdersByStatus: () =>
    apiClient.get<ApiResponse<Record<string, number>>>(
      `${BASE_PATH}/orders-by-status`,
    ),
};
