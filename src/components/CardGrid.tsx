import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CardFace } from "@/components/CardFace";
import { favoritesQuery, toggleFavorite, type TarotCard } from "@/lib/tarot";

export function CardGrid({ cards }: { cards: TarotCard[] }) {
  const { data: favorites = [] } = useQuery(favoritesQuery);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, isFav }: { id: string; isFav: boolean }) => toggleFavorite(id, isFav),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  if (cards.length === 0) {
    return (
      <p className="surface p-6 text-center text-sm text-muted-foreground">
        No encontramos cartas con esa búsqueda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => {
        const isFav = favorites.includes(card.id);
        return (
          <div key={card.id} className="surface overflow-hidden p-3">
            <Link to="/cartas/$slug" params={{ slug: card.slug }} className="block">
              <CardFace card={card} size="sm" />
              <p className="mt-3 font-display text-base leading-tight text-primary">
                {card.number ? `${card.number} — ` : ""}
                {card.name}
              </p>
              <p className="text-[0.7rem] text-muted-foreground">
                {card.suit ? `${card.category} · ${card.suit}` : card.category}
              </p>
            </Link>
            <button
              onClick={() => mutation.mutate({ id: card.id, isFav })}
              className="mt-2 text-xs text-muted-foreground"
              aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
            >
              {isFav ? "❤️ Favorita" : "♡ Favorito"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
