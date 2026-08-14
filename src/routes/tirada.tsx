import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AppShell, SectionTitle } from "@/components/AppShell";
import { CardFace } from "@/components/CardFace";
import { CardDetailSections } from "@/components/CardDetailSections";
import { cards, findCard } from "@/lib/tarot";

export const Route = createFileRoute("/tirada")({
  head: () => ({
    meta: [
      { title: "Mi Primera Tirada — Mapa del Tarot" },
      {
        name: "description",
        content: "Prepara, realiza e interpreta tu primera tirada de tres cartas, paso a paso.",
      },
      { property: "og:title", content: "Mi Primera Tirada" },
      {
        property: "og:description",
        content: "Te acompañamos paso a paso en tu primera lectura del Tarot.",
      },
    ],
  }),
  component: ReadingPage,
});

const STEPS = 6;

function ReadingPage() {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("");
  const [picked, setPicked] = useState<[string, string, string]>(["", "", ""]);
  const [interpretation, setInterpretation] = useState("");
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const chosen = picked.map((slug) => findCard(slug)).filter((card) => Boolean(card));

  function reset() {
    setStep(1);
    setQuestion("");
    setPicked(["", "", ""]);
    setInterpretation("");
    setDone(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle kicker={`Paso ${Math.min(step, STEPS)} de ${STEPS}`}>
          Mi Primera Tirada
        </SectionTitle>
        <p className="text-sm text-muted-foreground">
          Te acompañaremos paso a paso. No necesitas memorizar todas las cartas para comenzar.
        </p>

        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${(Math.min(step, STEPS) / STEPS) * 100}%` }}
          />
        </div>

        {step === 1 ? (
          <StepCard title="Prepara tu espacio">
            <p className="text-sm text-muted-foreground">
              Busca un lugar tranquilo, apaga distracciones y respira profundo tres veces. Puedes
              encender una vela o simplemente ordenar la mesa. La intención es más importante que el
              ritual.
            </p>
            <Primary onClick={() => setStep(2)}>Estoy lista</Primary>
          </StepCard>
        ) : null}

        {step === 2 ? (
          <StepCard title="Formula tu pregunta">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="¿Qué te gustaría consultar?"
              rows={3}
              className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-gold"
            />
            <p className="text-xs text-muted-foreground">
              Prefiere preguntas abiertas y claras: “¿Qué necesito comprender sobre…?” en lugar de
              preguntas de sí o no.
            </p>
            <Primary onClick={() => setStep(3)}>Continuar</Primary>
            <Secondary onClick={() => setStep(1)}>Volver</Secondary>
          </StepCard>
        ) : null}

        {step === 3 ? (
          <StepCard title="Baraja y corta tu mazo">
            <p className="text-sm text-muted-foreground">
              Baraja con calma mientras repites tu pregunta en silencio. Cuando lo sientas, corta el
              mazo en tres montones y vuelve a unirlos en el orden que prefieras.
            </p>
            <Primary onClick={() => setStep(4)}>Ya lo hice</Primary>
            <Secondary onClick={() => setStep(2)}>Volver</Secondary>
          </StepCard>
        ) : null}

        {step === 4 ? (
          <StepCard title="Elige 3 cartas">
            <p className="text-sm text-muted-foreground">
              Saca tres cartas de tu propio mazo y regístralas aquí.
            </p>
            {[0, 1, 2].map((index) => (
              <label key={index} className="block space-y-1.5">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Carta {index + 1}
                </span>
                <select
                  value={picked[index]}
                  onChange={(e) => {
                    const next = [...picked] as [string, string, string];
                    next[index] = e.target.value;
                    setPicked(next);
                  }}
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold"
                >
                  <option value="">Selecciona una carta…</option>
                  {cards.map((card) => (
                    <option key={card.slug} value={card.slug}>
                      {card.number ? `${card.number} — ` : ""}
                      {card.name}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <Primary disabled={picked.some((slug) => !slug)} onClick={() => setStep(5)}>
              Continuar
            </Primary>
            <Secondary onClick={() => setStep(3)}>Volver</Secondary>
          </StepCard>
        ) : null}

        {step === 5 ? (
          <StepCard title="Observa tus cartas">
            <div className="grid grid-cols-3 gap-3">
              {chosen.map((card) => (
                <CardFace key={card!.slug} card={card!} size="sm" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Antes de leer significados, observa: símbolos, colores, personajes, hacia dónde miran
              y qué sensaciones aparecen en tu cuerpo.
            </p>
            <Primary onClick={() => setStep(6)}>Continuar</Primary>
            <Secondary onClick={() => setStep(4)}>Volver</Secondary>
          </StepCard>
        ) : null}

        {step === 6 ? (
          <StepCard title="Interpreta tu tirada">
            {question ? (
              <p className="rounded-xl bg-secondary/60 p-3 text-sm text-primary">
                Tu pregunta: {question}
              </p>
            ) : null}

            <div className="space-y-3">
              {chosen.map((card) => (
                <div key={card!.slug} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-lg text-primary">{card!.name}</p>
                    <button
                      onClick={() => setOpenCard(openCard === card!.slug ? null : card!.slug)}
                      className="rounded-full border border-gold px-3 py-1 text-xs text-primary"
                    >
                      {openCard === card!.slug ? "Ocultar" : "Ver significado"}
                    </button>
                  </div>
                  {openCard === card!.slug ? (
                    <div className="mt-3">
                      <CardDetailSections card={card!} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Mi interpretación
              </span>
              <textarea
                rows={5}
                value={interpretation}
                onChange={(e) => setInterpretation(e.target.value)}
                className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-gold"
              />
            </label>

            {done ? (
              <div className="space-y-3">
                <p className="text-sm text-primary">
                  Cerraste tu tirada ✦ Gracias por practicar con calma.
                </p>
                <Primary onClick={reset}>Hacer otra tirada</Primary>
              </div>
            ) : (
              <Primary onClick={() => setDone(true)}>Finalizar tirada</Primary>
            )}
          </StepCard>
        ) : null}
      </div>
    </AppShell>
  );
}

function StepCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="surface space-y-4 p-5">
      <h2 className="font-display text-2xl text-primary">{title}</h2>
      <div className="gold-rule w-16" />
      {children}
    </section>
  );
}

function Primary({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Secondary({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-input py-2.5 text-sm text-muted-foreground"
    >
      {children}
    </button>
  );
}
