import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Quando ricevo l'indirizzo?",
    a: "Subito dopo il pagamento: la pagina di conferma mostra la tua Prevendita Ufficiale con l'indirizzo esatto, il citofono e le istruzioni per entrare.",
  },
  {
    q: "Posso portare un +1?",
    a: "Ogni prevendita vale per una persona. Il tuo +1 deve comprare la sua (tanto costa solo 10€).",
  },
  {
    q: "Cosa succede se perdo il pass?",
    a: "Nessun dramma: la tua prevendita è registrata con nome ed email. Salva il link della pagina di conferma oppure scrivici e la recuperiamo dalla lista.",
  },
  {
    q: "La prevendita è rimborsabile?",
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
      <h2 className="flex items-center justify-center gap-2 font-display text-2xl font-bold uppercase text-white glow-text">
        <HelpCircle className="size-6 text-neon-green" />
        Domande frequenti
      </h2>
      <div className="mt-8 space-y-3">
        {FAQS.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition open:border-neon-violet/40"
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
