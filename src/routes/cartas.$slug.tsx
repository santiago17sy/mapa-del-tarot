import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CardFace } from "@/components/CardFace";
import { CardDetailSections } from "@/components/CardDetailSections";
import { findCard } from "@/lib/tarot";

export const Route = createFileRoute("/cartas/$slug")({
  head: () => ({
    meta: [
      { title: "Ficha de la carta — Mapa del Tarot" },
      {
        name: "description",
        content: "Significado general, simbolismo, luz, sombra y consejo de la carta.",
      },
      { property: "og:title", content: "Ficha de la carta — Mapa del Tarot" },
      {
        property: "og:description",
        content: "Consulta el significado completo de cada carta del Tarot.",
      },
    ],
  }),
  component: CardDetailPage,
});

function CardDetailPage() {
  const { slug } = Route.useParams();
  const card = findCard(slug);

  if (!card) {
    return (
      <AppShell>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">No encontramos esta carta.</p>
          <Link to="/cartas" className="text-sm text-primary underline">
            Volver a las cartas
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-7">
        <Link
          to="/cartas"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden /> Todas las cartas
        </Link>

        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
          <div className="w-40 shrink-0">
            <CardFace card={card} size="lg" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl uppercase text-primary">
              {card.number ? `${card.number} — ` : ""}
              {card.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {card.suit ? `${card.category} · ${card.suit}` : card.category}
            </p>
          </div>
        </div>

        <CardDetailSections card={card} />
      </div>
    </AppShell>
  );
}
