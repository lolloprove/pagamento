"use client";

import { FormEvent, useState } from "react";
import { AtSign, Loader2, Lock, Mail, PartyPopper, User } from "lucide-react";
import { EVENT } from "@/lib/event";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  instagram: string;
}

const INITIAL_STATE: FormState = { firstName: "", lastName: "", email: "", instagram: "" };

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-night-900/80 py-3 pl-11 pr-4 text-white placeholder:text-white/30 outline-none transition focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/40";

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Qualcosa è andato storto. Riprova.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Qualcosa è andato storto. Riprova.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-night-800/70 p-6 shadow-2xl shadow-neon-purple/10 backdrop-blur sm:p-8"
    >
      <h3 className="font-display text-xl font-bold uppercase text-white">Prenota il tuo posto</h3>
      <p className="mt-1 text-sm text-white/60">
        Compila i dati, paga {EVENT.priceLabel} e ricevi subito il pass con l&apos;indirizzo.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="relative block">
            <span className="sr-only">Nome</span>
            <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              required
              autoComplete="given-name"
              placeholder="Nome"
              value={form.firstName}
              onChange={update("firstName")}
              className={inputClasses}
            />
          </label>
          <label className="relative block">
            <span className="sr-only">Cognome</span>
            <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              required
              autoComplete="family-name"
              placeholder="Cognome"
              value={form.lastName}
              onChange={update("lastName")}
              className={inputClasses}
            />
          </label>
        </div>

        <label className="relative block">
          <span className="sr-only">Email</span>
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Email (per la ricevuta)"
            value={form.email}
            onChange={update("email")}
            className={inputClasses}
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Account Instagram (opzionale)</span>
          <AtSign className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            autoComplete="off"
            placeholder="Instagram (opzionale, es. @luca.party)"
            value={form.instagram}
            onChange={update("instagram")}
            className={inputClasses}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-neon-fuchsia to-neon-purple px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-neon-purple/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Ti stiamo portando alla cassa…
          </>
        ) : (
          <>
            <PartyPopper className="size-4" />
            Paga {EVENT.priceLabel} e assicurati il posto
          </>
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/40">
        <Lock className="size-3.5" />
        Pagamento sicuro gestito da Stripe — nessun dato della carta passa da noi
      </p>
    </form>
  );
}
