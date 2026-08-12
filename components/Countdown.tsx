"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetISO: string): TimeLeft | null {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export default function Countdown({ targetISO }: { targetISO: string }) {
  // `now` resta null fino al primo tick post-mount: il server e la prima
  // renderizzazione client mostrano "--", evitando mismatch di idratazione.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const raf = requestAnimationFrame(update);
    const timer = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  const mounted = now !== null;
  const timeLeft = mounted ? computeTimeLeft(targetISO) : null;

  const units = [
    { label: "Giorni", value: timeLeft?.days },
    { label: "Ore", value: timeLeft?.hours },
    { label: "Minuti", value: timeLeft?.minutes },
    { label: "Secondi", value: timeLeft?.seconds },
  ];

  if (mounted && timeLeft === null) {
    return (
      <p className="mt-10 font-display text-xl font-bold uppercase text-neon-pink glow-text">
        Il festino è iniziato!
      </p>
    );
  }

  return (
    <div className="mt-9 flex justify-center gap-2 sm:gap-3 lg:justify-start">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="cyber-frame w-18 border border-white/10 bg-black/35 px-2 py-3 backdrop-blur-md transition hover:border-neon-violet/50 sm:w-22"
        >
          <div className="font-display text-2xl font-black tabular-nums text-white sm:text-3xl">
            {value !== undefined ? String(value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-neon-green/70">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
