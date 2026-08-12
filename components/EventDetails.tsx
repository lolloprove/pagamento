import { CalendarDays, Clock, Euro, Lock, Music, GlassWater } from "lucide-react";
import { EVENT } from "@/lib/event";

const DETAILS = [
  {
    icon: CalendarDays,
    label: "Data",
    value: EVENT.dateLabel,
    accent: "text-neon-fuchsia",
  },
  {
    icon: Clock,
    label: "Ora",
    value: EVENT.timeLabel,
    accent: "text-neon-cyan",
  },
  {
    icon: Euro,
    label: "Prezzo",
    value: `${EVENT.priceLabel} a persona`,
    accent: "text-neon-amber",
  },
] as const;

export default function EventDetails() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {DETAILS.map(({ icon: Icon, label, value, accent }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20"
          >
            <Icon className={`size-6 ${accent}`} />
            <div className="mt-3 text-xs uppercase tracking-widest text-white/50">{label}</div>
            <div className="mt-1 font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Indirizzo segreto */}
      <div className="flex items-start gap-4 rounded-2xl border border-dashed border-neon-purple/40 bg-neon-purple/10 p-5">
        <Lock className="mt-0.5 size-6 shrink-0 text-neon-purple" />
        <div>
          <div className="font-semibold text-white">Indirizzo top secret</div>
          <p className="mt-1 text-sm text-white/70">
            Per ora ti basta sapere che siamo in {EVENT.zoneHint}. L&apos;indirizzo esatto (con
            citofono e piano) appare sul tuo pass digitale subito dopo il pagamento.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <Music className="size-5 shrink-0 text-neon-cyan" />
          DJ set fino all&apos;alba: house, reggaeton e classiconi da urlare
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <GlassWater className="size-5 shrink-0 text-neon-fuchsia" />
          Primo drink incluso nel biglietto, open snack tutta la notte
        </div>
      </div>
    </div>
  );
}
