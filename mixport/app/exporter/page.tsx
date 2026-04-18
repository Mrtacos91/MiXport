import {
  DollarSign,
  ShoppingCart,
  Package,
  Star,
  Eye,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/features/stats-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ANALYTICS_OVERVIEW,
  ORDERS,
  REVENUE_TREND,
  TOP_PRODUCTS,
  NOTIFICATIONS,
} from "@/lib/dummy-data";
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
} from "@/lib/utils/format";
import type { OrderStatus } from "@/types";

const STATUS_MAP: Record<
  string,
  {
    label: string;
    variant: "success" | "warning" | "accent" | "error" | "default";
  }
> = {
  PENDING: { label: "Pendiente", variant: "warning" },
  CONFIRMED: { label: "Confirmado", variant: "accent" },
  PROCESSING: { label: "Procesando", variant: "accent" },
  SHIPPED: { label: "Enviado", variant: "success" },
  IN_TRANSIT: { label: "En transito", variant: "success" },
  DELIVERED: { label: "Entregado", variant: "success" },
  CANCELLED: { label: "Cancelado", variant: "error" },
};

export default function ExporterDashboard() {
  const recentOrders = ORDERS.filter((o) => o.exporterId === "exp-001").slice(
    0,
    5,
  );
  const recentNotifications = NOTIFICATIONS.slice(0, 4);
  const maxRevenue = Math.max(...REVENUE_TREND.map((d) => d.revenue));

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Resumen de actividad de tu cuenta de exportador
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatsCard
          title="Ingresos totales"
          value={formatCurrency(ANALYTICS_OVERVIEW.totalRevenue)}
          change={ANALYTICS_OVERVIEW.revenueChange}
          icon={DollarSign}
        />
        <StatsCard
          title="Total ordenes"
          value={ANALYTICS_OVERVIEW.totalOrders.toString()}
          change={ANALYTICS_OVERVIEW.ordersChange}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Productos activos"
          value={ANALYTICS_OVERVIEW.totalProducts.toString()}
          icon={Package}
        />
        <StatsCard
          title="Vistas del perfil"
          value={ANALYTICS_OVERVIEW.viewsTotal.toLocaleString()}
          change={ANALYTICS_OVERVIEW.viewsChange}
          icon={Eye}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-text-primary">
                Ingresos mensuales
              </h2>
              <Link
                href="/exporter/analytics"
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Ver detalle
              </Link>
            </div>
            <div className="flex items-end gap-2 h-44">
              {REVENUE_TREND.map((point) => (
                <div
                  key={point.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-md bg-accent/20 transition-all hover:bg-accent/40 relative group"
                    style={{
                      height: `${(point.revenue / maxRevenue) * 100}%`,
                      minHeight: "8px",
                    }}
                  >
                    <div
                      className="absolute inset-x-0 bottom-0 rounded-md bg-accent transition-all"
                      style={{
                        height: `${(point.revenue / maxRevenue) * 80}%`,
                        minHeight: "4px",
                      }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-text-primary bg-bg-surface border border-border rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm">
                      {formatCurrency(point.revenue)}
                    </div>
                  </div>
                  <span className="text-[10px] text-text-tertiary">
                    {point.month}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="none">
            <div className="flex items-center justify-between p-6 pb-0">
              <h2 className="font-display text-base font-semibold text-text-primary">
                Ordenes recientes
              </h2>
              <Link
                href="/exporter/orders"
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Ver todas
              </Link>
            </div>
            <div className="mt-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-6 py-3 text-xs font-medium text-text-tertiary">
                      Orden
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-text-tertiary hidden sm:table-cell">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-text-tertiary">
                      Total
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-text-tertiary">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-text-tertiary hidden md:table-cell">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const status =
                      STATUS_MAP[order.status] || STATUS_MAP.PENDING;
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors"
                      >
                        <td className="px-6 py-3.5 text-sm font-medium text-text-primary">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-3.5 text-sm text-text-secondary hidden sm:table-cell">
                          {order.clientName}
                        </td>
                        <td className="px-6 py-3.5 text-sm font-medium text-text-primary">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-6 py-3.5">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </td>
                        <td className="px-6 py-3.5 text-sm text-text-tertiary hidden md:table-cell">
                          {formatDate(order.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-text-primary">
                Top productos
              </h2>
              <Link
                href="/exporter/products"
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Ver todos
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {TOP_PRODUCTS.slice(0, 4).map((product, i) => (
                <div
                  key={product.productId}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bg-elevated text-xs font-bold text-text-secondary">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {product.productName}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {product.totalSold} vendidos
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    {formatCurrency(product.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-text-primary">
                Notificaciones
              </h2>
              <span className="text-xs text-text-tertiary">
                {NOTIFICATIONS.filter((n) => !n.read).length} sin leer
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {recentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 rounded-lg p-2.5 -mx-2.5 transition-colors ${!notif.read ? "bg-accent-light/50" : ""}`}
                >
                  <div
                    className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${!notif.read ? "bg-accent" : "bg-transparent"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {notif.title}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-text-tertiary mt-1">
                      {formatRelativeTime(notif.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-warm-light text-accent-warm">
                <Star size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary font-display">
                  {ANALYTICS_OVERVIEW.averageRating}
                </p>
                <p className="text-xs text-text-secondary">
                  Calificacion promedio
                </p>
              </div>
            </div>
            <Link
              href="/exporter/reputation"
              className="mt-3 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Ver resenas <ArrowRight size={12} />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
