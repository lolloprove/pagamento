"use client";

import { QRCodeSVG } from "qrcode.react";
import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { EVENT } from "@/lib/event";

interface TicketProps {
  codice: string;
  nome: string;
  email: string;
  qrValue: string;
  /** Indirizzo esatto, passato dal server SOLO dopo la verifica del pagamento. */
  secretAddress: string;
}

export default function Ticket({ codice, nome, email, qrValue, secretAddress }: TicketProps) {
  return (
    <div className="cyber-frame neon-card mx-auto w-full max-w-md overflow-hidden shadow-2xl shadow-neon-violet/25 backdrop-blur-md">
      {/* Testata del pass */}
      <div className="bg-linear-to-r from-neon-pink via-neon-violet to-neon-green p-[1px]">
        <div className="flex items-center justify-between bg-night-900 px-6 py-5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-neon-green">
              Prevendita Ufficiale #{codice}
            </div>
            <div className="font-display text-lg font-black uppercase text-white glow-text">
              {EVENT.name}
            </div>
          </div>
          <div className="flex size-10 items-center justify-center border border-neon-pink/30 bg-neon-pink/10">
            <Sparkles className="size-5 text-neon-pink" />
          </div>
        </div>
      </div>

      <div className="space-y-5 px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
              Intestata a
            </div>
            <div className="text-lg font-semibold text-white">{nome}</div>
            <div className="text-sm text-white/60">{email}</div>
          </div>
          <div className="border-4 border-neon-green/20 bg-white p-3 shadow-[0_0_28px_rgba(57,255,20,0.15)]">
            <QRCodeSVG value={qrValue} size={112} marginSize={0} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-white/80">
            <CalendarDays className="size-4 shrink-0 text-neon-violet" />
            {EVENT.dateLabel}
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="size-4 shrink-0 text-neon-green" />
            {EVENT.timeLabel}
          </div>
        </div>

        {/* Indirizzo sbloccato */}
        <div className="cyber-frame border border-neon-green/30 bg-neon-green/10 p-4">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neon-green">
            <MapPin className="size-4" />
            Indirizzo sbloccato
          </div>
          <p className="mt-2 font-semibold leading-relaxed text-white">{secretAddress}</p>
        </div>
      </div>

      {/* Strappo + codice prevendita */}
      <div className="ticket-divider h-px w-full" />
      <div className="flex items-center justify-between bg-night-900/60 px-6 py-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          Codice prevendita
        </span>
        <span className="font-mono text-sm font-bold tracking-wider text-neon-green">#{codice}</span>
      </div>
    </div>
  );
}
