import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Istanza Stripe creata in modo lazy: evita crash in fase di build
 * quando `STRIPE_SECRET_KEY` non è ancora configurata.
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY non configurata. Copia .env.example in .env.local e inserisci le tue chiavi Stripe."
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}
