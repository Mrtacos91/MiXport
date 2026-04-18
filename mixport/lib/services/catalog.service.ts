import { apiClient } from "./api-client";
import type {
  Product,
  Category,
  PaginatedResponse,
  ApiResponse,
  Review,
} from "@/types";

const BASE_PATH = "/api/catalog";

export const catalogService = {
  getProducts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
  }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      `${BASE_PATH}/products`,
      { params: params as Record<string, string | number> },
    ),

  getProductById: (id: string) =>
    apiClient.get<ApiResponse<Product>>(`${BASE_PATH}/products/${id}`),

  getProductBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Product>>(`${BASE_PATH}/products/slug/${slug}`),

  getFeaturedProducts: () =>
    apiClient.get<ApiResponse<Product[]>>(`${BASE_PATH}/products/featured`),

  getCategories: () =>
    apiClient.get<ApiResponse<Category[]>>(`${BASE_PATH}/categories`),

  getProductReviews: (
    productId: string,
    params?: { page?: number; limit?: number },
  ) =>
    apiClient.get<ApiResponse<PaginatedResponse<Review>>>(
      `${BASE_PATH}/products/${productId}/reviews`,
      { params: params as Record<string, string | number> },
    ),

  createProduct: (data: Partial<Product>) =>
    apiClient.post<ApiResponse<Product>>(`${BASE_PATH}/products`, data),

  updateProduct: (id: string, data: Partial<Product>) =>
    apiClient.put<ApiResponse<Product>>(`${BASE_PATH}/products/${id}`, data),

  deleteProduct: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`${BASE_PATH}/products/${id}`),

  getExporterProducts: (
    exporterId: string,
    params?: { page?: number; limit?: number },
  ) =>
    apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      `${BASE_PATH}/exporters/${exporterId}/products`,
      { params: params as Record<string, string | number> },
    ),
};
