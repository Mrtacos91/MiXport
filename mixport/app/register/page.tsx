"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RoleTab = "CLIENT" | "EXPORTER";

export default function RegisterPage() {
  const [role, setRole] = useState<RoleTab>("CLIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-accent-warm lg:flex lg:flex-col lg:justify-between lg:p-12">
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
            Unete a la red
            <br />
            de comercio B2B.
          </h1>
          <p className="mt-4 max-w-md text-base text-white/70">
            Ya sea que busques productos mexicanos o quieras exportar los tuyos,
            MiXport es tu plataforma.
          </p>
        </div>

        <p className="text-sm text-white/50">
          &copy; {new Date().getFullYear()} MiXport
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-warm">
              <span className="font-display text-sm font-bold text-white">
                M
              </span>
            </div>
            <span className="font-display text-xl font-bold text-text-primary">
              MiXport
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold text-text-primary">
            Crear cuenta
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Selecciona tu perfil y completa el registro
          </p>

          <div className="mt-6 flex rounded-lg border border-border bg-bg-elevated p-1">
            <button
              onClick={() => setRole("CLIENT")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                role === "CLIENT"
                  ? "bg-bg-surface text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Comprador
            </button>
            <button
              onClick={() => setRole("EXPORTER")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                role === "EXPORTER"
                  ? "bg-bg-surface text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Exportador
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre"
              icon={<User size={16} />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email corporativo"
              type="email"
              placeholder="tu@empresa.com"
              icon={<Mail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Empresa"
              type="text"
              placeholder={
                role === "EXPORTER" ? "Tu empresa exportadora" : "Tu empresa"
              }
              icon={<Building2 size={16} />}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <Input
              label="Contrasena"
              type="password"
              placeholder="Min. 8 caracteres"
              icon={<Lock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />

            <Button type="submit" size="lg" className="mt-2 w-full">
              {role === "EXPORTER"
                ? "Registrarme como exportador"
                : "Registrarme como comprador"}
              <ArrowRight size={16} />
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-text-tertiary">
            Al registrarte aceptas los{" "}
            <Link href="#" className="text-accent hover:underline">
              terminos de uso
            </Link>{" "}
            y la{" "}
            <Link href="#" className="text-accent hover:underline">
              politica de privacidad
            </Link>
            .
          </p>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Inicia sesion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
