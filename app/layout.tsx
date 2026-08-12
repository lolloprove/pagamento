import type { Metadata } from "next";
import { Geist, Geist_Mono, Righteous } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { EVENT } from "@/lib/event";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `Prevendita ${EVENT.name} — ${EVENT.dateLabel}`,
  description: `${EVENT.name} · ${EVENT.dateLabel} · ${EVENT.timeLabel}. Prevendita ${EVENT.priceLabel}.`,
  openGraph: {
    title: `Prevendita ${EVENT.name}`,
    description: `${EVENT.dateLabel} · ${EVENT.timeLabel}`,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${righteous.variable} h-full antialiased`}
    >
      <body className="bg-party min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
