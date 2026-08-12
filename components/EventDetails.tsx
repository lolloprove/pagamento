import { CalendarDays, Clock, Euro, Lock, Music, GlassWater } from "lucide-react";
import { EVENT } from "@/lib/event";

const DETAILS = [
  {
    icon: CalendarDays,
    label: "Data",
    value: EVENT.dateLabel,
    accent: "text-neon-pink",
  },
  {
    icon: Clock,
    label: "Ora",
    value: EVENT.timeLabel,
    accent: "text-neon-green",
  },
  {
    icon: Euro,
    label: "Prevendita",
    value: `${EVENT.priceLabel} a persona`,
    accent: "text-neon-violet",
  },
] as const;

export default function EventDetails() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {DETAILS.map(({ icon: Icon, label, value, accent }) => (
          <div key={label} className="neon-card p-5 backdrop-blur-md transition hover:brightness-125">
            <Icon className={`size-6 ${accent}`} />
            <div className="mt-3 text-xs uppercase tracking-widest text-white/50">{label}</div>
            <div className="mt-1 font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Indirizzo segreto */}
      <div className="flex items-start gap-4 rounded-3xl border border-dashed border-neon-violet/40 bg-neon-violet/10 p-5 backdrop-blur-md">
        <Lock className="mt-0.5 size-6 shrink-0 text-neon-violet" />
        <div>
          <div className="font-semibold text-white">Indirizzo top secret</div>
          <p className="mt-1 text-sm text-white/70">
            Per ora ti basta sapere che siamo in {EVENT.zoneHint}. L&apos;indirizzo esatto (con
            citofono e piano) appare sulla tua prevendita subito dopo il pagamento.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="neon-card flex items-center gap-3 p-4 text-sm text-white/70 backdrop-blur-md">
          <Music className="size-5 shrink-0 text-neon-green" />
          DJ set fino all&apos;alba: house, reggaeton e classiconi da urlare
        </div>
        <div className="neon-card flex items-center gap-3 p-4 text-sm text-white/70 backdrop-blur-md">
          <GlassWater className="size-5 shrink-0 text-neon-pink" />
          Primo drink incluso nella prevendita, open snack tutta la notte
        </div>
      </div>
    </div>
  );
}
