export enum UserRole {
  EXPORTER = "EXPORTER",
  CLIENT = "CLIENT",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  country: string;
  createdAt: string;
}

export interface ExporterProfile extends User {
  role: UserRole.EXPORTER;
  company: string;
  rfc: string;
  description: string;
  categories: string[];
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalOrders: number;
  verified: boolean;
  bannerImage?: string;
  location: string;
}

export interface ClientProfile extends User {
  role: UserRole.CLIENT;
  company: string;
  shippingAddresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  exporterId: string;
  exporterName: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  subcategory: string;
  price: number;
  currency: "USD" | "MXN";
  minOrder: number;
  unit: string;
  stock: number;
  origin: string;
  certifications: string[];
  tags: string[];
  rating: number;
  totalReviews: number;
  createdAt: string;
  featured: boolean;
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  exporterId: string;
  exporterName: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: "USD";
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: "USD";
  status: PaymentStatus;
  method: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AnalyticsOverview {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageRating: number;
  revenueChange: number;
  ordersChange: number;
  viewsTotal: number;
  viewsChange: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "order" | "payment" | "review" | "system" | "shipping";
  read: boolean;
  createdAt: string;
}

export interface LogisticsShipment {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: "picked_up" | "in_transit" | "customs" | "delivered";
  estimatedDelivery: string;
  events: ShipmentEvent[];
}

export interface ShipmentEvent {
  date: string;
  location: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
