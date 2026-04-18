import Link from "next/link";
import { Star, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showAuthPrompt?: boolean;
}

export function ProductCard({
  product,
  showAuthPrompt = false,
}: ProductCardProps) {
  return (
    <Link href={`/catalog/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-lg hover:shadow-shadow">
        <div className="relative aspect-square overflow-hidden bg-bg-elevated">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.featured && (
            <div className="absolute left-3 top-3">
              <Badge variant="warm">Destacado</Badge>
            </div>
          )}
          {product.certifications.length > 0 && (
            <div className="absolute right-3 top-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-surface/90 text-accent backdrop-blur-sm">
                <ShieldCheck size={14} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-text-tertiary">
            <MapPin size={12} />
            <span>{product.origin}</span>
          </div>

          <h3 className="mb-1 text-sm font-semibold text-text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          <p className="mb-3 text-xs text-text-secondary line-clamp-1">
            {product.exporterName}
          </p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-bold text-text-primary">
                {formatCurrency(product.price)}
              </p>
              <p className="text-xs text-text-tertiary">
                Min. {product.minOrder} {product.unit}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Star size={12} className="fill-accent-warm text-accent-warm" />
              <span className="text-xs font-medium text-text-primary">
                {product.rating}
              </span>
              <span className="text-xs text-text-tertiary">
                ({product.totalReviews})
              </span>
            </div>
          </div>

          {showAuthPrompt && (
            <div className="mt-3 rounded-lg bg-accent-light px-3 py-2 text-center text-xs font-medium text-accent">
              Inicia sesion para comprar
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
