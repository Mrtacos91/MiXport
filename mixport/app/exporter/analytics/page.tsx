import { DollarSign, ShoppingCart, Eye, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/features/stats-card";
import { Card } from "@/components/ui/card";
import {
  ANALYTICS_OVERVIEW,
  REVENUE_TREND,
  TOP_PRODUCTS,
} from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils/format";

export default function ExporterAnalyticsPage() {
  const maxRevenue = Math.max(...REVENUE_TREND.map((d) => d.revenue));

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Analiticas
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Metricas de rendimiento de tu cuenta
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
          title="Vistas del perfil"
          value={ANALYTICS_OVERVIEW.viewsTotal.toLocaleString()}
          change={ANALYTICS_OVERVIEW.viewsChange}
          icon={Eye}
        />
        <StatsCard
          title="Tasa de conversion"
          value="3.2%"
          change={0.5}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-6 font-display text-base font-semibold text-text-primary">
            Ingresos mensuales
          </h2>
          <div className="flex items-end gap-3 h-56">
            {REVENUE_TREND.map((point) => (
              <div
                key={point.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-lg bg-accent/15 relative group cursor-pointer hover:bg-accent/25 transition-colors"
                  style={{
                    height: `${(point.revenue / maxRevenue) * 100}%`,
                    minHeight: "12px",
                  }}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-lg bg-accent"
                    style={{
                      height: `${(point.revenue / maxRevenue) * 75}%`,
                      minHeight: "6px",
                    }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-text-primary bg-bg-surface border border-border rounded px-2 py-1 whitespace-nowrap shadow-sm z-10">
                    {formatCurrency(point.revenue)}
                  </div>
                </div>
                <span className="text-xs text-text-tertiary">
                  {point.month}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-6 font-display text-base font-semibold text-text-primary">
            Productos mas vendidos
          </h2>
          <div className="flex flex-col gap-4">
            {TOP_PRODUCTS.map((product, i) => {
              const maxSold = TOP_PRODUCTS[0].totalSold;
              return (
                <div key={product.productId}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text-tertiary w-5">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        {product.productName}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      {formatCurrency(product.revenue)}
                    </span>
                  </div>
                  <div className="ml-7 h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{
                        width: `${(product.totalSold / maxSold) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="ml-7 mt-1 text-xs text-text-tertiary">
                    {product.totalSold} unidades vendidas
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
