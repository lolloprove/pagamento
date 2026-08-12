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
  "w-full border-b border-white/15 bg-transparent py-4 pl-9 pr-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-neon-pink disabled:opacity-50";

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
    <div className="neon-card relative overflow-hidden p-7 sm:p-10">
      <h3 className="pr-10 font-display text-4xl font-medium text-neon-violet">
        La tua prevendita
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/40">
        {EVENT.priceLabel} · pagamento tramite PayPal
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="relative block">
            <span className="sr-only">Nome</span>
            <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            <input
              id="firstName"
              name="firstName"
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
              id="lastName"
              name="lastName"
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
            id="email"
            name="email"
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
            className="flex w-full items-center justify-center gap-2 border border-neon-pink bg-neon-pink px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-neon-pink"
          >
            <Zap className="size-4" />
            Acquista Prevendita — {EVENT.priceLabel}
          </button>
        )}
      </form>

      {step === "pagamento" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-neon-pink" />
              Pagamento
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
            <div className="border border-white/10 bg-white/95 p-4">
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

      <p className="mt-6 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/25">
        <Lock className="size-3.5" />
        Pagamento sicuro gestito da PayPal — nessun dato della carta passa da noi
      </p>
    </div>
  );
}
