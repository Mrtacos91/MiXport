import { apiClient } from "./api-client";
import type { Review, PaginatedResponse, ApiResponse } from "@/types";

const BASE_PATH = "/api/reputation";

export const reputationService = {
  getExporterReviews: (
    exporterId: string,
    params?: { page?: number; limit?: number },
  ) =>
    apiClient.get<ApiResponse<PaginatedResponse<Review>>>(
      `${BASE_PATH}/exporters/${exporterId}/reviews`,
      { params: params as Record<string, string | number> },
    ),

  getExporterRating: (exporterId: string) =>
    apiClient.get<ApiResponse<{ rating: number; totalReviews: number }>>(
      `${BASE_PATH}/exporters/${exporterId}/rating`,
    ),

  createReview: (data: {
    productId: string;
    rating: number;
    comment: string;
  }) => apiClient.post<ApiResponse<Review>>(`${BASE_PATH}/reviews`, data),

  getProductReviews: (
    productId: string,
    params?: { page?: number; limit?: number },
  ) =>
    apiClient.get<ApiResponse<PaginatedResponse<Review>>>(
      `${BASE_PATH}/products/${productId}/reviews`,
      { params: params as Record<string, string | number> },
    ),
};
