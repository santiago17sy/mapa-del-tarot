import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppShell";
import { CardGrid } from "@/components/CardGrid";
import { cards, matchesFilter, SUITS } from "@/lib/tarot";

export const Route = createFileRoute("/cartas/")({
  head: () => ({
    meta: [
      { title: "Explorar las 78 cartas — Mapa del Tarot" },
      {
        name: "description",
        content: "Busca y filtra las cartas del Tarot por arcanos y palos, con significados y símbolos.",
      },
      { property: "og:title", content: "Explorar las 78 cartas" },
      {
        property: "og:description",
        content: "Significados, símbolos y características de cada carta del Tarot.",
      },
    ],
  }),
  component: CardsPage,
});

function CardsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("Todas");

  const filtered = useMemo(
    () =>
      cards.filter(
        (card) =>
          matchesFilter(card, filter) &&
          card.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [filter, search],
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle kicker="Módulo 1">Explorar las 78 cartas</SectionTitle>
        <p className="text-sm text-muted-foreground">
          Consulta significados, símbolos y características de cada carta.
        </p>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar una carta..."
            aria-label="Buscar una carta"
            className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-gold"
          />
        </div>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {SUITS.map((suit) => (
            <button
              key={suit}
              onClick={() => setFilter(suit)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                filter === suit
                  ? "border-gold bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {suit}
            </button>
          ))}
        </div>

        <CardGrid cards={filtered} />
      </div>
    </AppShell>
  );
}
