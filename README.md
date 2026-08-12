# 🎉 Festino a casa di Luca

Web app per la vendita dei biglietti di una festa privata, costruita con **Next.js (App Router)**, **Tailwind CSS** e **Stripe Checkout**. Dark mode di default, vibe nightlife.

## Funzionalità

- **Landing page** (`/`) — hero con countdown live, box dettagli (data, ora, prezzo 10€), form di prenotazione (nome, cognome, email, Instagram opzionale) e CTA "Paga 10€ e assicurati il posto". L'indirizzo esatto è **nascosto**: prima dell'acquisto si vede solo la zona.
- **Checkout Stripe** (`POST /api/checkout`) — crea una sessione Stripe Checkout da 10,00 € con i dati del form nei `metadata`.
- **Pagina di conferma** (`/success`) — verifica **lato server** che la sessione risulti pagata (`payment_status === "paid"`), poi genera un pass digitale con codice biglietto univoco, QR code (`qrcode.react`), indirizzo esatto e istruzioni per l'ingresso. Il pass è deterministico: ricaricando la pagina si ottiene lo stesso codice.
- Pagamento annullato → redirect a `/?canceled=1` con banner informativo.

### Sicurezza dell'indirizzo

L'indirizzo vive in `lib/secret.ts`, un modulo marcato con [`server-only`](https://www.npmjs.com/package/server-only): la build fallisce se viene importato da un client component, quindi non può finire nel bundle JavaScript del browser. Viene renderizzato solo dal server, e solo dopo la conferma di Stripe.

## Setup

1. Installa le dipendenze:

```bash
npm install
```

2. Configura le variabili d'ambiente:

```bash
cp .env.example .env.local
```

| Variabile | Obbligatoria | Descrizione |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | ✅ | Chiave segreta Stripe (`sk_test_...` in sviluppo) |
| `NEXT_PUBLIC_APP_URL` | ⚪ | URL pubblico dell'app, fallback per i redirect di Stripe |
| `PARTY_SECRET_ADDRESS` | ⚪ | Indirizzo esatto della festa, mostrato solo dopo il pagamento |

3. Avvia il dev server:

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

### Testare il pagamento

In modalità test usa la carta `4242 4242 4242 4242`, una scadenza futura qualsiasi e un CVC a piacere.

## Struttura del progetto

```
app/
  layout.tsx            # Layout root: font, metadata, tema dark
  globals.css           # Tema Tailwind v4 (colori neon, animazioni)
  page.tsx              # Landing page
  success/page.tsx      # Conferma: verifica pagamento + pass digitale
  api/checkout/route.ts # Creazione sessione Stripe Checkout
components/
  Hero.tsx              # Hero section con countdown
  Countdown.tsx         # Countdown live (client)
  EventDetails.tsx      # Box dettagli + indirizzo "top secret"
  BookingForm.tsx       # Form di prenotazione (client)
  Ticket.tsx            # Pass digitale con QR code (client)
  Faq.tsx               # Domande frequenti
  Footer.tsx
lib/
  event.ts              # Config pubblica dell'evento
  secret.ts             # Indirizzo e istruzioni (server-only)
  stripe.ts             # Client Stripe lazy
  ticket.ts             # Generazione codice biglietto + payload QR
```

## Note

- Il codice biglietto (`FST-XXXX-XXXX-XXXX`) è derivato in modo deterministico dall'ID della sessione Stripe via SHA-256.
- Per la produzione valuta l'aggiunta di un webhook Stripe (`checkout.session.completed`) per salvare gli ospiti in un database e inviare email personalizzate.
