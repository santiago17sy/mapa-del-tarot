import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/inicio", label: "Inicio", icon: "🏠" },
  { to: "/cartas", label: "Cartas", icon: "🃏" },
  { to: "/tirada", label: "Tirada", icon: "🔮" },
  { to: "/practicar", label: "Practicar", icon: "✨" },
  { to: "/perfil", label: "Perfil", icon: "👤" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/inicio" className="font-display text-lg text-primary">
            Mapa del Tarot <span className="text-gold">✦</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-6">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[0.65rem]"
            >
              <span className="text-lg leading-none" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="space-y-1">
      {kicker ? (
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">{kicker}</p>
      ) : null}
      <h1 className="font-display text-3xl text-primary">{children}</h1>
    </div>
  );
}
