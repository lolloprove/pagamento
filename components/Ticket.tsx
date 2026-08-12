"use client";

import { QRCodeSVG } from "qrcode.react";
import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { EVENT } from "@/lib/event";

interface TicketProps {
  ticketId: string;
  fullName: string;
  email: string;
  instagram?: string;
  qrValue: string;
  /** Indirizzo esatto, passato dal server SOLO dopo la verifica del pagamento. */
  secretAddress: string;
}

export default function Ticket({
  ticketId,
  fullName,
  email,
  instagram,
  qrValue,
  secretAddress,
}: TicketProps) {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-night-800 shadow-2xl shadow-neon-purple/20">
      {/* Testata del biglietto */}
      <div className="bg-linear-to-r from-neon-fuchsia via-neon-purple to-neon-cyan p-[1px]">
        <div className="flex items-center justify-between bg-night-900 px-6 py-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Pass ufficiale</div>
            <div className="font-display text-lg font-black uppercase text-white">{EVENT.name}</div>
          </div>
          <Sparkles className="size-6 text-neon-fuchsia" />
        </div>
      </div>

      <div className="space-y-5 px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Intestato a</div>
            <div className="text-lg font-semibold text-white">{fullName}</div>
            <div className="text-sm text-white/60">{email}</div>
            {instagram && <div className="text-sm text-neon-fuchsia">@{instagram}</div>}
          </div>
          <div className="rounded-2xl bg-white p-3">
            <QRCodeSVG value={qrValue} size={112} marginSize={0} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-white/80">
            <CalendarDays className="size-4 shrink-0 text-neon-purple" />
            {EVENT.dateLabel}
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="size-4 shrink-0 text-neon-cyan" />
            {EVENT.timeLabel}
          </div>
        </div>

        {/* Indirizzo sbloccato */}
        <div className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/10 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon-cyan">
            <MapPin className="size-4" />
            Indirizzo sbloccato
          </div>
          <p className="mt-2 font-semibold leading-relaxed text-white">{secretAddress}</p>
        </div>
      </div>

      {/* Strappo + codice biglietto */}
      <div className="ticket-divider h-px w-full" />
      <div className="flex items-center justify-between bg-night-900/60 px-6 py-4">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Codice biglietto</span>
        <span className="font-mono text-sm font-bold tracking-wider text-neon-amber">{ticketId}</span>
      </div>
    </div>
  );
}
