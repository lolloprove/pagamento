import "server-only";

/**
 * Dati riservati dell'evento: questo modulo può essere importato SOLO
 * da codice server (il pacchetto `server-only` fa fallire la build se
 * finisce in un client component). L'indirizzo viene mostrato
 * esclusivamente dopo la verifica del pagamento su Stripe.
 */
export const SECRET = {
  /** Indirizzo esatto di casa di Luca. Override via env `PARTY_SECRET_ADDRESS`. */
  address:
    process.env.PARTY_SECRET_ADDRESS ??
    "Via Lodovico il Moro 27, 20143 Milano (MI) — Citofono 8, 3° piano",
  entryInstructions: [
    "Mostra il QR code di questo pass all'ingresso (va bene anche uno screenshot).",
    "Porta un documento: il nome deve corrispondere a quello sul pass.",
    "Ingresso consentito dalle 22:00 alle 01:00, poi porte chiuse.",
    "Non condividere l'indirizzo: il pass è personale e non cedibile.",
    "Rispetta i vicini: niente schiamazzi in strada e nelle scale.",
  ],
} as const;
