import { cn } from "@/lib/utils/format";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-surface p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-text-primary font-display">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
          <Icon size={20} />
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-medium",
              change >= 0 ? "text-success" : "text-error",
            )}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-text-tertiary">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}
