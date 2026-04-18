import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils/format";

export default function ClientFavoritesPage() {
  const favoriteProducts = PRODUCTS.slice(0, 6);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Favoritos
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Productos guardados ({favoriteProducts.length})
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteProducts.map((product) => (
          <Card key={product.id} hover padding="none">
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-t-xl bg-bg-elevated">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg-surface/90 text-error backdrop-blur-sm hover:bg-bg-surface transition-colors">
                <Heart size={14} className="fill-current" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs text-text-tertiary mb-1">
                <MapPin size={10} />
                {product.origin}
              </div>
              <Link href={`/catalog/${product.slug}`}>
                <h3 className="text-sm font-semibold text-text-primary hover:text-accent transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-text-secondary mt-0.5">
                {product.exporterName}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-base font-bold text-text-primary">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex items-center gap-1">
                  <Star
                    size={12}
                    className="fill-accent-warm text-accent-warm"
                  />
                  <span className="text-xs font-medium text-text-primary">
                    {product.rating}
                  </span>
                </div>
              </div>
              <Link href={`/catalog/${product.slug}`} className="block mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  Ver producto
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
