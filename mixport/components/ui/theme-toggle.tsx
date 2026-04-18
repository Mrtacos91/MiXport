"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-secondary transition-all hover:bg-bg-elevated hover:text-text-primary"
      aria-label={
        theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
      }
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
