"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORDERS } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils/format";

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

export default function ClientOrdersPage() {
  const [search, setSearch] = useState("");
  const clientOrders = ORDERS.filter((o) => o.clientId === "cli-001");
  const filtered = clientOrders.filter(
    (o) =>
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.exporterName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Mis ordenes
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Historial de tus ordenes ({clientOrders.length} ordenes)
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Buscar orden..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-bg-surface pl-9 pr-3 text-sm placeholder:text-text-tertiary focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((order) => {
          const status = STATUS_MAP[order.status] || STATUS_MAP.PENDING;
          return (
            <Card key={order.id} hover>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-text-primary">
                      {order.orderNumber}
                    </span>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {order.exporterName}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-text-primary">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {order.items.length} producto
                    {order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="text-xs text-text-secondary"
                    >
                      <span className="font-medium text-text-primary">
                        {item.productName}
                      </span>{" "}
                      x{item.quantity} &mdash; {formatCurrency(item.totalPrice)}
                    </div>
                  ))}
                </div>
                {order.trackingNumber && (
                  <p className="mt-2 text-xs text-text-tertiary">
                    Tracking:{" "}
                    <span className="font-medium text-text-secondary">
                      {order.trackingNumber}
                    </span>
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
