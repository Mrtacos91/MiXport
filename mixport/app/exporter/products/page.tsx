"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils/format";

export default function ExporterProductsPage() {
  const [search, setSearch] = useState("");
  const exporterProducts = PRODUCTS.filter((p) => p.exporterId === "exp-001");

  const filtered = exporterProducts.filter(
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Productos
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Gestiona tu catalogo de productos ({exporterProducts.length}{" "}
            productos)
          </p>
        </div>
        <Button>
          <Plus size={16} />
          Nuevo producto
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-bg-surface pl-9 pr-3 text-sm placeholder:text-text-tertiary focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <Card padding="none">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary">
                Producto
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary hidden md:table-cell">
                Categoria
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary">
                Precio
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary hidden sm:table-cell">
                Stock
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary hidden lg:table-cell">
                Rating
              </th>
              <th className="px-6 py-3.5 text-xs font-medium text-text-tertiary w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-border bg-bg-elevated shrink-0">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-text-tertiary">
                        {product.origin}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <Badge>{product.category}</Badge>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-text-primary">
                  {formatCurrency(product.price)}/{product.unit}
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span
                    className={`text-sm ${product.stock < 100 ? "text-error font-medium" : "text-text-secondary"}`}
                  >
                    {product.stock.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-text-secondary">
                    {product.rating}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-bg-elevated hover:text-text-primary transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-error-light hover:text-error transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
