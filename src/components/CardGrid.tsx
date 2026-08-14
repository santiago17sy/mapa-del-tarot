import { Link } from "@tanstack/react-router";
import { CardFace } from "@/components/CardFace";
import type { TarotCard } from "@/lib/tarot";

export function CardGrid({ cards }: { cards: TarotCard[] }) {
  if (cards.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No encontramos cartas con esa búsqueda. Prueba con otro nombre.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.slug}
          to="/cartas/$slug"
          params={{ slug: card.slug }}
          className="surface flex flex-col gap-2 p-3 transition-transform active:scale-[0.98]"
        >
          <CardFace card={card} />
          <span className="font-display text-base leading-tight text-primary">{card.name}</span>
          <span className="text-[0.68rem] text-muted-foreground">
            {card.suit ? `${card.category} · ${card.suit}` : card.category}
          </span>
        </Link>
      ))}
    </div>
  );
}
