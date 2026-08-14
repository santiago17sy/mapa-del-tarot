import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Symbolism = { symbol: string; meaning: string };
export type Combination = { card: string; meaning: string };

export type TarotCard = {
  id: string;
  slug: string;
  name: string;
  number: string | null;
  category: string;
  suit: string | null;
  image: string | null;
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

function normalize(row: Record<string, unknown>): TarotCard {
  return {
    ...(row as unknown as TarotCard),
    symbolism: Array.isArray(row["symbolism"]) ? (row["symbolism"] as Symbolism[]) : [],
    combinations: Array.isArray(row["combinations"]) ? (row["combinations"] as Combination[]) : [],
  };
}

export const cardsQuery = queryOptions({
  queryKey: ["tarot_cards"],
  queryFn: async (): Promise<TarotCard[]> => {
    const { data, error } = await supabase
      .from("tarot_cards")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []).map((row) => normalize(row as Record<string, unknown>));
  },
});

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email, role, access_active, created_at")
      .eq("id", auth.user.id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
});

export const favoritesQuery = queryOptions({
  queryKey: ["favorites"],
  queryFn: async (): Promise<string[]> => {
    const { data, error } = await supabase.from("favorites").select("tarot_card_id");
    if (error) throw error;
    return (data ?? []).map((row) => row.tarot_card_id);
  },
});

export const progressQuery = queryOptions({
  queryKey: ["progress"],
  queryFn: async (): Promise<string[]> => {
    const { data, error } = await supabase.from("user_progress").select("tarot_card_id");
    if (error) throw error;
    return (data ?? []).map((row) => row.tarot_card_id);
  },
});

export async function toggleFavorite(cardId: string, isFavorite: boolean) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Sesión no disponible");
  if (isFavorite) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", auth.user.id)
      .eq("tarot_card_id", cardId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: auth.user.id, tarot_card_id: cardId });
  if (error) throw error;
}

export async function markViewed(cardId: string) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return;
  await supabase
    .from("user_progress")
    .upsert(
      { user_id: auth.user.id, tarot_card_id: cardId, viewed_at: new Date().toISOString() },
      { onConflict: "user_id,tarot_card_id" },
    );
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
      return "🜂";
    case "Copas":
      return "🜄";
    case "Espadas":
      return "🜁";
    case "Oros":
      return "🜃";
    default:
      return "✦";
  }
}
