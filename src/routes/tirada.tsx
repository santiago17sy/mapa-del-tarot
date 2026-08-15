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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReadingPage,
});

const STEPS = 6;

type Orientation = "" | "upright" | "reversed";
type Triple<T> = [T, T, T];

function readingResult(orientations: Triple<Orientation>) {
  const upright = orientations.filter((o) => o === "upright").length;
  const reversed = orientations.filter((o) => o === "reversed").length;
  if (upright === 3) return { title: "SÍ ROTUNDO", note: "" };
  if (upright === 2 && reversed === 1)
    return { title: "SÍ CON RESERVAS", note: "El resultado depende de tu acción." };
  if (reversed === 2 && upright === 1)
    return { title: "NO POR EL MOMENTO", note: "Existen obstáculos importantes." };
  if (reversed === 3) return { title: "NO ROTUNDO", note: "" };
  return null;
}

function ReadingPage() {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("");
  const [picked, setPicked] = useState<Triple<string>>(["", "", ""]);
  const [orientations, setOrientations] = useState<Triple<Orientation>>(["", "", ""]);
  const [interpretation, setInterpretation] = useState("");
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const chosen = [0, 1, 2].map((i) => ({
    card: findCard(picked[i]),
    orientation: orientations[i],
    index: i,
  }));
  const selected = chosen.filter((entry) => Boolean(entry.card));

  const uniqueCount = new Set(picked.filter(Boolean)).size;
  const step4Ready =
    picked.every(Boolean) && uniqueCount === 3 && orientations.every((o) => o !== "");
  const result = readingResult(orientations);

  function reset() {
    setStep(1);
    setQuestion("");
    setPicked(["", "", ""]);
    setOrientations(["", "", ""]);
    setInterpretation("");
    setOpenCard(null);
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
              Busca un lugar tranquilo donde nadie te interrumpa, ten tu baraja física preparada y
              concéntrate en la consulta que quieres realizar.
            </p>
            <Primary onClick={() => setStep(2)}>Estoy listo/a</Primary>
          </StepCard>
        ) : null}

        {step === 2 ? (
          <StepCard title="Formula tu pregunta">
            <p className="text-sm text-muted-foreground">
              Una pregunta clara ayuda a que la lectura tenga una dirección. Es preferible formular
              preguntas abiertas y reflexivas.
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="¿Qué te gustaría consultar?"
              rows={3}
              className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-gold"
            />
            <div className="space-y-2 rounded-xl bg-secondary/60 p-3 text-sm">
              <p className="text-muted-foreground">
                En lugar de: <span className="text-primary">“¿Me voy a casar?”</span>
              </p>
              <p className="text-muted-foreground">
                Prueba con:{" "}
                <span className="text-primary">
                  “¿Qué energías están actuando sobre mi relación y cómo puedo fortalecer el
                  vínculo?”
                </span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Cuanto más clara sea tu intención al barajar, más fácil será interpretar la respuesta.
            </p>
            <Primary onClick={() => setStep(3)}>Continuar</Primary>
            <Secondary onClick={() => setStep(1)}>Atrás</Secondary>
          </StepCard>
        ) : null}

        {step === 3 ? (
          <StepCard title="Baraja tu mazo">
            <p className="text-sm text-muted-foreground">
              Mantén tu pregunta en mente mientras barajas tu baraja física.
            </p>
            <p className="text-sm text-muted-foreground">
              Cuando sientas que es suficiente, detente y prepara el mazo para extraer tres cartas.
            </p>
            <Primary onClick={() => setStep(4)}>Ya he barajado</Primary>
            <Secondary onClick={() => setStep(2)}>Atrás</Secondary>
          </StepCard>
        ) : null}

        {step === 4 ? (
          <StepCard title="Elige tres cartas">
            <p className="text-sm text-muted-foreground">
              Extrae tres cartas de tu mazo y regístralas aquí, indicando si salieron al derecho o
              invertidas.
            </p>
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2 rounded-xl border border-border p-3">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Carta {index + 1}
                </span>
                <select
                  value={picked[index]}
                  onChange={(e) => {
                    const next = [...picked] as Triple<string>;
                    next[index] = e.target.value;
                    setPicked(next);
                  }}
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold"
                >
                  <option value="">Selecciona una carta…</option>
                  {cards.map((card) => (
                    <option
                      key={card.slug}
                      value={card.slug}
                      disabled={picked.some((slug, i) => i !== index && slug === card.slug)}
                    >
                      {card.number ? `${card.number} — ` : ""}
                      {card.name}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  {(["upright", "reversed"] as const).map((value) => {
                    const active = orientations[index] === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          const next = [...orientations] as Triple<Orientation>;
                          next[index] = value;
                          setOrientations(next);
                        }}
                        className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
                          active
                            ? "border-gold bg-secondary text-primary"
                            : "border-input text-muted-foreground"
                        }`}
                      >
                        {value === "upright" ? "Al derecho" : "Invertida"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <Primary disabled={!step4Ready} onClick={() => setStep(5)}>
              Continuar
            </Primary>
            <Secondary onClick={() => setStep(3)}>Atrás</Secondary>
          </StepCard>
        ) : null}

        {step === 5 ? (
          <StepCard title="Observa las conexiones">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {selected.map((entry) => (
                <ChosenCard key={entry.card!.slug} entry={entry} />
              ))}
            </div>

            <div className="space-y-3">
              <Concept title="Cromatismo">
                Observa los colores de las tres cartas. ¿Son parecidos? ¿Existe armonía o contraste?
              </Concept>
              <Concept title="Dirección">
                Observa hacia dónde miran los personajes. ¿Parecen mirar hacia otra carta?
              </Concept>
              <Concept title="Conexión">
                No leas las cartas como elementos aislados. Observa qué relación parece existir entre
                ellas.
              </Concept>
            </div>

            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>¿Qué fue lo primero que llamó tu atención?</li>
              <li>¿Qué carta destaca más para ti?</li>
              <li>¿Qué sensación producen las tres cartas juntas?</li>
              <li>¿Parecen contar una historia?</li>
            </ul>

            <p className="rounded-xl border border-gold/60 bg-secondary/60 p-3 text-sm text-primary">
              La tirada organiza las cartas para ayudarte a crear una narrativa.
            </p>

            <Primary onClick={() => setStep(6)}>Interpretar mi tirada</Primary>
            <Secondary onClick={() => setStep(4)}>Atrás</Secondary>
          </StepCard>
        ) : null}

        {step === 6 ? (
          <StepCard title="Interpreta tu tirada">
            {question ? (
              <p className="rounded-xl bg-secondary/60 p-3 text-sm text-primary">
                Tu pregunta: {question}
              </p>
            ) : null}

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {selected.map((entry) => (
                <ChosenCard key={entry.card!.slug} entry={entry} />
              ))}
            </div>

            <div className="space-y-3">
              {selected.map((entry) => {
                const card = entry.card!;
                const reversed = entry.orientation === "reversed";
                return (
                  <div key={card.slug} className="rounded-xl border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-lg text-primary">
                          Carta {entry.index + 1}: {card.name}
                        </p>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                          {reversed ? "Invertida ↕" : "Al derecho"}
                        </p>
                      </div>
                      <button
                        onClick={() => setOpenCard(openCard === card.slug ? null : card.slug)}
                        className="rounded-full border border-gold px-3 py-1 text-xs text-primary"
                      >
                        {openCard === card.slug ? "Ocultar" : "Ver significado"}
                      </button>
                    </div>
                    {reversed ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Al estar invertida, consulta también su interpretación invertida.
                      </p>
                    ) : null}
                    {openCard === card.slug ? (
                      <div className="mt-3">
                        <CardDetailSections card={card} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {result ? (
              <div className="rounded-2xl border border-gold bg-secondary/70 p-5 text-center">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Resultado de la tirada
                </p>
                <p className="font-display text-3xl text-primary">{result.title}</p>
                {result.note ? (
                  <p className="mt-1 text-sm text-muted-foreground">{result.note}</p>
                ) : null}
              </div>
            ) : null}

            <section className="space-y-2">
              <h3 className="font-display text-xl text-primary">Ahora interpreta el mensaje</h3>
              <div className="gold-rule w-16" />
              <p className="text-sm text-muted-foreground">
                El resultado general no sustituye la interpretación individual de las cartas.
                Observa:
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>· Qué significa cada carta</li>
                <li>· Qué aporta su orientación al derecho o invertida</li>
                <li>· Qué relación existe entre las tres</li>
                <li>· Qué mensaje conjunto parece surgir</li>
              </ul>
            </section>

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
            <Secondary onClick={() => setStep(5)}>Atrás</Secondary>
          </StepCard>
        ) : null}
      </div>
    </AppShell>
  );
}

function ChosenCard({
  entry,
}: {
  entry: { card: ReturnType<typeof findCard>; orientation: Orientation; index: number };
}) {
  const reversed = entry.orientation === "reversed";
  return (
    <div className="space-y-1.5">
      <div className={reversed ? "rotate-180" : undefined}>
        <CardFace card={entry.card!} size="sm" />
      </div>
      <p className="text-center text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
        Carta {entry.index + 1} · {reversed ? "Invertida" : "Derecho"}
      </p>
    </div>
  );
}

function Concept({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-secondary/50 p-3">
      <p className="text-xs uppercase tracking-[0.15em] text-gold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
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
