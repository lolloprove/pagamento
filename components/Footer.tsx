import { AtSign, PartyPopper } from "lucide-react";
import { EVENT } from "@/lib/event";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
        <div className="flex items-center gap-2">
          <PartyPopper className="size-4 text-neon-fuchsia" />
          <span>{EVENT.name} · {EVENT.dateLabel}</span>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition hover:text-white"
        >
          <AtSign className="size-4" />
          luca.party su Instagram
        </a>
        <span>Evento privato su invito · Bevi responsabilmente</span>
      </div>
    </footer>
  );
}
