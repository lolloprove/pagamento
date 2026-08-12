import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { EVENT } from "@/lib/event";
import { getStripe } from "@/lib/stripe";

interface CheckoutBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  instagram?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const instagram = body.instagram?.trim().replace(/^@/, "") ?? "";

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Nome e cognome sono obbligatori." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Inserisci un indirizzo email valido." }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: EVENT.currency,
            unit_amount: EVENT.priceCents,
            product_data: {
              name: `${EVENT.name} — Ingresso`,
              description: `${EVENT.dateLabel} · ${EVENT.timeLabel} · ${EVENT.zoneHint}`,
            },
          },
        },
      ],
      metadata: {
        firstName,
        lastName,
        email,
        instagram,
        event: EVENT.name,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe non ha restituito un URL di pagamento." },
        { status: 502 }
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      console.error("Errore Stripe:", err.message);
      return NextResponse.json(
        { error: "Errore durante la creazione del pagamento. Riprova tra qualche istante." },
        { status: 502 }
      );
    }
    console.error("Errore checkout:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Errore interno." },
      { status: 500 }
    );
  }
}
