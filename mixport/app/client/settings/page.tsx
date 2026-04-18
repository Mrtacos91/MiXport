"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CLIENT_PROFILE } from "@/lib/dummy-data";

export default function ClientSettingsPage() {
  const [name, setName] = useState(CLIENT_PROFILE.name);
  const [email, setEmail] = useState(CLIENT_PROFILE.email);
  const [company, setCompany] = useState(CLIENT_PROFILE.company);
  const [phone, setPhone] = useState(CLIENT_PROFILE.phone || "");

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Configuracion
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Administra tu perfil de comprador
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <h2 className="mb-6 text-base font-semibold text-text-primary">
            Perfil
          </h2>
          <div className="mb-6 flex items-center gap-4">
            <Avatar
              src={CLIENT_PROFILE.avatar}
              alt={CLIENT_PROFILE.name}
              size="lg"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">
                {CLIENT_PROFILE.name}
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

          <div className="mt-6 flex justify-end">
            <Button>
              <Save size={16} />
              Guardar cambios
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-text-primary">
            Direcciones de envio
          </h2>
          <div className="flex flex-col gap-3">
            {CLIENT_PROFILE.shippingAddresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <Badge variant="accent">Principal</Badge>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {addr.street}
                    <br />
                    {addr.city}, {addr.state} {addr.zip}
                    <br />
                    {addr.country}
                  </p>
                </div>
                <button className="text-xs font-medium text-accent hover:text-accent-hover transition-colors">
                  Editar
                </button>
              </div>
            ))}
            <button className="rounded-lg border border-dashed border-border-strong p-4 text-sm text-text-secondary hover:bg-bg-elevated transition-colors">
              + Agregar nueva direccion
            </button>
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
            Eliminar cuenta
          </Button>
        </Card>
      </div>
    </div>
  );
}
