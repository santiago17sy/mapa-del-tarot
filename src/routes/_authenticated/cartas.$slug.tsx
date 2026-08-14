import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CardFace } from "@/components/CardFace";
import { CardDetailSections } from "@/components/CardDetailSections";
import { cardsQuery, favoritesQuery, markViewed, toggleFavorite } from "@/lib/tarot";

export const Route = createFileRoute("/_authenticated/cartas/$slug")({
  head: () => ({
    meta: [
      { title: "Ficha de la carta — Mapa del Tarot" },
      { name: "description", content: "Significado, simbolismo, luz, sombra y consejo de la carta." },
      { property: "og:title", content: "Ficha de la carta — Mapa del Tarot" },
      { property: "og:description", content: "Consulta el significado completo de cada carta del Tarot." },
    ],
  }),
  component: CardDetailPage,
});

function CardDetailPage() {
  const { slug } = Route.useParams();
  const { data: cards = [], isLoading } = useQuery(cardsQuery);
  const { data: favorites = [] } = useQuery(favoritesQuery);
  const queryClient = useQueryClient();
  const card = cards.find((item) => item.slug === slug);

  const favMutation = useMutation({
    mutationFn: ({ id, isFav }: { id: string; isFav: boolean }) => toggleFavorite(id, isFav),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  useEffect(() => {
    if (!card) return;
    markViewed(card.id).then(() => queryClient.invalidateQueries({ queryKey: ["progress"] }));
  }, [card, queryClient]);

  if (isLoading) return <p className="text-sm text-muted-foreground">Cargando carta…</p>;

  if (!card) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">No encontramos esta carta.</p>
        <Link to="/cartas" className="text-sm text-primary underline">
          Volver a las cartas
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(card.id);

  return (
    <div className="space-y-7">
      <Link to="/cartas" className="text-xs text-muted-foreground">
        ← Todas las cartas
      </Link>

      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
        <div className="w-40 shrink-0">
          <CardFace card={card} size="lg" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-3xl uppercase text-primary">
            {card.number ? `${card.number} — ` : ""}
            {card.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {card.suit ? `${card.category} · ${card.suit}` : card.category}
          </p>
          <button
            onClick={() => favMutation.mutate({ id: card.id, isFav })}
            className="rounded-full border border-gold px-4 py-1.5 text-xs text-primary"
          >
            {isFav ? "❤️ Guardada en favoritos" : "♡ Guardar en favoritos"}
          </button>
        </div>
      </div>

      <CardDetailSections card={card} />
    </div>
  );
}
