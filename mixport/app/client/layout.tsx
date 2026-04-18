"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Heart,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { CLIENT_PROFILE } from "@/lib/dummy-data";
import { cn } from "@/lib/utils/format";

const NAV_ITEMS = [
  { href: "/client", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/orders", label: "Mis ordenes", icon: ShoppingCart },
  { href: "/client/favorites", label: "Favoritos", icon: Heart },
  { href: "/client/settings", label: "Configuracion", icon: Settings },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden w-64 flex-col border-r border-border bg-bg-surface lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="font-display text-sm font-bold text-text-inverse">
              M
            </span>
          </div>
          <span className="font-display text-lg font-bold text-text-primary">
            MiXport
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="mb-2 px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
              Comprador
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-accent-light text-accent"
                      : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 mb-2 px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
              Explorar
            </span>
          </div>
          <Link
            href="/catalog"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-all"
          >
            <ShoppingCart size={18} />
            Marketplace
          </Link>
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar
              src={CLIENT_PROFILE.avatar}
              alt={CLIENT_PROFILE.name}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">
                {CLIENT_PROFILE.name}
              </p>
              <p className="truncate text-xs text-text-tertiary">
                {CLIENT_PROFILE.company}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-bg-surface px-4 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
                <span className="font-display text-xs font-bold text-text-inverse">
                  M
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
              <Link
                href="/client"
                className="hover:text-text-secondary transition-colors"
              >
                Dashboard
              </Link>
              {pathname !== "/client" && (
                <>
                  <ChevronRight size={12} />
                  <span className="text-text-primary font-medium">
                    {NAV_ITEMS.find((i) => i.href === pathname)?.label || ""}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-secondary hover:bg-bg-elevated transition-colors">
              <Bell size={16} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-bg-primary p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
