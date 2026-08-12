/**
 * Configurazione pubblica dell'evento, importabile anche da client component.
 * L'indirizzo esatto vive in `lib/secret.ts` (modulo server-only) e non
 * finisce mai nel bundle JavaScript inviato al browser.
 */
export const EVENT = {
  name: "Festino a casa di Luca",
  tagline: "Una notte. Una casa. Zero regole (quasi).",
  dateISO: "2026-08-13T23:00:00+02:00",
  dateLabel: "Giovedì 13 Agosto 2026",
  timeLabel: "Dalle 23:00 fino a tardi",
  priceCents: 1000,
  priceLabel: "10€",
  currency: "eur" as const,
  capacity: 80,
  /** Indicazione vaga mostrata a tutti prima dell'acquisto. */
  zoneHint: "Zona Navigli · Milano",
} as const;
