import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SectionTitle } from "@/components/AppShell";
import { cardsQuery, favoritesQuery, profileQuery, progressQuery } from "@/lib/tarot";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil — Mapa del Tarot" },
      { name: "description", content: "Tu cuenta, tu progreso y tus cartas favoritas." },
      { property: "og:title", content: "Mi perfil — Mapa del Tarot" },
      { property: "og:description", content: "Revisa tu progreso de aprendizaje del Tarot." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { data: profile } = useQuery(profileQuery);
  const { data: cards = [] } = useQuery(cardsQuery);
  const { data: progress = [] } = useQuery(progressQuery);
  const { data: favorites = [] } = useQuery(favoritesQuery);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Tu cuenta">👤 Mi perfil</SectionTitle>

      <div className="surface space-y-2 p-5 text-sm">
        <p className="font-display text-2xl text-primary">{profile?.name}</p>
        <p className="text-muted-foreground">{profile?.email}</p>
        <p className="text-muted-foreground">
          {profile?.role === "admin" ? "Administradora" : "Alumna"} ·{" "}
          {profile?.access_active ? "🟢 Acceso activo" : "🔴 Sin acceso"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Progreso</p>
          <p className="mt-1 text-sm text-primary">
            {progress.length} de {cards.length || 78} cartas exploradas
          </p>
        </div>
        <Link to="/favoritos" className="surface flex items-center justify-between p-5">
          <span className="text-sm font-semibold text-primary">❤️ Mis cartas favoritas</span>
          <span className="text-xs text-muted-foreground">{favorites.length}</span>
        </Link>
      </div>

      {profile?.role === "admin" ? (
        <Link
          to="/admin"
          className="block rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
        >
          Panel administrativo
        </Link>
      ) : null}

      <button onClick={signOut} className="w-full rounded-xl border border-input py-3 text-sm">
        Cerrar sesión
      </button>
    </div>
  );
}
