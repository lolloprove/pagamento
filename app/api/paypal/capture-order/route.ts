import { NextRequest, NextResponse } from "next/server";
import { captureOrder, isOrderPaid } from "@/lib/paypal";
import { salvaPrevendita } from "@/lib/supabase";

interface CaptureOrderBody {
  orderID?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export async function POST(request: NextRequest) {
  let body: CaptureOrderBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const orderID = body.orderID?.trim() ?? "";
  if (!orderID) {
    return NextResponse.json({ error: "orderID mancante." }, { status: 400 });
  }

  try {
    const order = await captureOrder(orderID);

    if (!isOrderPaid(order)) {
      return NextResponse.json(
        { error: "Il pagamento non risulta completato. Nessuna prevendita registrata." },
        { status: 402 }
      );
    }

    // Dati anagrafici dal form, con fallback sul payer PayPal.
    const nome =
      [body.firstName?.trim(), body.lastName?.trim()].filter(Boolean).join(" ") ||
      [order.payer?.name?.given_name, order.payer?.name?.surname].filter(Boolean).join(" ") ||
      "Ospite del festino";
    const email = body.email?.trim().toLowerCase() || order.payer?.email_address || "";

    const prevendita = await salvaPrevendita({
      nome,
      email,
      paypalOrderId: order.id,
    });

    // Il client usa questo id per il redirect a /success?id=<id>.
    return NextResponse.json({
      id: prevendita.id,
      status: prevendita.status,
      redirectUrl: `/success?id=${prevendita.id}`,
    });
  } catch (err) {
    console.error("Errore cattura ordine PayPal:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Errore nella cattura del pagamento." },
      { status: 502 }
    );
  }
}
