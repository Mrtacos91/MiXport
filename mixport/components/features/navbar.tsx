"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Bell, Menu, X, ChevronDown, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS } from "@/lib/dummy-data";
import type { User } from "@/types";

interface NavbarProps {
  user?: User | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="font-display text-sm font-bold text-text-inverse">
                M
              </span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-text-primary">
              MiXport
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/catalog"
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
            >
              Marketplace
            </Link>
            <Link
              href="/catalog?category=alimentos-bebidas"
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
            >
              Categorias
            </Link>
            <Link
              href="/catalog?featured=true"
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
            >
              Destacados
            </Link>
          </nav>
        </div>

        <div className="hidden flex-1 max-w-md mx-8 lg:block">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="text"
              placeholder="Buscar productos, exportadores..."
              className="h-9 w-full rounded-lg border border-border bg-bg-elevated pl-9 pr-3 text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-ring focus:bg-bg-surface focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <>
              <Link
                href={user.role === "EXPORTER" ? "/exporter" : "/client"}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-secondary transition-all hover:bg-bg-elevated hover:text-text-primary"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-warm text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-bg-elevated"
                >
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <span className="hidden text-sm font-medium text-text-primary md:block">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className="hidden text-text-tertiary md:block"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-bg-surface p-1.5 shadow-lg shadow-shadow-strong animate-scale-in">
                    <div className="border-b border-border px-3 py-2.5 mb-1.5">
                      <p className="text-sm font-medium text-text-primary">
                        {user.name}
                      </p>
                      <p className="text-xs text-text-tertiary">{user.email}</p>
                    </div>
                    <Link
                      href={user.role === "EXPORTER" ? "/exporter" : "/client"}
                      className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={
                        user.role === "EXPORTER"
                          ? "/exporter/settings"
                          : "/client/settings"
                      }
                      className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                    >
                      Configuracion
                    </Link>
                    <div className="border-t border-border mt-1.5 pt-1.5">
                      <button className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-error hover:bg-error-light">
                        Cerrar sesion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Iniciar sesion</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Registrarse
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-secondary lg:hidden"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-bg-surface p-4 lg:hidden animate-fade-in">
          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="h-10 w-full rounded-lg border border-border bg-bg-elevated pl-9 pr-3 text-sm placeholder:text-text-tertiary focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/catalog"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-elevated"
            >
              Marketplace
            </Link>
            <Link
              href="/catalog?category=alimentos-bebidas"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-elevated"
            >
              Categorias
            </Link>
            <Link
              href="/catalog?featured=true"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-elevated"
            >
              Destacados
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
