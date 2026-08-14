import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { cardsQuery, profileQuery, progressQuery, favoritesQuery } from "@/lib/tarot";

export const Route = createFileRoute("/_authenticated/inicio")({
  head: () => ({
    meta: [
      { title: "Inicio — Mapa del Tarot" },
      { name: "description", content: "Tu punto de partida para aprender a leer el Tarot." },
      { property: "og:title", content: "Inicio — Mapa del Tarot" },
      { property: "og:description", content: "Explora cartas, haz tiradas y practica tu interpretación." },
    ],
  }),
  component: HomePage,
});

const MODULES = [
  {
    icon: "🃏",
    title: "Explorar las 78 cartas",
    text: "Consulta significados, símbolos y características de cada carta.",
    cta: "Explorar cartas",
    to: "/cartas",
  },
  {
    icon: "🔮",
    title: "Haz tu primera tirada",
    text: "Aprende paso a paso cómo preparar, realizar e interpretar tu primera lectura.",
    cta: "Comenzar tirada",
    to: "/tirada",
  },
  {
    icon: "✨",
    title: "Practica tu interpretación",
    text: "Entrena tu intuición aprendiendo a observar, sentir e interpretar cada carta.",
    cta: "Practicar",
    to: "/practicar",
  },
] as const;

function HomePage() {
  const { data: profile } = useQuery(profileQuery);
  const { data: cards = [] } = useQuery(cardsQuery);
  const { data: progress = [] } = useQuery(progressQuery);
  const { data: favorites = [] } = useQuery(favoritesQuery);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Hola, {profile?.name ?? "bienvenida"} ✨</p>
        <h1 className="font-display text-3xl text-primary">¿Qué quieres hacer hoy?</h1>
        <div className="gold-rule w-24" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {MODULES.map((mod) => (
          <div key={mod.to} className="surface flex flex-col gap-3 p-6">
            <span className="text-3xl" aria-hidden>
              {mod.icon}
            </span>
            <h2 className="font-display text-xl text-primary">{mod.title}</h2>
            <p className="flex-1 text-sm text-muted-foreground">{mod.text}</p>
            <Link
              to={mod.to}
              className="rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              {mod.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/favoritos" className="surface flex items-center justify-between gap-3 p-5">
          <span className="text-sm font-semibold text-primary">❤️ Mis cartas favoritas</span>
          <span className="text-xs text-muted-foreground">{favorites.length} guardadas</span>
        </Link>

        <div className="surface space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Tu progreso</p>
          <p className="text-sm text-primary">
            {progress.length} de {cards.length || 78} cartas exploradas
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gold"
              style={{
                width: `${cards.length ? Math.min(100, (progress.length / cards.length) * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
