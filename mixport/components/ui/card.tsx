import { cn } from "@/lib/utils/format";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-surface",
        paddingStyles[padding],
        hover &&
          "transition-all duration-200 hover:border-border-strong hover:shadow-md hover:shadow-shadow",
        className,
      )}
    >
      {children}
    </div>
  );
}
