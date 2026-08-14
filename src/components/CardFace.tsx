import type { TarotCard } from "@/lib/tarot";
import { suitGlyph } from "@/lib/tarot";

export function CardFace({
  card,
  size = "md",
}: {
  card: TarotCard;
  size?: "sm" | "md" | "lg";
}) {
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-xs" : "text-sm";
  const glyph = size === "lg" ? "text-6xl" : size === "sm" ? "text-2xl" : "text-4xl";

  if (card.image) {
    return (
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl border border-gold/40">
        <img src={card.image} alt={card.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[2/3] w-full flex-col items-center justify-between overflow-hidden rounded-xl border border-gold/50 bg-primary p-3 text-center text-primary-foreground">
      <span className="absolute inset-2 rounded-lg border border-gold/30" aria-hidden />
      <span className="font-display text-[0.7rem] tracking-[0.25em] text-gold-soft/80">
        {card.number ?? "•"}
      </span>
      <span className={`${glyph} text-gold`} aria-hidden>
        {suitGlyph(card)}
      </span>
      <span className={`font-display ${text} leading-tight`}>{card.name}</span>
    </div>
  );
}
