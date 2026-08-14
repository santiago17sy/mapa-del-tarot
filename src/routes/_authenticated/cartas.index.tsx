import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CardGrid } from "@/components/CardGrid";
import { SectionTitle } from "@/components/AppShell";
import { cardsQuery, matchesFilter, SUITS } from "@/lib/tarot";

export const Route = createFileRoute("/_authenticated/cartas/")({
  head: () => ({
    meta: [
      { title: "Explora las 78 cartas — Mapa del Tarot" },
      { name: "description", content: "Busca y filtra las cartas del Tarot por arcanos y palos." },
      { property: "og:title", content: "Explora las 78 cartas" },
      { property: "og:description", content: "Significados, símbolos y características de cada carta." },
    ],
  }),
  component: CardsPage,
});

function CardsPage() {
  const { data: cards = [], isLoading } = useQuery(cardsQuery);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("Todas");

  const filtered = useMemo(
    () =>
      cards.filter(
        (card) =>
          matchesFilter(card, filter) &&
          card.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [cards, filter, search],
  );

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Módulo 1">Explora las 78 cartas</SectionTitle>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔎 Buscar una carta..."
        className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-gold"
      />

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

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando cartas…</p>
      ) : (
        <CardGrid cards={filtered} />
      )}
    </div>
  );
}
