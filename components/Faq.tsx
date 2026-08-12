import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Quando ricevo l'indirizzo?",
    a: "Subito dopo il pagamento: la pagina di conferma mostra il tuo pass digitale con l'indirizzo esatto, il citofono e le istruzioni per entrare.",
  },
  {
    q: "Posso portare un +1?",
    a: "Ogni biglietto vale per una persona. Il tuo +1 deve comprare il suo biglietto (tanto costa solo 10€).",
  },
  {
    q: "Cosa succede se perdo il pass?",
    a: "Nessun dramma: riapri il link della pagina di conferma che ricevi via email da Stripe e il pass viene rigenerato identico.",
  },
  {
    q: "Il biglietto è rimborsabile?",
    a: "No, ma è cedibile: scrivici su Instagram con i dati della persona che viene al posto tuo e aggiorniamo la lista.",
  },
  {
    q: "Fino a che ora si può entrare?",
    a: "Le porte restano aperte dalle 22:00 all'01:00. Dopo, si entra solo se Luca è di buon umore (spoiler: non lo è mai dopo l'una).",
  },
] as const;

export default function Faq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16">
      <h2 className="flex items-center justify-center gap-2 font-display text-2xl font-bold uppercase text-white">
        <HelpCircle className="size-6 text-neon-cyan" />
        Domande frequenti
      </h2>
      <div className="mt-8 space-y-3">
        {FAQS.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition open:border-neon-purple/40"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-white marker:hidden">
              {q}
            </summary>
            <p className="px-5 pb-4 text-sm leading-relaxed text-white/70">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
