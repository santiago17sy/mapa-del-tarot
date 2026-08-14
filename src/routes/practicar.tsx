import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionTitle } from "@/components/AppShell";
import { CardFace } from "@/components/CardFace";
import { CardDetailSections } from "@/components/CardDetailSections";
import { randomCard, type TarotCard } from "@/lib/tarot";

export const Route = createFileRoute("/practicar")({
  head: () => ({
    meta: [
      { title: "Practica tu interpretación — Mapa del Tarot" },
      {
        name: "description",
        content: "Entrena tu intuición: observa una carta al azar, escribe lo que sientes y compara.",
      },
      { property: "og:title", content: "Practica tu interpretación" },
      {
        property: "og:description",
        content: "Ejercicio guiado para entrenar tu lectura intuitiva del Tarot.",
      },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const [card, setCard] = useState<TarotCard>(() => randomCard());
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [notes, setNotes] = useState("");

  function next() {
    setCard(randomCard());
    setPhase(1);
    setNotes("");
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle kicker="Módulo 3">Practica tu interpretación</SectionTitle>
        <p className="text-sm text-muted-foreground">
          Observa, siente y luego compara con el significado tradicional.
        </p>

        <div className="mx-auto w-44">
          <CardFace card={card} size="lg" />
        </div>

        {phase === 1 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">1. Observa</h2>
            <p className="text-sm text-muted-foreground">
              ¿Qué figuras, colores y símbolos ves? ¿Hacia dónde se dirige la escena? Tómate un
              momento antes de continuar.
            </p>
            <button
              onClick={() => setPhase(2)}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              Continuar
            </button>
          </section>
        ) : null}

        {phase === 2 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">2. ¿Qué sientes?</h2>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe tu intuición antes de ver el significado…"
              className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-gold"
            />
            <button
              onClick={() => setPhase(3)}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              Ver significado
            </button>
          </section>
        ) : null}

        {phase === 3 ? (
          <section className="space-y-5">
            {notes ? (
              <div className="surface space-y-2 p-5">
                <h2 className="font-display text-xl text-primary">Tu interpretación</h2>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{notes}</p>
              </div>
            ) : null}
            <div className="surface space-y-4 p-5">
              <h2 className="font-display text-2xl text-primary">{card.name}</h2>
              <CardDetailSections card={card} />
            </div>
            <button
              onClick={next}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              Otra carta
            </button>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
