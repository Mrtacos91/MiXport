import Link from "next/link";
import { ShoppingCart, Package, Heart, ArrowRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ORDERS, PRODUCTS, CLIENT_PROFILE } from "@/lib/dummy-data";
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

export default function ClientDashboard() {
  const clientOrders = ORDERS.filter((o) => o.clientId === "cli-001");
  const activeOrders = clientOrders.filter(
    (o) => !["DELIVERED", "CANCELLED"].includes(o.status),
  );
  const suggestedProducts = PRODUCTS.slice(0, 4);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Hola, {CLIENT_PROFILE.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Resumen de tu cuenta de comprador
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-light text-accent">
            <ShoppingCart size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary font-display">
              {clientOrders.length}
            </p>
            <p className="text-xs text-text-secondary">Ordenes totales</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-warm-light text-accent-warm">
            <Package size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary font-display">
              {activeOrders.length}
            </p>
            <p className="text-xs text-text-secondary">Ordenes activas</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-error-light text-error">
            <Heart size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary font-display">
              12
            </p>
            <p className="text-xs text-text-secondary">Favoritos</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="none">
            <div className="flex items-center justify-between p-6 pb-0">
              <h2 className="font-display text-base font-semibold text-text-primary">
                Ordenes activas
              </h2>
              <Link
                href="/client/orders"
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Ver todas
              </Link>
            </div>

            {activeOrders.length > 0 ? (
              <div className="mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-6 py-3 text-xs font-medium text-text-tertiary">
                        Orden
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-tertiary hidden sm:table-cell">
                        Exportador
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-tertiary">
                        Total
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-text-tertiary">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrders.map((order) => {
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
                            {order.exporterName}
                          </td>
                          <td className="px-6 py-3.5 text-sm font-medium text-text-primary">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-3.5">
                            <Badge variant={status.variant}>
                              {status.label}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <p className="text-sm text-text-secondary">
                  No tienes ordenes activas
                </p>
                <Link href="/catalog" className="mt-3">
                  <Button size="sm">Explorar marketplace</Button>
                </Link>
              </div>
            )}
          </Card>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-text-primary">
                Productos sugeridos
              </h2>
              <Link
                href="/catalog"
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
              >
                Ver marketplace <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {suggestedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalog/${product.slug}`}
                  className="group block"
                >
                  <Card hover padding="none">
                    <div className="aspect-square overflow-hidden rounded-t-xl bg-bg-elevated">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-text-tertiary flex items-center gap-1">
                        <MapPin size={10} />
                        {product.origin}
                      </p>
                      <h3 className="mt-0.5 text-sm font-medium text-text-primary line-clamp-1 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-text-primary">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 font-display text-base font-semibold text-text-primary">
              Direcciones de envio
            </h2>
            <div className="flex flex-col gap-3">
              {CLIENT_PROFILE.shippingAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <Badge variant="accent">Principal</Badge>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {addr.street}
                    <br />
                    {addr.city}, {addr.state} {addr.zip}
                  </p>
                </div>
              ))}
              <button className="rounded-lg border border-dashed border-border-strong p-3 text-sm text-text-secondary hover:bg-bg-elevated transition-colors">
                + Agregar direccion
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 font-display text-base font-semibold text-text-primary">
              Gasto reciente
            </h2>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-text-primary">
                {formatCurrency(
                  clientOrders.reduce((sum, o) => sum + o.total, 0),
                )}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Total en ordenes
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
