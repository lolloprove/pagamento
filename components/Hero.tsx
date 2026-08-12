import { MapPin, Sparkles, Zap } from "lucide-react";
import { EVENT } from "@/lib/event";
import Countdown from "@/components/Countdown";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 text-center sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-130 w-full max-w-4xl -translate-x-1/2 rounded-full bg-neon-violet/20 blur-3xl animate-pulse-glow"
      />

      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-neon-green/40 bg-neon-green/10 px-4 py-1.5 text-sm font-semibold text-neon-green backdrop-blur-md">
        <Zap className="size-4" />
        <span>Prevendite limitate disponibili</span>
      </div>

      <h1 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
        <span className="block text-2xl text-neon-pink glow-text animate-flicker sm:text-3xl lg:text-4xl">
          Prevendita
        </span>
        <span className="glow-text">Festino a casa </span>
        <span className="text-gradient">di Luca</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{EVENT.tagline}</p>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
        <MapPin className="size-4 text-neon-green" />
        <span>
          {EVENT.zoneHint} — l&apos;indirizzo esatto si sblocca <strong className="text-white">dopo l&apos;acquisto</strong>
        </span>
      </div>

      <Countdown targetISO={EVENT.dateISO} />

      <a
        href="#prenota"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-neon-pink to-neon-violet px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-neon-violet/50 transition hover:scale-105 hover:shadow-neon-pink/60"
      >
        <Sparkles className="size-4" />
        Acquista Prevendita — {EVENT.priceLabel}
      </a>
    </section>
  );
}
