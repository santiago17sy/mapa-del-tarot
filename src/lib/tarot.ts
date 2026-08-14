import { TAROT_CARDS } from "@/data/cards";

export type Symbolism = { symbol: string; meaning: string };
export type Combination = { card: string; meaning: string };
export type Assignment = { label: string; value: string };
export type Impulse = { title: string; text: string };

export type TarotCard = {
  slug: string;
  name: string;
  number: string | null;
  category: string;
  suit: string | null;
  tagline: string | null;
  general_meaning: string | null;
  assignments: Assignment[];
  symbolism: Symbolism[];
  light: string | null;
  shadow: string | null;
  reversed_meaning: string | null;
  combinations: Combination[];
  impulse: Impulse[];
  sort_order: number;
  content_pending?: boolean;
};


export const cards: TarotCard[] = [...TAROT_CARDS].sort((a, b) => a.sort_order - b.sort_order);

// Verificación del mazo: 78 cartas (22 mayores + 14 por palo) y sin duplicados.
export function validateDeck(deck: TarotCard[] = cards) {
  const slugs = new Set(deck.map((card) => card.slug));
  const names = new Set(deck.map((card) => card.name));
  const count = (suit: string) => deck.filter((card) => card.suit === suit).length;
  return {
    total: deck.length,
    duplicateSlugs: deck.length - slugs.size,
    duplicateNames: deck.length - names.size,
    majors: deck.filter((card) => card.category === "Arcano Mayor").length,
    bastos: count("Bastos"),
    copas: count("Copas"),
    espadas: count("Espadas"),
    oros: count("Oros"),
  };
}

if (import.meta.env.DEV) {
  const report = validateDeck();
  const ok =
    report.total === 78 &&
    report.duplicateSlugs === 0 &&
    report.duplicateNames === 0 &&
    report.majors === 22 &&
    [report.bastos, report.copas, report.espadas, report.oros].every((n) => n === 14);
  if (!ok) console.error("[tarot] Mazo inválido", report);
}


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
