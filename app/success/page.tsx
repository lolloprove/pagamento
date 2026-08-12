import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Stripe from "stripe";
import { ArrowLeft, CheckCircle2, Info, PartyPopper, TriangleAlert } from "lucide-react";
import Ticket from "@/components/Ticket";
import Footer from "@/components/Footer";
import { getStripe } from "@/lib/stripe";
import { SECRET } from "@/lib/secret";
import { qrPayload, ticketIdFromSession } from "@/lib/ticket";

export const metadata: Metadata = {
  title: "Sei dentro! — Festino a casa di Luca",
  robots: { index: false },
};

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
      <TriangleAlert className="mx-auto size-10 text-amber-400" />
      <h1 className="mt-4 font-display text-xl font-bold uppercase text-white">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{message}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <ArrowLeft className="size-4" />
        Torna alla home
      </Link>
    </div>
  );
}

export default async function SuccessPage({ searchParams }: PageProps<"/success">) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId || typeof sessionId !== "string") {
    redirect("/");
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return (
      <main className="flex flex-1 items-center px-6 py-20">
        <ErrorState
          title="Pass non trovato"
          message="Non riusciamo a trovare questo pagamento. Controlla il link nella email di conferma di Stripe oppure riprova dalla home."
        />
      </main>
    );
  }

  // L'indirizzo viene rivelato SOLO se Stripe conferma il pagamento.
  if (session.payment_status !== "paid") {
    return (
      <main className="flex flex-1 items-center px-6 py-20">
        <ErrorState
          title="Pagamento non completato"
          message="Il pagamento risulta ancora in sospeso o annullato: l'indirizzo si sblocca solo a pagamento confermato. Riprova dalla home."
        />
      </main>
    );
  }

  const meta = session.metadata ?? {};
  const fullName =
    [meta.firstName, meta.lastName].filter(Boolean).join(" ") ||
    session.customer_details?.name ||
    "Ospite del festino";
  const email = meta.email || session.customer_details?.email || "";
  const instagram = meta.instagram || undefined;

  const ticketId = ticketIdFromSession(session.id);
  const qrValue = qrPayload({ ticketId, fullName, email });

  return (
    <>
      <main className="flex flex-1 flex-col items-center px-6 py-16">
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
          <CheckCircle2 className="size-4" />
          Pagamento confermato
        </div>

        <h1 className="mt-6 text-center font-display text-3xl font-black uppercase sm:text-4xl">
          Sei dentro, <span className="text-gradient">{fullName.split(" ")[0]}</span>!
          <PartyPopper className="ml-2 inline size-7 text-neon-amber" />
        </h1>
        <p className="mt-3 max-w-md text-center text-white/70">
          Ecco il tuo pass digitale: salvalo, fanne uno screenshot e presentalo all&apos;ingresso.
          Una ricevuta è in arrivo su {email ? <strong className="text-white">{email}</strong> : "la tua email"}.
        </p>

        <div className="mt-10 w-full">
          <Ticket
            ticketId={ticketId}
            fullName={fullName}
            email={email}
            instagram={instagram}
            qrValue={qrValue}
            secretAddress={SECRET.address}
          />
        </div>

        <section className="mt-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-white">
            <Info className="size-4 text-neon-cyan" />
            Istruzioni per l&apos;ingresso
          </h2>
          <ul className="mt-4 space-y-3">
            {SECRET.entryInstructions.map((instruction) => (
              <li key={instruction} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-purple" />
                {instruction}
              </li>
            ))}
          </ul>
        </section>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Torna alla home
        </Link>
      </main>
      <Footer />
    </>
  );
}
