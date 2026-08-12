import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface Prevendita {
  id: string;
  nome: string;
  email: string;
  paypal_order_id: string;
  status: string;
  created_at: string;
}

let client: SupabaseClient | null = null;

/**
 * Client Supabase con service role key: SOLO lato server (modulo `server-only`).
 * La service role bypassa la RLS, quindi non deve mai raggiungere il browser.
 */
export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase non configurato: imposta SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY in .env.local."
    );
  }
  if (!client) {
    client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

/**
 * Registra una prevendita pagata. Idempotente su `paypal_order_id`:
 * se l'ordine è già stato salvato restituisce la riga esistente.
 */
export async function salvaPrevendita(params: {
  nome: string;
  email: string;
  paypalOrderId: string;
}): Promise<Prevendita> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("prevendite")
    .insert({
      nome: params.nome,
      email: params.email,
      paypal_order_id: params.paypalOrderId,
      status: "paid",
    })
    .select()
    .single();

  if (!error) return data as Prevendita;

  // 23505 = violazione del vincolo di unicità: la prevendita esiste già.
  if (error.code === "23505") {
    const { data: existing, error: selectError } = await supabase
      .from("prevendite")
      .select()
      .eq("paypal_order_id", params.paypalOrderId)
      .single();
    if (selectError) throw new Error(selectError.message);
    return existing as Prevendita;
  }

  throw new Error(error.message);
}

/** Recupera una prevendita per id (pagina /success). */
export async function getPrevendita(id: string): Promise<Prevendita | null> {
  const { data, error } = await getSupabase()
    .from("prevendite")
    .select()
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as Prevendita | null;
}

/** Lista completa dei paganti (rotta admin). */
export async function listaPrevendite(): Promise<Prevendita[]> {
  const { data, error } = await getSupabase()
    .from("prevendite")
    .select()
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Prevendita[];
}
