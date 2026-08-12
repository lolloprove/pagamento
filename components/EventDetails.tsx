import { CalendarDays, Clock, Euro, Lock, Music, GlassWater } from "lucide-react";
import { EVENT } from "@/lib/event";

const DETAILS = [
  {
    icon: CalendarDays,
    label: "Data",
    value: EVENT.dateLabel,
    accent: "text-neon-pink",
    span: "sm:col-span-2",
  },
  {
    icon: Clock,
    label: "Ora",
    value: EVENT.timeLabel,
    accent: "text-neon-green",
    span: "",
  },
  {
    icon: Euro,
    label: "Prevendita",
    value: `${EVENT.priceLabel} a persona`,
    accent: "text-neon-violet",
    span: "",
  },
] as const;

export default function EventDetails() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {DETAILS.map(({ icon: Icon, label, value, accent, span }) => (
          <div
            key={label}
            className={`neon-card group relative overflow-hidden p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:brightness-125 ${span}`}
          >
            <div
              aria-hidden
              className="absolute -right-7 -top-7 size-20 rounded-full bg-neon-violet/10 blur-2xl transition group-hover:bg-neon-pink/20"
            />
            <div className="flex items-start justify-between">
              <Icon className={`size-5 ${accent}`} />
              <span className="font-mono text-[9px] text-white/20">LCA_0{label.length}</span>
            </div>
            <div className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
              {label}
            </div>
            <div className="mt-1 font-display text-lg font-bold uppercase leading-tight text-white">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Indirizzo segreto */}
      <div className="cyber-frame flex items-start gap-4 border border-dashed border-neon-violet/50 bg-neon-violet/10 p-5 backdrop-blur-md">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neon-violet/30 bg-neon-violet/10">
          <Lock className="size-4 text-neon-violet" />
        </div>
        <div>
          <div className="font-display text-sm font-bold uppercase text-white">Coordinate criptate</div>
          <p className="mt-1 text-sm text-white/70">
            Per ora ti basta sapere che siamo in {EVENT.zoneHint}. L&apos;indirizzo esatto (con
            citofono e piano) appare sulla tua prevendita subito dopo il pagamento.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 border-l border-neon-green/40 bg-white/3 p-4 text-sm text-white/65 backdrop-blur-md">
          <Music className="size-5 shrink-0 text-neon-green" />
          DJ set fino all&apos;alba: house, reggaeton e classiconi da urlare
        </div>
        <div className="flex items-center gap-3 border-l border-neon-pink/40 bg-white/3 p-4 text-sm text-white/65 backdrop-blur-md">
          <GlassWater className="size-5 shrink-0 text-neon-pink" />
          Primo drink incluso nella prevendita, open snack tutta la notte
        </div>
      </div>
    </div>
  );
}
