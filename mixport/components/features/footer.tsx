import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="font-display text-sm font-bold text-text-inverse">
                  M
                </span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-text-primary">
                MiXport
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary max-w-xs">
              Conectamos exportadores mexicanos con compradores en Estados
              Unidos. Comercio B2B confiable y transparente.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-text-primary">
              Plataforma
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/catalog"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?featured=true"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Destacados
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-text-primary">
              Exportadores
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/register"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Vender en MiXport
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Certificaciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-text-primary">
              Soporte
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="#"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Terminos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} MiXport. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-tertiary">
              Mexico &rarr; USA
            </span>
            <span className="h-1 w-1 rounded-full bg-text-tertiary" />
            <span className="text-xs text-text-tertiary">
              B2B Trade Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
