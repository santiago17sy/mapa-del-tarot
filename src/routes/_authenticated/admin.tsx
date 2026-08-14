import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SectionTitle } from "@/components/AppShell";
import { profileQuery } from "@/lib/tarot";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Usuarios — Mapa del Tarot" },
      { name: "description", content: "Panel administrativo para activar o desactivar el acceso de usuarios." },
      { property: "og:title", content: "Panel administrativo" },
      { property: "og:description", content: "Gestiona el acceso de tus clientes." },
    ],
  }),
  component: AdminPage,
});

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
  access_active: boolean;
  created_at: string;
};

function AdminPage() {
  const { data: profile } = useQuery(profileQuery);
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    enabled: profile?.role === "admin",
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, role, access_active, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const toggle = useMutation({
    mutationFn: async ({ id, next }: { id: string; next: boolean }) => {
      const { error } = await supabase.from("profiles").update({ access_active: next }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  if (profile && profile.role !== "admin") {
    return <p className="surface p-6 text-sm text-muted-foreground">Esta sección es solo para administradores.</p>;
  }

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Administración">Usuarios</SectionTitle>
      <p className="text-sm text-muted-foreground">
        Activa el acceso después de confirmar el pago por WhatsApp o Yape.
      </p>

      <div className="space-y-3">
        {(usersQuery.data ?? []).map((row) => (
          <div key={row.id} className="surface space-y-2 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg text-primary">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.email}</p>
                <p className="text-xs text-muted-foreground">
                  Registro: {new Date(row.created_at).toLocaleDateString("es-PE")}
                </p>
              </div>
              <span className="text-xs">{row.access_active ? "🟢 Activo" : "🔴 Sin acceso"}</span>
            </div>
            <button
              onClick={() => toggle.mutate({ id: row.id, next: !row.access_active })}
              className={`w-full rounded-xl py-2.5 text-sm font-semibold ${
                row.access_active
                  ? "border border-input text-primary"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {row.access_active ? "Desactivar acceso" : "Activar acceso"}
            </button>
          </div>
        ))}
        {usersQuery.data?.length === 0 ? (
          <p className="surface p-6 text-sm text-muted-foreground">Todavía no hay usuarios registrados.</p>
        ) : null}
      </div>
    </div>
  );
}
