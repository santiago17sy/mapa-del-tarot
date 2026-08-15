import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionTitle } from "@/components/AppShell";
import { CardFace } from "@/components/CardFace";
import { Section } from "@/components/CardDetailSections";
import { cards, randomCard, type TarotCard } from "@/lib/tarot";

export const Route = createFileRoute("/practicar")({
  head: () => ({
    meta: [
      { title: "Practica tu interpretación — Mapa del Tarot" },
      {
        name: "description",
        content:
          "Observa, siente e interpreta una carta al azar y luego compárala con su significado tradicional.",
      },
      { property: "og:title", content: "Practica tu interpretación" },
      {
        property: "og:description",
        content: "Ejercicio guiado para entrenar tu lectura intuitiva del Tarot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticePage,
});

type Answers = {
  veo: string;
  siento: string;
  sucede: string;
  energia: string;
  mensajeInicial: string;
  simbolo: string;
  simboloSignifica: string;
  simboloVida: string;
  simboloMensaje: string;
  luz: string;
  sombra: string;
  consejo: string;
};

const EMPTY: Answers = {
  veo: "",
  siento: "",
  sucede: "",
  energia: "",
  mensajeInicial: "",
  simbolo: "",
  simboloSignifica: "",
  simboloVida: "",
  simboloMensaje: "",
  luz: "",
  sombra: "",
  consejo: "",
};

function Hints({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 rounded-xl bg-secondary/50 p-3">
      {items.map((item) => (
        <li key={item} className="text-sm text-muted-foreground">
          • {item}
        </li>
      ))}
    </ul>
  );
}

function Field({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:border-gold"
    />
  );
}

function Lens({ title, text }: { title: string; text: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">{title}</p>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-gold/40 bg-secondary/40 px-3 py-2 text-sm italic text-primary/90">
      {children}
    </p>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="whitespace-pre-line text-sm text-foreground/85">{value}</p>
    </div>
  );
}

function PracticePage() {
  const [card, setCard] = useState<TarotCard>(() => randomCard());
  const [step, setStep] = useState(0); // 0 = inicio, 1..6 pasos, 7 = resultado
  const [answers, setAnswers] = useState<Answers>(EMPTY);

  const set = (key: keyof Answers) => (value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  function otherCard() {
    let next = randomCard();
    let guard = 0;
    while (next.slug === card.slug && guard < 20) {
      next = cards[Math.floor(Math.random() * cards.length)]!;
      guard += 1;
    }
    setCard(next);
    setAnswers(EMPTY);
    setStep(0);
  }

  const inExercise = step >= 1 && step <= 6;

  return (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle kicker="Módulo 3">Practica tu Interpretación</SectionTitle>
        <p className="text-sm text-muted-foreground">
          Aprende a escuchar los símbolos, sentir el mensaje y leer el Tarot con más claridad.
        </p>

        {step === 0 ? (
          <Note>
            Interpretar el Tarot no es solo memorizar significados. Primero observa, luego siente y
            después interpreta.
          </Note>
        ) : null}

        {inExercise ? (
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Paso {step} de 6</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        ) : null}

        {step <= 6 ? (
          <div className="space-y-2">
            <div className="mx-auto w-48">
              <CardFace card={card} size="lg" />
            </div>
            <p className="text-center font-display text-xl text-primary">{card.name}</p>
          </div>
        ) : null}

        {step === 0 ? (
          <button
            onClick={() => setStep(1)}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            Comenzar práctica
          </button>
        ) : null}

        {step === 1 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">1. Observa</h2>
            <p className="text-sm text-muted-foreground">Mira la carta antes de interpretarla.</p>
            <Lens
              title="¿Qué veo?"
              text="Observa colores, personajes, objetos, paisajes y direcciones."
            />
            <Hints
              items={[
                "¿Qué colores predominan?",
                "¿Qué personajes aparecen?",
                "¿Qué objetos o símbolos llaman tu atención?",
                "¿Qué está pasando en la escena?",
                "¿Hacia dónde miran o se dirigen los personajes?",
              ]}
            />
            <Field label="Describe lo que ves..." value={answers.veo} onChange={set("veo")} />
          </section>
        ) : null}

        {step === 2 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">2. Siente</h2>
            <Lens
              title="¿Qué siento?"
              text="Identifica la emoción que la carta despierta en ti de forma inmediata."
            />
            <Hints
              items={[
                "¿La carta transmite calma o tensión?",
                "¿Sientes alegría, tristeza, miedo, esperanza u otra emoción?",
                "¿Te sientes atraído/a, inquieto/a, inspirado/a o alerta?",
                "¿Qué recuerdo o situación te evoca?",
              ]}
            />
            <Field
              label="¿Qué emoción despierta esta carta en ti?"
              value={answers.siento}
              onChange={set("siento")}
            />
            <Note>
              Tu primera impresión es valiosa. No busques todavía la respuesta correcta: observa lo
              que realmente sientes.
            </Note>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">3. Comprende la escena</h2>
            <Lens
              title="¿Qué sucede?"
              text="Observa las acciones, dinámicas y relaciones entre los elementos de la carta."
            />
            <Hints
              items={[
                "¿Qué está haciendo el personaje?",
                "¿Qué parece estar a punto de ocurrir?",
                "¿Hay movimiento o quietud?",
                "¿Quién actúa?",
                "¿Quién espera?",
              ]}
            />
            <Field
              label="¿Qué crees que está sucediendo en esta escena?"
              value={answers.sucede}
              onChange={set("sucede")}
            />
          </section>
        ) : null}

        {step === 4 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">4. Percibe la energía</h2>
            <Lens title="¿Qué energía domina?" text="Percibe la atmósfera general de la carta." />
            <div className="flex flex-wrap gap-2">
              {[
                "pesada",
                "ligera",
                "expansiva",
                "limitada",
                "protectora",
                "intensa",
                "suave",
                "abierta",
                "cerrada",
              ].map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-primary"
                >
                  {word}
                </span>
              ))}
            </div>
            <Field
              label="¿Qué energía domina esta carta?"
              rows={3}
              value={answers.energia}
              onChange={set("energia")}
            />
            <Lens
              title="¿Qué mensaje inicial me da?"
              text="Escribe una frase corta que resuma lo que la carta te transmite antes de consultar su significado."
            />
            <Field
              label="Mi mensaje inicial..."
              rows={3}
              value={answers.mensajeInicial}
              onChange={set("mensajeInicial")}
            />
            <Note>Confía en tu primera impresión.</Note>
          </section>
        ) : null}

        {step === 5 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">5. Del símbolo al mensaje</h2>
            <p className="text-sm text-muted-foreground">
              Los símbolos son el idioma del Tarot. No se trata de adivinar, sino de conectar.
            </p>

            <Lens
              title="1. Identifica el símbolo"
              text="Elige el elemento de la carta que más llamó tu atención: persona, objeto, animal, color, número, paisaje o cualquier elemento visual."
            />
            <Field
              label="Símbolo elegido..."
              rows={2}
              value={answers.simbolo}
              onChange={set("simbolo")}
            />

            <Lens
              title="2. ¿Qué significa para ti?"
              text="Antes de consultar la guía, ¿qué representa este símbolo para ti?"
            />
            <Field
              label="Para mí representa..."
              rows={3}
              value={answers.simboloSignifica}
              onChange={set("simboloSignifica")}
            />

            <Lens
              title="3. Conéctalo contigo"
              text="¿Cómo podría relacionarse este símbolo con una situación de tu vida? (opcional)"
            />
            <Field
              label="Se relaciona con..."
              rows={3}
              value={answers.simboloVida}
              onChange={set("simboloVida")}
            />

            <Lens
              title="4. Tradúcelo en un mensaje"
              text="Convierte esa comprensión en una frase clara y útil."
            />
            <Field
              label="El mensaje que recibo es..."
              rows={3}
              value={answers.simboloMensaje}
              onChange={set("simboloMensaje")}
            />

            <Note>El símbolo da la pista. Tu intuición forma el mensaje.</Note>
          </section>
        ) : null}

        {step === 6 ? (
          <section className="surface space-y-4 p-5">
            <h2 className="font-display text-2xl text-primary">6. Luz, sombra y consejo</h2>
            <p className="text-sm text-muted-foreground">
              Antes de ver los datos reales de la carta, intenta interpretarlos intuitivamente.
            </p>

            <Lens title="Luz ☀️" text="El potencial, lo positivo, lo que favorece." />
            <Hints
              items={[
                "¿Qué fortalezas muestra esta carta?",
                "¿Qué recursos tienes disponibles?",
                "¿Qué se está abriendo o creciendo?",
                "¿Qué puedes aprovechar ahora?",
              ]}
            />
            <Field
              label="Para mí, la luz de esta carta es..."
              rows={3}
              value={answers.luz}
              onChange={set("luz")}
            />

            <Lens title="Sombra 🌑" text="El desafío, lo oculto, lo que pide atención." />
            <Hints
              items={[
                "¿Qué bloqueos o miedos aparecen?",
                "¿Qué podría no estar viendo?",
                "¿Qué lección invita a aprender?",
                "¿Qué podría salir mal si ignoras esta señal?",
              ]}
            />
            <Field
              label="Para mí, la sombra de esta carta es..."
              rows={3}
              value={answers.sombra}
              onChange={set("sombra")}
            />

            <Lens title="Consejo ✨" text="La guía práctica, el próximo paso sabio." />
            <Hints
              items={[
                "¿Qué acción o actitud recomienda esta carta?",
                "¿Qué sería lo más sabio que puedes hacer ahora?",
                "¿Qué te acerca a tu bienestar?",
                "Si esta carta pudiera hablarte, ¿qué te diría?",
              ]}
            />
            <Field
              label="El consejo que siento es..."
              rows={3}
              value={answers.consejo}
              onChange={set("consejo")}
            />
          </section>
        ) : null}

        {inExercise ? (
          <div className="flex gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as typeof step)}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-primary"
              >
                Atrás
              </button>
            ) : null}
            <button
              onClick={() => setStep((s) => (s + 1) as typeof step)}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              {step === 6 ? "Comparar con la guía" : "Continuar"}
            </button>
          </div>
        ) : null}

        {step === 7 ? (
          <section className="space-y-5">
            <h2 className="font-display text-2xl text-primary">Compara tu interpretación</h2>

            <div className="mx-auto w-40">
              <CardFace card={card} size="lg" />
            </div>
            <p className="text-center font-display text-xl text-primary">{card.name}</p>

            <Section title="Tu lectura">
              <div className="space-y-3">
                <Summary label="Qué vi" value={answers.veo} />
                <Summary label="Qué sentí" value={answers.siento} />
                <Summary label="Qué estaba sucediendo" value={answers.sucede} />
                <Summary label="Energía dominante" value={answers.energia} />
                <Summary label="Mensaje inicial" value={answers.mensajeInicial} />
                <Summary label="Símbolo elegido" value={answers.simbolo} />
                <Summary label="Interpretación del símbolo" value={answers.simboloSignifica} />
                <Summary label="Relación con mi vida" value={answers.simboloVida} />
                <Summary label="Mensaje del símbolo" value={answers.simboloMensaje} />
                <Summary label="Luz" value={answers.luz} />
                <Summary label="Sombra" value={answers.sombra} />
                <Summary label="Consejo" value={answers.consejo} />
              </div>
            </Section>

            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">La guía de la carta</p>

            {card.general_meaning ? (
              <Section title="Significado general">
                <p className="text-sm leading-relaxed text-foreground/85">{card.general_meaning}</p>
              </Section>
            ) : null}

            {card.symbolism.length > 0 ? (
              <Section title="Simbolismo">
                <ul className="space-y-3">
                  {card.symbolism.map((item) => (
                    <li key={item.symbol} className="rounded-xl bg-secondary/50 p-3">
                      <p className="text-sm font-semibold text-primary">✦ {item.symbol}</p>
                      <p className="text-sm text-muted-foreground">{item.meaning}</p>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {card.light ? (
                <Section title="Luz ☀️">
                  <p className="text-sm text-foreground/85">{card.light}</p>
                </Section>
              ) : null}
              {card.shadow ? (
                <Section title="Sombra 🌑">
                  <p className="text-sm text-foreground/85">{card.shadow}</p>
                </Section>
              ) : null}
            </div>

            {card.impulse.length > 0 ? (
              <Section title="El impulso de la carta ✨">
                <ul className="space-y-2">
                  {card.impulse.map((item) => (
                    <li key={item.title} className="text-sm">
                      <span className="font-semibold text-primary">{item.title}: </span>
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <Section title="¿Qué descubriste?">
              <Hints
                items={[
                  "¿Qué coincidió con tu primera impresión?",
                  "¿Qué símbolo ahora comprendes mejor?",
                  "¿Qué detalle no habías observado?",
                  "¿Qué mensaje te gustaría recordar de esta carta?",
                ]}
              />
              <div className="mt-3 space-y-2">
                <Note>
                  Interpretar no es adivinar. Es conectar lo que ves con tu intuición y tu realidad.
                </Note>
                <Note>
                  No necesitas memorizarlo todo. La práctica te dará seguridad y la intuición
                  profundidad.
                </Note>
              </div>
            </Section>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(6)}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-primary"
              >
                Atrás
              </button>
              <button
                onClick={otherCard}
                className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
              >
                Practicar con otra carta
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
