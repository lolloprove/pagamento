export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
          Private event // Milano 2026
        </span>
        <span className="text-xs text-white/40">
          Sito creato da <span className="font-semibold text-white/70">lolloprove</span>
        </span>
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neon-green/50">
          <span className="size-1.5 rounded-full bg-neon-green shadow-[0_0_8px_#39ff14]" />
          System online
        </span>
      </div>
    </footer>
  );
}
