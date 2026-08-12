import { createHash } from "crypto";

/**
 * Genera un ID biglietto univoco e deterministico a partire dall'ID
 * della sessione Stripe Checkout: ricaricando la pagina di successo
 * l'utente vede sempre lo stesso pass.
 */
export function ticketIdFromSession(sessionId: string): string {
  const digest = createHash("sha256").update(sessionId).digest("hex").toUpperCase();
  return `FST-${digest.slice(0, 4)}-${digest.slice(4, 8)}-${digest.slice(8, 12)}`;
}

/** Payload codificato nel QR code, verificabile all'ingresso. */
export function qrPayload(params: { ticketId: string; fullName: string; email: string }): string {
  return JSON.stringify({
    event: "festino-a-casa-di-luca",
    ticketId: params.ticketId,
    name: params.fullName,
    email: params.email,
  });
}
