# 🎉 Prevendita Festino a casa di Luca

Web app per la vendita delle prevendite di una festa privata, costruita con **Next.js (App Router)**, **Tailwind CSS**, **PayPal Checkout** e **Supabase**. Stile "Neon Nightclub / Cyberpunk", dark mode di default.

## Funzionalità

- **Landing page** (`/`) — hero con badge "Prevendite limitate disponibili", countdown live, box dettagli (data, ora, prezzo 10€), form (nome, cognome, email) e checkout PayPal integrato con CTA "Acquista Prevendita — 10€". L'indirizzo esatto è **nascosto**: prima dell'acquisto si vede solo la zona.
- **`POST /api/paypal/create-order`** — crea un ordine PayPal a importo fisso di 10,00 EUR.
- **`POST /api/paypal/capture-order`** — cattura il pagamento dopo l'approvazione dell'utente, verifica importo e valuta, salva `nome`, `email` e `paypal_order_id` nella tabella `prevendite` su Supabase (idempotente sull'ordine) e restituisce l'URL di redirect a `/success?id=<uuid>`.
- **Pagina di conferma** (`/success?id=...`) — carica la prevendita da Supabase, verifica `status = 'paid'` e mostra la **Prevendita Ufficiale #ID** con QR code (`qrcode.react`), indirizzo esatto e istruzioni per l'ingresso.
- **`GET /api/admin/prevendite`** — lista di tutti i paganti, protetta da `ADMIN_API_KEY` (header `Authorization: Bearer <chiave>` o query `?key=<chiave>`).
- Footer globale su tutte le pagine: "Sito creato da lolloprove".

### Sicurezza

- L'indirizzo vive in `lib/secret.ts` marcato [`server-only`](https://www.npmjs.com/package/server-only): non può finire nel bundle JavaScript del browser e viene renderizzato solo dopo la verifica del pagamento.
- Anche `lib/paypal.ts` (secret PayPal) e `lib/supabase.ts` (service role key) sono `server-only`.
- La cattura verifica su PayPal che l'ordine sia `COMPLETED` e che l'importo sia esattamente 10,00 EUR prima di registrare la prevendita.

## Setup

1. Installa le dipendenze:

```bash
npm install
```

2. Crea la tabella su Supabase eseguendo [`supabase/schema.sql`](supabase/schema.sql) nel SQL Editor del progetto.

3. Configura le variabili d'ambiente:

```bash
cp .env.example .env.local
```

| Variabile | Obbligatoria | Descrizione |
| --- | --- | --- |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | ✅ | Client ID dell'app PayPal (usato anche dal browser) |
| `PAYPAL_CLIENT_SECRET` | ✅ | Secret dell'app PayPal (solo server) |
| `PAYPAL_ENV` | ⚪ | `sandbox` (default) o `live` |
| `SUPABASE_URL` | ✅ | URL del progetto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service role key (solo server) |
| `ADMIN_API_KEY` | ✅ | Chiave per la rotta admin |
| `PARTY_SECRET_ADDRESS` | ⚪ | Indirizzo esatto, mostrato solo dopo il pagamento |

4. Avvia il dev server:

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

### Testare il pagamento

Con `PAYPAL_ENV=sandbox` usa un account buyer sandbox (creabile nel [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/accounts)) per completare l'acquisto senza soldi veri.

### Consultare i paganti

```bash
curl -H "Authorization: Bearer $ADMIN_API_KEY" https://tuo-dominio/api/admin/prevendite
```

## Struttura del progetto

```
app/
  layout.tsx                      # Layout root: font, metadata, footer globale
  globals.css                     # Tema Tailwind v4 cyberpunk (neon viola/rosa/verde)
  page.tsx                        # Landing page
  success/page.tsx                # Conferma: prevendita da Supabase + pass con QR
  api/paypal/create-order/route.ts  # Creazione ordine PayPal (10 EUR)
  api/paypal/capture-order/route.ts # Cattura pagamento + salvataggio su Supabase
  api/admin/prevendite/route.ts     # Lista paganti protetta da ADMIN_API_KEY
components/
  Hero.tsx                        # Hero con badge prevendite e countdown
  Countdown.tsx                   # Countdown live (client)
  EventDetails.tsx                # Box dettagli + indirizzo "top secret"
  BookingForm.tsx                 # Form + PayPal Buttons (client)
  Ticket.tsx                      # Prevendita Ufficiale con QR code (client)
  Faq.tsx                         # Domande frequenti
  Footer.tsx                      # "Sito creato da lolloprove"
lib/
  event.ts                        # Config pubblica dell'evento
  secret.ts                       # Indirizzo e istruzioni (server-only)
  paypal.ts                       # API REST PayPal v2 (server-only)
  supabase.ts                     # Client Supabase service-role (server-only)
  ticket.ts                       # Codice prevendita + payload QR
supabase/
  schema.sql                      # Tabella `prevendite`
```

## Note

- Il codice prevendita mostrato sul pass (`#A1B2C3D4`) è il primo blocco dell'UUID della riga su Supabase.
- La cattura è idempotente: un doppio click o un retry non creano righe duplicate (vincolo di unicità su `paypal_order_id`).
