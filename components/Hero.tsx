import { ArrowDownRight, Disc3, MapPin, Radio, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { EVENT } from "@/lib/event";
import Countdown from "@/components/Countdown";

function PartyAccessCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mr-0">
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-full bg-neon-violet/20 blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden
        className="vinyl absolute -right-14 -top-12 -z-10 hidden size-52 rounded-full animate-spin-slow sm:block"
      />

      <div className="cyber-frame neon-card relative overflow-hidden p-1 shadow-2xl shadow-neon-violet/30 animate-drift">
        <div className="relative overflow-hidden bg-black/85 p-6 sm:p-8">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 size-48 rounded-full bg-neon-pink/20 blur-3xl"
          />
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-neon-green">
              <Radio className="size-3.5 animate-pulse" />
              Access protocol // active
            </div>
            <span className="font-mono text-[10px] text-white/30">LCA_019</span>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-5 py-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Night session
              </p>
              <p className="mt-2 font-display text-3xl font-black uppercase leading-none text-white">
                One night.
                <br />
                <span className="text-neon-pink">No replay.</span>
              </p>
            </div>
            <div className="border-l border-white/10 pl-5 text-right">
              <span className="block font-display text-5xl font-black leading-none text-white">19</span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.3em] text-neon-green">
                SEP
              </span>
            </div>
          </div>

          <div className="space-y-3 border-y border-dashed border-white/15 py-5 font-mono text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-white/35">LOCATION</span>
              <span className="text-right text-white">MILANO // NAVIGLI</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-white/35">DOORS</span>
              <span className="text-neon-green">22:00 — LATE</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-white/35">ACCESS</span>
              <span className="text-neon-pink">PREVENDITA ONLY</span>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">Entry fee</p>
              <p className="font-display text-4xl font-black text-white">{EVENT.priceLabel}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neon-green">
              <ShieldCheck className="size-3.5" />
              Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-8 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-0 -z-10 h-130 w-full max-w-4xl -translate-x-1/2 rounded-full bg-neon-violet/15 blur-3xl animate-pulse-glow"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 pb-5">
        <a href="#" className="flex items-center gap-3" aria-label="Torna all'inizio">
          <span className="flex size-9 items-center justify-center bg-neon-pink font-display text-sm font-black text-black">
            L
          </span>
          <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-white/65">
            Luca&apos;s
            <br />
            private club
          </span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 sm:flex">
          <span>Milano // IT</span>
          <span>19.09.2026</span>
        </div>
        <a
          href="#prenota"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neon-green transition hover:text-white"
        >
          Get access <ArrowDownRight className="size-4" />
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-16 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-20">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-green/40 bg-neon-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-green backdrop-blur-md">
            <Zap className="size-3.5" />
            <span>Prevendite limitate disponibili</span>
          </div>

          <h1 className="mt-7 font-display text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl xl:text-[5.6rem]">
            <span className="outline-text block">Prevendita</span>
            <span className="glow-text mt-2 block text-white">Festino</span>
            <span className="mt-2 block text-gradient">a casa di Luca</span>
          </h1>

          <div className="mx-auto mt-7 flex max-w-xl items-start gap-4 border-l-2 border-neon-pink pl-4 text-left lg:mx-0">
            <Disc3 className="mt-0.5 size-5 shrink-0 text-neon-pink" />
            <div>
              <p className="text-lg font-medium text-white">{EVENT.tagline}</p>
              <p className="mt-1 text-sm text-white/45">Musica alta. Luci basse. Il resto non si racconta.</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/55 lg:justify-start">
            <MapPin className="size-4 text-neon-green" />
            <span>
              {EVENT.zoneHint} — coordinate complete{" "}
              <strong className="text-white">dopo l&apos;acquisto</strong>
            </span>
          </div>

          <Countdown targetISO={EVENT.dateISO} />

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#prenota"
              className="neon-button inline-flex items-center gap-2 bg-linear-to-r from-neon-pink to-neon-violet px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-neon-violet/50 transition hover:-translate-y-1 hover:shadow-neon-pink/60"
            >
              <Sparkles className="size-4" />
              Acquista Prevendita — {EVENT.priceLabel}
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Secure checkout // PayPal
            </span>
          </div>
        </div>

        <div className="hidden lg:block">
          <PartyAccessCard />
        </div>
      </div>
    </section>
  );
}
