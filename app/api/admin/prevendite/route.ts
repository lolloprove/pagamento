import { NextRequest, NextResponse } from "next/server";
import { listaPrevendite } from "@/lib/supabase";

/**
 * Lista di tutti i paganti, protetta da chiave admin.
 * Uso: GET /api/admin/prevendite con header `Authorization: Bearer <ADMIN_API_KEY>`
 * (in alternativa `?key=<ADMIN_API_KEY>` per una rapida consultazione dal browser).
 */
export async function GET(request: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return NextResponse.json(
      { error: "ADMIN_API_KEY non configurata: rotta admin disabilitata." },
      { status: 503 }
    );
  }

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const queryKey = request.nextUrl.searchParams.get("key");
  if (bearer !== adminKey && queryKey !== adminKey) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  try {
    const prevendite = await listaPrevendite();
    return NextResponse.json({ count: prevendite.length, prevendite });
  } catch (err) {
    console.error("Errore lista prevendite:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Errore nel recupero delle prevendite." },
      { status: 500 }
    );
  }
}
