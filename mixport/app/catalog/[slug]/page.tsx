import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Package,
  Truck,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PRODUCTS, REVIEWS } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Link
        href="/catalog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al catalogo
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-bg-elevated">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="h-20 w-20 overflow-hidden rounded-lg border border-border bg-bg-elevated"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-text-tertiary">
            <MapPin size={14} />
            {product.origin}
          </div>

          <h1 className="font-display text-3xl font-bold text-text-primary leading-tight">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            {product.exporterName}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-accent-warm text-accent-warm" />
              <span className="text-sm font-medium text-text-primary">
                {product.rating}
              </span>
              <span className="text-sm text-text-tertiary">
                ({product.totalReviews} resenas)
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-text-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-text-secondary">
              / {product.unit}
            </span>
          </div>

          <div className="mt-2 text-sm text-text-secondary">
            Orden minima: {product.minOrder} {product.unit}
          </div>

          <div className="mt-6 rounded-xl border border-accent bg-accent-light p-4 text-center">
            <p className="text-sm font-medium text-accent">
              Inicia sesion para realizar pedidos
            </p>
            <div className="mt-3 flex gap-2">
              <Link href="/login" className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  Iniciar sesion
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-text-primary">
                Descripcion
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {product.description}
              </p>
            </div>

            {product.certifications.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-text-primary">
                  Certificaciones
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="accent">
                      <ShieldCheck size={12} className="mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 text-text-tertiary mb-1">
                  <Package size={14} />
                  <span className="text-xs">Stock disponible</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  {product.stock.toLocaleString()} {product.unit}
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 text-text-tertiary mb-1">
                  <Truck size={14} />
                  <span className="text-xs">Origen</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  {product.origin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {productReviews.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold text-text-primary mb-6">
            Resenas ({productReviews.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {productReviews.map((review) => (
              <Card key={review.id}>
                <div className="flex items-start gap-3">
                  <Avatar
                    src={review.clientAvatar}
                    alt={review.clientName}
                    size="sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary">
                        {review.clientName}
                      </p>
                      <span className="text-xs text-text-tertiary">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "fill-accent-warm text-accent-warm"
                              : "text-bg-muted"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold text-text-primary mb-6">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/catalog/${p.slug}`}
                className="group block"
              >
                <Card hover padding="none">
                  <div className="aspect-video overflow-hidden rounded-t-xl bg-bg-elevated">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-lg font-bold text-text-primary">
                      {formatCurrency(p.price)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
