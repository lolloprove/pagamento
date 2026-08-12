import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Info, PartyPopper, TriangleAlert } from "lucide-react";
import Ticket from "@/components/Ticket";
import { SECRET } from "@/lib/secret";
import { getPrevendita, type Prevendita } from "@/lib/supabase";
import { codicePrevendita, qrPayload } from "@/lib/ticket";

export const metadata: Metadata = {
  title: "Sei dentro! — Prevendita Festino a casa di Luca",
  robots: { index: false },
};

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="neon-card mx-auto w-full max-w-md p-8 text-center backdrop-blur-md">
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
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    redirect("/");
  }

  let prevendita: Prevendita | null;
  try {
    prevendita = await getPrevendita(id);
  } catch (err) {
    console.error("Errore recupero prevendita:", err);
    return (
      <main className="flex flex-1 items-center px-6 py-20">
        <ErrorState
          title="Qualcosa è andato storto"
          message="Non riusciamo a recuperare la tua prevendita in questo momento. Riprova tra qualche istante: il pagamento è comunque registrato."
        />
      </main>
    );
  }

  if (!prevendita) {
    return (
      <main className="flex flex-1 items-center px-6 py-20">
        <ErrorState
          title="Prevendita non trovata"
          message="Non troviamo nessuna prevendita con questo codice. Controlla il link oppure riprova l'acquisto dalla home."
        />
      </main>
    );
  }

  // L'indirizzo viene rivelato SOLO se la prevendita risulta pagata.
  if (prevendita.status !== "paid") {
    return (
      <main className="flex flex-1 items-center px-6 py-20">
        <ErrorState
          title="Pagamento non completato"
          message="Questa prevendita non risulta ancora pagata: l'indirizzo si sblocca solo a pagamento confermato. Riprova dalla home."
        />
      </main>
    );
  }

  const codice = codicePrevendita(prevendita.id);
  const qrValue = qrPayload({
    prevenditaId: prevendita.id,
    codice,
    nome: prevendita.nome,
    email: prevendita.email,
  });

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="flex items-center gap-2 rounded-full border border-neon-green/40 bg-neon-green/10 px-4 py-1.5 text-sm text-neon-green">
        <CheckCircle2 className="size-4" />
        Pagamento confermato — Prevendita Ufficiale #{codice}
      </div>

      <h1 className="mt-6 text-center font-display text-3xl font-black uppercase glow-text sm:text-4xl">
        Sei dentro, <span className="text-gradient">{prevendita.nome.split(" ")[0]}</span>!
        <PartyPopper className="ml-2 inline size-7 text-neon-pink" />
      </h1>
      <p className="mt-3 max-w-md text-center text-white/70">
        Ecco la tua Prevendita Ufficiale: salvala, fanne uno screenshot e presentala all&apos;ingresso.
        {prevendita.email && (
          <>
            {" "}
            È registrata a nome di <strong className="text-white">{prevendita.nome}</strong> (
            {prevendita.email}).
          </>
        )}
      </p>

      <div className="mt-10 w-full">
        <Ticket
          codice={codice}
          nome={prevendita.nome}
          email={prevendita.email}
          qrValue={qrValue}
          secretAddress={SECRET.address}
        />
      </div>

      <section className="neon-card mt-10 w-full max-w-md p-6 backdrop-blur-md">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-white">
          <Info className="size-4 text-neon-green" />
          Istruzioni per l&apos;ingresso
        </h2>
        <ul className="mt-4 space-y-3">
          {SECRET.entryInstructions.map((instruction) => (
            <li key={instruction} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-violet" />
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
  );
}
