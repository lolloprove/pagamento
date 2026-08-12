import "server-only";
import { EVENT } from "@/lib/event";

/**
 * Integrazione server-side con le API REST di PayPal (v2 Checkout Orders).
 * Env richieste: NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET.
 * PAYPAL_ENV: "sandbox" (default) oppure "live".
 */
const PAYPAL_BASE_URL =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export interface PayPalOrder {
  id: string;
  status: string;
  purchase_units?: Array<{
    amount?: { currency_code: string; value: string };
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
        amount?: { currency_code: string; value: string };
      }>;
    };
  }>;
  payer?: {
    email_address?: string;
    name?: { given_name?: string; surname?: string };
  };
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Credenziali PayPal mancanti: imposta NEXT_PUBLIC_PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET in .env.local."
    );
  }

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Autenticazione PayPal fallita (HTTP ${res.status}).`);
  }
  const data: { access_token: string } = await res.json();
  return data.access_token;
}

/** Crea un ordine PayPal a importo fisso di 10,00 EUR. */
export async function createOrder(params: { email: string; fullName: string }): Promise<PayPalOrder> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: (EVENT.priceCents / 100).toFixed(2),
          },
          description: `${EVENT.name} — ${EVENT.dateLabel}`,
          // custom_id max 127 caratteri: usiamo l'email dell'acquirente come riferimento.
          custom_id: params.email.slice(0, 127),
        },
      ],
    }),
    cache: "no-store",
  });

  const data: PayPalOrder & { message?: string } = await res.json();
  if (!res.ok) {
    throw new Error(data.message ?? `Creazione ordine PayPal fallita (HTTP ${res.status}).`);
  }
  return data;
}

/** Cattura il pagamento di un ordine approvato dall'utente. */
export async function captureOrder(orderId: string): Promise<PayPalOrder> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data: PayPalOrder & { message?: string; details?: Array<{ issue?: string }> } = await res.json();
  if (!res.ok) {
    // Se l'ordine è già stato catturato (es. doppio click), lo recuperiamo per restare idempotenti.
    if (data.details?.some((d) => d.issue === "ORDER_ALREADY_CAPTURED")) {
      return getOrder(orderId);
    }
    throw new Error(data.message ?? `Cattura del pagamento fallita (HTTP ${res.status}).`);
  }
  return data;
}

/** Recupera lo stato corrente di un ordine. */
export async function getOrder(orderId: string): Promise<PayPalOrder> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Recupero ordine PayPal fallito (HTTP ${res.status}).`);
  }
  return res.json();
}

/** Verifica che l'ordine catturato corrisponda al prezzo della prevendita. */
export function isOrderPaid(order: PayPalOrder): boolean {
  if (order.status !== "COMPLETED") return false;
  const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
  if (!capture || capture.status !== "COMPLETED") return false;
  const amount = capture.amount ?? order.purchase_units?.[0]?.amount;
  return (
    amount?.currency_code === "EUR" &&
    Number.parseFloat(amount.value) === EVENT.priceCents / 100
  );
}
