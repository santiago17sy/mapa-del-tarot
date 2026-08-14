import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CardFace } from "@/components/CardFace";
import { Section } from "@/components/CardDetailSections";
import { SectionTitle } from "@/components/AppShell";
import { cardsQuery, favoritesQuery, toggleFavorite } from "@/lib/tarot";

export const Route = createFileRoute("/_authenticated/practicar")({
  head: () => ({
    meta: [
      { title: "Entrena tu intuición — Mapa del Tarot" },
      { name: "description", content: "Observa, siente e interpreta una carta al azar antes de leer su significado." },
      { property: "og:title", content: "Entrena tu intuición" },
      { property: "og:description", content: "Practica la interpretación del Tarot paso a paso." },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const { data: cards = [] } = useQuery(cardsQuery);
  const { data: favorites = [] } = useQuery(favoritesQuery);
  const queryClient = useQueryClient();
  const [cardId, setCardId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [observa, setObserva] = useState("");
  const [siente, setSiente] = useState("");
  const [interpreta, setInterpreta] = useState("");

  const favMutation = useMutation({
    mutationFn: ({ id, isFav }: { id: string; isFav: boolean }) => toggleFavorite(id, isFav),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  useEffect(() => {
    if (!cardId && cards.length > 0) {
      setCardId(cards[Math.floor(Math.random() * cards.length)]!.id);
    }
  }, [cards, cardId]);

  const card = cards.find((item) => item.id === cardId);

  function again() {
    if (cards.length === 0) return;
    setCardId(cards[Math.floor(Math.random() * cards.length)]!.id);
    setStep(1);
    setObserva("");
    setSiente("");
    setInterpreta("");
  }

  if (!card) return <p className="text-sm text-muted-foreground">Preparando una carta…</p>;

  const isFav = favorites.includes(card.id);

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Módulo 3">✨ Entrena tu intuición</SectionTitle>
      <p className="text-sm text-muted-foreground">
        No se trata solo de memorizar. Primero observa, luego siente y finalmente interpreta.
      </p>

      <div className="mx-auto w-44">
        <CardFace card={card} size="lg" />
      </div>
      {step < 4 ? (
        <p className="text-center text-xs text-muted-foreground">
          El significado se revelará al final ✦
        </p>
      ) : (
        <p className="text-center font-display text-2xl text-primary">{card.name}</p>
      )}

      {step === 1 ? (
        <Section title="Paso 1 — Observa 👁️">
          <p className="text-sm text-primary">¿Qué fue lo primero que llamó tu atención?</p>
          <Textarea value={observa} onChange={setObserva} />
          <p className="text-xs text-muted-foreground">
            Observa colores, personajes, objetos, símbolos y dirección.
          </p>
          <Primary onClick={() => setStep(2)}>Continuar</Primary>
        </Section>
      ) : null}

      {step === 2 ? (
        <Section title="Paso 2 — Siente ❤️">
          <p className="text-sm text-primary">¿Qué emoción te transmite esta carta?</p>
          <Textarea value={siente} onChange={setSiente} />
          <Primary onClick={() => setStep(3)}>Continuar</Primary>
        </Section>
      ) : null}

      {step === 3 ? (
        <Section title="Paso 3 — Interpreta ✨">
          <p className="text-sm text-primary">¿Qué mensaje crees que intenta comunicarte?</p>
          <Textarea value={interpreta} onChange={setInterpreta} />
          <Primary onClick={() => setStep(4)}>Ver significado</Primary>
        </Section>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4">
          <Section title="Interpretación de la carta">
            <p className="text-sm text-foreground/85">{card.general_meaning}</p>
            {card.symbolism.length > 0 ? (
              <ul className="space-y-2">
                {card.symbolism.map((item) => (
                  <li key={item.symbol} className="text-sm">
                    <span className="font-semibold text-primary">✦ {item.symbol}: </span>
                    <span className="text-muted-foreground">{item.meaning}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="text-sm">
              <span className="font-semibold text-primary">Luz ☀️ </span>
              <span className="text-muted-foreground">{card.light}</span>
            </p>
            <p className="text-sm">
              <span className="font-semibold text-primary">Sombra 🌑 </span>
              <span className="text-muted-foreground">{card.shadow}</span>
            </p>
            <p className="text-sm italic text-foreground/85">Consejo ✨ {card.advice}</p>
          </Section>

          <Section title="Tu interpretación">
            <Answer label="Observaste" value={observa} />
            <Answer label="Sentiste" value={siente} />
            <Answer label="Interpretaste" value={interpreta} />
          </Section>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={again}
              className="rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              Practicar con otra carta
            </button>
            <button
              onClick={() => favMutation.mutate({ id: card.id, isFav })}
              className="rounded-xl border border-gold py-3 text-sm text-primary"
            >
              {isFav ? "❤️ Guardada" : "❤️ Guardar carta"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Answer({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="text-sm text-primary">{value}</p>
    </div>
  );
}

function Textarea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-gold"
    />
  );
}

function Primary({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
    >
      {children}
    </button>
  );
}
