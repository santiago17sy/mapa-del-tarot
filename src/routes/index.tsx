import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa del Tarot — Aprende a leer el Tarot paso a paso" },
      {
        name: "description",
        content:
          "Explora las cartas del Tarot, aprende a hacer tu primera tirada y practica tu interpretación desde el celular.",
      },
      { property: "og:title", content: "Mapa del Tarot" },
      {
        property: "og:description",
        content: "Explora las cartas, haz tu primera tirada y entrena tu intuición.",
      },
    ],
  }),
  component: HomePage,
});

const MODULES = [
  {
    glyph: "✦",
    title: "Explorar las 78 cartas",
    text: "Consulta significados, símbolos y características de cada carta.",
    cta: "Explorar cartas",
    to: "/cartas",
  },
  {
    glyph: "☾",
    title: "Mi Primera Tirada",
    text: "Aprende paso a paso cómo realizar e interpretar tu primera lectura.",
    cta: "Comenzar",
    to: "/tirada",
  },
  {
    glyph: "✧",
    title: "Practica tu interpretación",
    text: "Entrena tu intuición observando, sintiendo e interpretando las cartas.",
    cta: "Practicar",
    to: "/practicar",
  },
] as const;

function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <header className="space-y-3 text-center sm:text-left">
          <h1 className="font-display text-4xl text-primary">Mapa del Tarot</h1>
          <div className="gold-rule mx-auto w-24 sm:mx-0" />
          <p className="font-display text-2xl text-primary/90">¿Qué quieres hacer hoy?</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {MODULES.map((mod) => (
            <section key={mod.to} className="surface flex flex-col gap-3 p-6">
              <span className="text-3xl leading-none text-gold" aria-hidden>
                {mod.glyph}
              </span>
              <h2 className="font-display text-xl text-primary">{mod.title}</h2>
              <p className="flex-1 text-sm text-muted-foreground">{mod.text}</p>
              <Link
                to={mod.to}
                className="rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                {mod.cta}
              </Link>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
