"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { ProductCard } from "@/components/features/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, CATEGORIES } from "@/lib/dummy-data";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.exporterName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">
          Marketplace
        </h1>
        <p className="mt-2 text-text-secondary">
          Explora productos de exportacion mexicana
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Buscar productos o exportadores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-bg-surface pl-9 pr-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("grid")}
          >
            <Grid3X3 size={16} />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("list")}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            !selectedCategory
              ? "bg-accent text-text-inverse"
              : "border border-border bg-bg-surface text-text-secondary hover:border-border-strong"
          }`}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === cat.name ? null : cat.name,
              )
            }
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              selectedCategory === cat.name
                ? "bg-accent text-text-inverse"
                : "border border-border bg-bg-surface text-text-secondary hover:border-border-strong"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-text-secondary">Filtrando:</span>
          <Badge variant="accent">
            {selectedCategory}
            <button
              onClick={() => setSelectedCategory(null)}
              className="ml-1.5"
            >
              <X size={12} />
            </button>
          </Badge>
        </div>
      )}

      <div className="mb-4 text-sm text-text-tertiary">
        {filtered.length} productos encontrados
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} showAuthPrompt />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} showAuthPrompt />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-elevated">
            <Search size={24} className="text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Sin resultados
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Intenta con otros terminos de busqueda o cambia el filtro de
            categoria
          </p>
        </div>
      )}
    </div>
  );
}
