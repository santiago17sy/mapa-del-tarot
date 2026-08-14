import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CardGrid } from "@/components/CardGrid";
import { SectionTitle } from "@/components/AppShell";
import { cardsQuery, favoritesQuery } from "@/lib/tarot";

export const Route = createFileRoute("/_authenticated/favoritos")({
  head: () => ({
    meta: [
      { title: "Mis cartas favoritas — Mapa del Tarot" },
      { name: "description", content: "Las cartas del Tarot que guardaste para volver a consultarlas." },
      { property: "og:title", content: "Mis cartas favoritas" },
      { property: "og:description", content: "Tu colección personal de cartas guardadas." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { data: cards = [] } = useQuery(cardsQuery);
  const { data: favorites = [] } = useQuery(favoritesQuery);
  const saved = cards.filter((card) => favorites.includes(card.id));

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Favoritos">❤️ Mis cartas favoritas</SectionTitle>
      {saved.length === 0 ? (
        <p className="surface p-6 text-sm text-muted-foreground">
          Todavía no guardaste cartas. Toca ♡ en cualquier carta para verla aquí.
        </p>
      ) : (
        <CardGrid cards={saved} />
      )}
    </div>
  );
}
