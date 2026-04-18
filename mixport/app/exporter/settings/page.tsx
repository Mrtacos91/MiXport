"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { EXPORTER_PROFILE } from "@/lib/dummy-data";

export default function ExporterSettingsPage() {
  const [name, setName] = useState(EXPORTER_PROFILE.name);
  const [email, setEmail] = useState(EXPORTER_PROFILE.email);
  const [company, setCompany] = useState(EXPORTER_PROFILE.company);
  const [phone, setPhone] = useState(EXPORTER_PROFILE.phone || "");
  const [description, setDescription] = useState(EXPORTER_PROFILE.description);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Configuracion
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Administra tu perfil de exportador
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <h2 className="mb-6 text-base font-semibold text-text-primary">
            Perfil
          </h2>
          <div className="mb-6 flex items-center gap-4">
            <Avatar
              src={EXPORTER_PROFILE.avatar}
              alt={EXPORTER_PROFILE.name}
              size="lg"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">
                {EXPORTER_PROFILE.name}
              </p>
              <button className="mt-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors">
                Cambiar foto
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              label="Telefono"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Descripcion
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              <Save size={16} />
              Guardar cambios
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-text-primary">
            Verificacion
          </h2>
          <div className="flex items-center gap-3 rounded-lg bg-success-light p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Cuenta verificada
              </p>
              <p className="text-xs text-text-secondary">
                RFC: {EXPORTER_PROFILE.rfc}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-error">
            Zona de peligro
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            Estas acciones son permanentes y no se pueden deshacer.
          </p>
          <Button variant="danger" size="sm">
            Desactivar cuenta
          </Button>
        </Card>
      </div>
    </div>
  );
}
