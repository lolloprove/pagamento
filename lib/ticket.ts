/**
 * Codice breve leggibile della prevendita, derivato dall'UUID della riga
 * su Supabase (primo blocco, 8 caratteri): es. "A1B2C3D4".
 */
export function codicePrevendita(prevenditaId: string): string {
  return prevenditaId.split("-")[0].toUpperCase();
}

/** Payload codificato nel QR code, verificabile all'ingresso. */
export function qrPayload(params: {
  prevenditaId: string;
  codice: string;
  nome: string;
  email: string;
}): string {
  return JSON.stringify({
    event: "festino-a-casa-di-luca",
    prevenditaId: params.prevenditaId,
    codice: params.codice,
    nome: params.nome,
    email: params.email,
  });
}
