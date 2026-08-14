import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { profileQuery } from "@/lib/tarot";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { data: profile, isLoading } = useQuery(profileQuery);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Cargando tu mapa…
      </div>
    );
  }

  if (profile && !profile.access_active) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="surface max-w-sm space-y-4 p-7 text-center">
          <p className="font-display text-2xl text-primary">Tu acceso está pendiente</p>
          <p className="text-sm text-muted-foreground">
            Hola {profile.name} ✦ Tu cuenta fue creada, pero todavía no tiene acceso activo.
            Escríbenos para activarlo y comenzar a explorar las 78 cartas.
          </p>
          <button
            onClick={async () => {
              await queryClient.cancelQueries();
              queryClient.clear();
              await supabase.auth.signOut();
              navigate({ to: "/", replace: true });
            }}
            className="w-full rounded-xl border border-input py-2.5 text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
