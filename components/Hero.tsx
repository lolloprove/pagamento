import { ArrowDownRight, Asterisk, MapPin, Ticket, Volume2 } from "lucide-react";
import { EVENT } from "@/lib/event";
import Countdown from "@/components/Countdown";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-6 sm:px-8 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 -z-10 size-96 rounded-full bg-neon-pink/12 blur-3xl"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-neon-violet/25 pb-5">
        <a href="#" className="flex items-center gap-3" aria-label="Torna all'inizio">
          <span className="flex size-10 rotate-[-3deg] items-center justify-center bg-neon-pink font-display text-sm font-black text-white">
            L*
          </span>
          <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-neon-violet/75">
            Casa di Luca
            <br />
            Milano, IT
          </span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-violet/45 sm:flex">
          <span>Giovedì</span>
          <span>13.08.2026 — 23:00</span>
        </div>
        <a
          href="#prenota"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neon-green transition hover:text-neon-violet"
        >
          Prendi il pass <ArrowDownRight className="size-4" />
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-10 pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:pt-16">
        <div>
          <div className="inline-flex rotate-[-2deg] items-center gap-2 bg-neon-green px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-black">
            <Asterisk className="size-3.5" />
            Prevendite aperte — posti limitati
          </div>

          <h1 className="mt-8 font-display text-[15vw] font-black uppercase leading-[0.73] tracking-[-0.085em] text-neon-violet sm:text-8xl lg:text-[7.6rem] xl:text-[9.2rem]">
            <span className="block">Festino</span>
            <span className="ml-[7%] mt-5 block outline-text">a casa</span>
            <span className="mt-5 block text-neon-pink">di Luca.</span>
          </h1>

          <div className="mt-9 flex max-w-xl items-start gap-4 border-l-4 border-neon-pink pl-5">
            <Volume2 className="mt-0.5 size-5 shrink-0 text-neon-pink" />
            <div>
              <p className="text-lg font-semibold text-neon-violet">{EVENT.tagline}</p>
              <p className="mt-1 text-sm text-neon-violet/45">
                Domani sera. Musica alta, luci basse, telefoni in tasca.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-neon-violet/55">
            <MapPin className="size-4 text-neon-pink" />
            <span>
              {EVENT.zoneHint} — indirizzo completo{" "}
              <strong className="text-neon-violet">dopo l&apos;acquisto</strong>
            </span>
          </div>

          <Countdown targetISO={EVENT.dateISO} />

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#prenota"
              className="neon-button inline-flex items-center gap-2 bg-neon-pink px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-white shadow-[7px_7px_0_#d9ff43] transition hover:-translate-y-1"
            >
              <Ticket className="size-4" />
              Acquista Prevendita — {EVENT.priceLabel}
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-violet/35">
              Pagamento sicuro / PayPal
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md border border-neon-violet/30 bg-neon-violet p-7 text-black shadow-[14px_14px_0_#ff3b30] lg:mb-4 lg:mr-3">
          <div className="flex items-start justify-between border-b-2 border-black pb-5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              Una notte soltanto
            </span>
            <Asterisk className="size-6" />
          </div>
          <div className="relative py-5">
            <span className="block font-display text-[10rem] font-black leading-[0.8] tracking-[-0.1em]">
              13
            </span>
            <span className="absolute right-0 top-7 rotate-90 font-display text-2xl font-black uppercase tracking-[0.28em]">
              Agosto
            </span>
            <span className="absolute bottom-5 right-2 flex size-24 rotate-12 items-center justify-center rounded-full bg-neon-green font-display text-3xl font-black">
              10€
            </span>
          </div>
          <div className="grid grid-cols-2 border-t-2 border-black pt-5 font-mono text-xs font-bold uppercase">
            <div>
              Giovedì
              <br />
              Milano
            </div>
            <div className="text-right">
              Start 23:00
              <br />
              Fine: boh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
