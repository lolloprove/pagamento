"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { EVENT } from "@/lib/event";

export default function PurchaseModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-10 rounded-full border border-neon-pink bg-neon-pink px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_0_#9b321f] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_0_#9b321f] sm:px-14"
      >
        Acquista — {EVENT.priceLabel}
      </button>

      {open && (
        <div
          role="presentation"
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#120906]/90 p-4 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Acquista la prevendita"
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:border-neon-pink hover:text-neon-pink"
            >
              <X className="size-4" />
            </button>
            <BookingForm />
          </div>
        </div>
      )}
    </>
  );
}
