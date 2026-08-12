import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

interface CreateOrderBody {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: CreateOrderBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Nome e cognome sono obbligatori." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Inserisci un indirizzo email valido." }, { status: 400 });
  }

  try {
    const order = await createOrder({ email, fullName: `${firstName} ${lastName}` });
    return NextResponse.json({ orderID: order.id });
  } catch (err) {
    console.error("Errore creazione ordine PayPal:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Errore nella creazione dell'ordine PayPal." },
      { status: 502 }
    );
  }
}
