import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Globe,
  TrendingUp,
  Package,
  Star,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/features/navbar";
import { Footer } from "@/components/features/footer";
import { ProductCard } from "@/components/features/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/lib/dummy-data";

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-warm/5" />
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-accent-warm/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface px-4 py-1.5 text-sm text-text-secondary animate-fade-in">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Plataforma B2B activa — 1,200+ exportadores verificados
              </div>

              <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-text-primary md:text-7xl animate-fade-in stagger-1">
                De Mexico
                <br />
                <span className="text-accent">al mundo.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary animate-fade-in stagger-2">
                Conectamos exportadores mexicanos con compradores en Estados
                Unidos. Productos autenticos, logistica integrada y pagos
                seguros en una sola plataforma.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in stagger-3">
                <Link href="/catalog">
                  <Button size="lg">
                    Explorar marketplace
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg">
                    Soy exportador
                  </Button>
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8 animate-fade-in stagger-4">
                <div>
                  <p className="font-display text-3xl font-bold text-text-primary">
                    1,200+
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Exportadores verificados
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-text-primary">
                    $24M
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    En transacciones
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-text-primary">
                    98%
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Entregas a tiempo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary">
                  Categorias
                </h2>
                <p className="mt-2 text-text-secondary">
                  Encuentra productos mexicanos por sector
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-bg-surface p-4 text-center transition-all hover:border-accent hover:shadow-md hover:shadow-shadow"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-[10px] text-text-tertiary mt-0.5">
                      {cat.productCount} productos
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary">
                  Productos destacados
                </h2>
                <p className="mt-2 text-text-secondary">
                  Lo mejor de la exportacion mexicana
                </p>
              </div>
              <Link
                href="/catalog"
                className="hidden items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors sm:flex"
              >
                Ver todo <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`animate-slide-up stagger-${i + 1}`}
                  style={{ opacity: 0 }}
                >
                  <ProductCard product={product} showAuthPrompt />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary">
                Por que MiXport
              </h2>
              <p className="mt-3 text-text-secondary max-w-lg mx-auto">
                Una plataforma disenada para el comercio B2B entre Mexico y
                Estados Unidos
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Shield,
                  title: "Exportadores verificados",
                  desc: "Cada exportador pasa por un proceso de verificacion de identidad, RFC y certificaciones.",
                },
                {
                  icon: Globe,
                  title: "Logistica integrada",
                  desc: "Envios transfronterizos con rastreo en tiempo real y gestion de aduanas incluida.",
                },
                {
                  icon: TrendingUp,
                  title: "Pagos seguros",
                  desc: "Pagos protegidos con escrow. El exportador recibe su pago al confirmar la entrega.",
                },
                {
                  icon: Package,
                  title: "Cumplimiento normativo",
                  desc: "Soporte para certificaciones FDA, USDA y regulaciones de importacion a USA.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="group rounded-xl border border-border bg-bg-primary p-6 transition-all hover:border-accent hover:shadow-md hover:shadow-shadow"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-text-inverse">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-accent p-10 md:p-16">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-black/10 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                    Lleva tus productos a USA
                  </h2>
                  <p className="mt-3 max-w-md text-base text-white/80">
                    Registrate como exportador y accede a miles de compradores
                    en el mercado estadounidense.
                  </p>
                </div>
                <Link href="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-accent hover:bg-white/90 shrink-0"
                  >
                    Comenzar ahora
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
