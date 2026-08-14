import type { ReactNode } from "react";
import type { TarotCard } from "@/lib/tarot";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="surface space-y-3 p-5">
      <h2 className="font-display text-xl text-primary">{title}</h2>
      <div className="gold-rule w-16" />
      {children}
    </section>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/60 px-3 py-2">
      <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="text-sm text-primary">{value}</p>
    </div>
  );
}

export function CardDetailSections({ card }: { card: TarotCard }) {
  return (
    <div className="space-y-4">
      {card.tagline ? (
        <p className="font-display text-lg italic leading-snug text-primary/90">“{card.tagline}”</p>
      ) : null}

      {card.general_meaning ? (
        <Section title="Significado general">
          <p className="text-sm leading-relaxed text-foreground/85">{card.general_meaning}</p>
        </Section>
      ) : null}

      {card.assignments.length > 0 ? (
        <Section title="Elementos y asignaciones">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {card.assignments.map((item) => (
              <Chip key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
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

      {card.reversed_meaning ? (
        <Section title="Carta invertida ↕️">
          <p className="text-sm text-foreground/85">{card.reversed_meaning}</p>
        </Section>
      ) : null}

      {card.combinations.length > 0 ? (
        <Section title="Combinaciones">
          <ul className="space-y-2">
            {card.combinations.map((item) => (
              <li key={item.card} className="text-sm">
                <span className="font-semibold text-primary">{item.card}: </span>
                <span className="text-muted-foreground">{item.meaning}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {card.advice ? (
        <Section title="Consejo ✨">
          <p className="text-sm italic text-foreground/85">{card.advice}</p>
        </Section>
      ) : null}
    </div>
  );
}
