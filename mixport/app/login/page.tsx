"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-accent lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <span className="font-display text-sm font-bold text-white">M</span>
          </div>
          <span className="font-display text-xl font-bold text-white">
            MiXport
          </span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Comercio B2B
            <br />
            sin fronteras.
          </h1>
          <p className="mt-4 max-w-md text-base text-white/70">
            Conectamos a los mejores exportadores de Mexico con compradores en
            Estados Unidos.
          </p>
        </div>

        <p className="text-sm text-white/50">
          &copy; {new Date().getFullYear()} MiXport
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="font-display text-sm font-bold text-text-inverse">
                M
              </span>
            </div>
            <span className="font-display text-xl font-bold text-text-primary">
              MiXport
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold text-text-primary">
            Iniciar sesion
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="tu@empresa.com"
              icon={<Mail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contrasena"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary">
                <input type="checkbox" className="rounded border-border" />
                Recordarme
              </label>
              <Link
                href="#"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                Olvidaste tu contrasena?
              </Link>
            </div>

            <Button type="submit" size="lg" className="mt-2 w-full">
              Iniciar sesion
              <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
