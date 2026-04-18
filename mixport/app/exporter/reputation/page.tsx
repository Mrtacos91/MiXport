import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { REVIEWS, EXPORTER_PROFILE } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils/format";

export default function ExporterReputationPage() {
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: REVIEWS.filter((r) => r.rating === stars).length,
  }));
  const totalReviews = REVIEWS.length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Reputacion
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Tu calificacion y resenas de clientes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="flex flex-col items-center justify-center text-center">
          <p className="font-display text-5xl font-bold text-text-primary">
            {EXPORTER_PROFILE.rating}
          </p>
          <div className="mt-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(EXPORTER_PROFILE.rating)
                    ? "fill-accent-warm text-accent-warm"
                    : "text-bg-muted"
                }
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-text-secondary">
            {EXPORTER_PROFILE.totalReviews} resenas totales
          </p>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">
            Distribucion
          </h3>
          <div className="flex flex-col gap-3">
            {ratingDistribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm text-text-secondary">{stars}</span>
                  <Star
                    size={12}
                    className="fill-accent-warm text-accent-warm"
                  />
                </div>
                <div className="flex-1 h-2.5 rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent-warm transition-all"
                    style={{
                      width:
                        totalReviews > 0
                          ? `${(count / totalReviews) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
                <span className="text-sm text-text-tertiary w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <h2 className="font-display text-lg font-semibold text-text-primary mb-4">
        Resenas recientes
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {REVIEWS.map((review) => (
          <Card key={review.id}>
            <div className="flex items-start gap-3">
              <Avatar
                src={review.clientAvatar}
                alt={review.clientName}
                size="sm"
              />
              <div className="flex-1 min-w-0">
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
    </div>
  );
}
