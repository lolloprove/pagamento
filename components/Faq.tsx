import { ArrowDown } from "lucide-react";

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
    a: "Le porte restano aperte dalle 23:00 all'01:30. Dopo, si entra solo se Luca è di buon umore (spoiler: non lo è mai dopo l'una).",
  },
] as const;

export default function Faq() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="section-kicker font-mono text-[10px] uppercase tracking-[0.25em] text-neon-violet">
          03 // Prima di entrare
        </p>
        <h2 className="mt-4 font-display text-4xl font-black uppercase text-white glow-text">
          Zero dubbi. <span className="outline-text">Solo bassi.</span>
        </h2>
      </div>
      <div className="mt-8 space-y-3">
        {FAQS.map(({ q, a }, index) => (
          <details
            key={q}
            className="group border-b border-white/10 bg-black/15 backdrop-blur-md transition open:border-neon-violet/50 open:bg-neon-violet/5"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-3 py-5 font-semibold text-white marker:hidden">
              <span className="font-mono text-[10px] text-neon-green/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">{q}</span>
              <ArrowDown className="size-4 text-white/35 transition duration-300 group-open:rotate-180 group-open:text-neon-pink" />
            </summary>
            <p className="max-w-2xl px-12 pb-5 text-sm leading-relaxed text-white/60">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
