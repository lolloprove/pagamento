import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { EVENT } from "@/lib/event";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

export const metadata: Metadata = {
  title: `${EVENT.name} — ${EVENT.dateLabel}`,
  description: `${EVENT.tagline} Biglietti a ${EVENT.priceLabel}: prenota il tuo posto, l'indirizzo si sblocca dopo l'acquisto.`,
  openGraph: {
    title: EVENT.name,
    description: EVENT.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="bg-party min-h-full flex flex-col">{children}</body>
    </html>
  );
}
