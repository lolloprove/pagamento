"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Loader2, Lock, Mail, Pencil, ShieldCheck, User, Zap } from "lucide-react";
import { EVENT } from "@/lib/event";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

const INITIAL_STATE: FormState = { firstName: "", lastName: "", email: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const inputClasses =
  "w-full border border-white/10 bg-black/35 py-4 pl-11 pr-4 font-mono text-sm text-white placeholder:text-white/25 outline-none transition focus:border-neon-violet focus:bg-neon-violet/5 focus:ring-2 focus:ring-neon-violet/20 disabled:opacity-50";

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [step, setStep] = useState<"dati" | "pagamento">("dati");
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // I callback di PayPal possono essere invocati dall'SDK con closure vecchie:
  // leggiamo i dati correnti del form da una ref, aggiornata a ogni modifica.
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Nome e cognome sono obbligatori.");
      return;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    setStep("pagamento");
  }

  async function createOrder(): Promise<string> {
    setError(null);
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formRef.current),
    });
    const data: { orderID?: string; error?: string } = await res.json();
    if (!res.ok || !data.orderID) {
      throw new Error(data.error ?? "Errore nella creazione dell'ordine PayPal.");
    }
    return data.orderID;
  }

  async function onApprove(data: { orderID: string }): Promise<void> {
    setCapturing(true);
    setError(null);
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID, ...formRef.current }),
      });
      const payload: { redirectUrl?: string; error?: string } = await res.json();
      if (!res.ok || !payload.redirectUrl) {
        throw new Error(payload.error ?? "Errore nella conferma del pagamento.");
      }
      window.location.href = payload.redirectUrl;
    } catch (err) {
      setCapturing(false);
      setError(err instanceof Error ? err.message : "Errore nella conferma del pagamento.");
    }
  }

  return (
    <div className="cyber-frame neon-card relative overflow-hidden p-6 shadow-2xl shadow-neon-violet/20 backdrop-blur-md sm:p-9">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-56 rounded-full bg-neon-violet/15 blur-3xl"
      />
      <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-green">
          <span className="size-1.5 rounded-full bg-neon-green shadow-[0_0_10px_#39ff14] animate-pulse" />
          Checkout online
        </div>
        <span className="font-mono text-[10px] text-white/25">
          STEP {step === "dati" ? "01" : "02"} / 02
        </span>
      </div>

      <h3 className="relative mt-7 font-display text-2xl font-black uppercase leading-none text-white">
        Blocca il tuo <span className="text-gradient">accesso</span>
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/55">
        Compila i dati, paga {EVENT.priceLabel} con PayPal e ricevi subito il pass con l&apos;indirizzo.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              disabled={step === "pagamento"}
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
              disabled={step === "pagamento"}
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
            placeholder="Email (per la conferma)"
            value={form.email}
            onChange={update("email")}
            disabled={step === "pagamento"}
            className={inputClasses}
          />
        </label>

        {error && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {step === "dati" && (
          <button
            type="submit"
            className="neon-button flex w-full items-center justify-center gap-2 bg-linear-to-r from-neon-pink to-neon-violet px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-neon-violet/50 transition hover:-translate-y-0.5 hover:shadow-neon-pink/40"
          >
            <Zap className="size-4" />
            Acquista Prevendita — {EVENT.priceLabel}
          </button>
        )}
      </form>

      {step === "pagamento" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-neon-green" />
              Completa il pagamento con PayPal
            </span>
            <button
              type="button"
              onClick={() => setStep("dati")}
              disabled={capturing}
              className="flex items-center gap-1 text-white/50 underline-offset-2 transition hover:text-white hover:underline disabled:opacity-50"
            >
              <Pencil className="size-3.5" />
              Modifica dati
            </button>
          </div>

          {capturing && (
            <p className="flex items-center justify-center gap-2 rounded-xl border border-neon-green/30 bg-neon-green/10 px-4 py-3 text-sm text-neon-green">
              <Loader2 className="size-4 animate-spin" />
              Confermiamo il pagamento e registriamo la tua prevendita…
            </p>
          )}

          {PAYPAL_CLIENT_ID ? (
            <div className="border border-white/10 bg-white/95 p-4 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
              <PayPalScriptProvider
                options={{
                  clientId: PAYPAL_CLIENT_ID,
                  currency: "EUR",
                  intent: "capture",
                  components: "buttons",
                  locale: "it_IT",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", shape: "pill", label: "pay", height: 48 }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={(err) =>
                    setError(err instanceof Error ? err.message : "Errore PayPal. Riprova.")
                  }
                  onCancel={() => setError("Pagamento annullato: la tua prevendita non è ancora registrata.")}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              PayPal non configurato: imposta NEXT_PUBLIC_PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET in
              .env.local per abilitare i pagamenti.
            </p>
          )}
        </div>
      )}

      <p className="mt-5 flex items-center justify-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-white/35">
        <Lock className="size-3.5" />
        Pagamento sicuro gestito da PayPal — nessun dato della carta passa da noi
      </p>
    </div>
  );
}
