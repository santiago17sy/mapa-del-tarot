import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa del Tarot — Aprende a leer el Tarot desde cero" },
      {
        name: "description",
        content:
          "Aprende a leer el Tarot paso a paso: explora las 78 cartas, haz tu primera tirada y entrena tu interpretación.",
      },
      { property: "og:title", content: "Mapa del Tarot" },
      {
        property: "og:description",
        content: "Aprende a leer el Tarot desde cero, paso a paso.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/inicio", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setMessage("No pudimos iniciar sesión. Revisa tu email y contraseña.");
        return;
      }
      navigate({ to: "/inicio", replace: true });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/inicio`,
      },
    });
    setLoading(false);
    if (error) {
      setMessage("No pudimos crear la cuenta. " + error.message);
      return;
    }
    setMessage("Cuenta creada. Si tu acceso aún no está activo, escríbenos para activarlo.");
    setMode("login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-4xl text-primary">Mapa del Tarot</p>
          <div className="gold-rule mx-auto my-4 w-24" />
          <p className="text-sm text-muted-foreground">
            Aprende a leer el Tarot desde cero, paso a paso.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="surface space-y-4 p-6">
          {mode === "signup" ? (
            <Field label="Nombre">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
              />
            </Field>
          ) : null}

          <Field label="Email">
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
            />
          </Field>

          <Field label="Contraseña">
            <input
              required
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
            />
          </Field>

          {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Un momento…" : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full text-center text-xs text-muted-foreground underline decoration-gold/60 underline-offset-4"
          >
            {mode === "login" ? "No tengo cuenta todavía" : "Ya tengo cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Acceso privado para clientes ✦
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
