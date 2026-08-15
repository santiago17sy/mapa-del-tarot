import { useState } from "react";
import type { TarotCard } from "@/lib/tarot";
import { suitGlyph } from "@/lib/tarot";

// Cartas con imagen disponible en public/cards/{slug}.webp
const CARDS_WITH_IMAGE = new Set(["el-loco", "el-mago", "la-suma-sacerdotisa"]);

export function CardFace({
  card,
  size = "md",
}: {
  card: TarotCard;
  size?: "sm" | "md" | "lg";
}) {
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-xs" : "text-sm";
  const glyph = size === "lg" ? "text-6xl" : size === "sm" ? "text-2xl" : "text-4xl";
  const [failed, setFailed] = useState(false);
  const hasImage = CARDS_WITH_IMAGE.has(card.slug) && !failed;

  if (hasImage) {
    return (
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl border border-gold/50 bg-card shadow-sm">
        <img
          src={`/cards/${card.slug}.webp`}
          alt={card.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[2/3] w-full flex-col items-center justify-between rounded-xl border border-gold/50 bg-card p-2.5 text-center shadow-sm">
      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-gold">
        {card.number ?? card.category}
      </span>
      <span className={`${glyph} leading-none text-primary/80`} aria-hidden>
        {suitGlyph(card)}
      </span>
      <span className={`${text} font-display leading-tight text-primary`}>{card.name}</span>
    </div>
  );
}
