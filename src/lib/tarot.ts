import { TAROT_CARDS } from "@/data/cards";

export type Symbolism = { symbol: string; meaning: string };
export type Combination = { card: string; meaning: string };

export type TarotCard = {
  slug: string;
  name: string;
  number: string | null;
  category: string;
  suit: string | null;
  general_meaning: string | null;
  element: string | null;
  planet_or_sign: string | null;
  timing: string | null;
  yes_no: string | null;
  symbolism: Symbolism[];
  light: string | null;
  shadow: string | null;
  reversed_meaning: string | null;
  combinations: Combination[];
  advice: string | null;
  sort_order: number;
};

export const cards: TarotCard[] = [...TAROT_CARDS].sort((a, b) => a.sort_order - b.sort_order);

export function findCard(slug: string) {
  return cards.find((card) => card.slug === slug);
}

export function randomCard() {
  return cards[Math.floor(Math.random() * cards.length)]!;
}

export const SUITS = ["Todas", "Arcanos Mayores", "Bastos", "Copas", "Espadas", "Oros"] as const;

export function matchesFilter(card: TarotCard, filter: string) {
  if (filter === "Todas") return true;
  if (filter === "Arcanos Mayores") return card.category === "Arcano Mayor";
  return card.suit === filter;
}

export function suitGlyph(card: TarotCard) {
  switch (card.suit) {
    case "Bastos":
      return "△";
    case "Copas":
      return "▽";
    case "Espadas":
      return "◇";
    case "Oros":
      return "○";
    default:
      return "✦";
  }
}
