"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const STATUS_FILTERS = [
  "Todos",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

export default function ExporterOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const exporterOrders = ORDERS.filter((o) => o.exporterId === "exp-001");
  const filtered = exporterOrders.filter((o) => {
    const matchesStatus = statusFilter === "Todos" || o.status === statusFilter;
    const matchesSearch =
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.clientName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Ordenes
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Gestiona tus ordenes de exportacion ({exporterOrders.length} ordenes)
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Buscar por numero o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-bg-surface pl-9 pr-3 text-sm placeholder:text-text-tertiary focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === status
                ? "bg-accent text-text-inverse"
                : "border border-border text-text-secondary hover:border-border-strong"
            }`}
          >
            {status === "Todos" ? "Todos" : STATUS_MAP[status]?.label || status}
          </button>
        ))}
      </div>

      <Card padding="none">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary">
                Orden
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary hidden sm:table-cell">
                Cliente
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary">
                Productos
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary">
                Total
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary">
                Estado
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary hidden md:table-cell">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const status = STATUS_MAP[order.status] || STATUS_MAP.PENDING;
              return (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div>
                      <p className="text-sm text-text-primary">
                        {order.clientName}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {order.items.length} producto
                    {order.items.length > 1 ? "s" : ""}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-tertiary hidden md:table-cell">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-text-secondary">
              No se encontraron ordenes
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
