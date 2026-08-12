import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import BookingForm from "@/components/BookingForm";
import Faq from "@/components/Faq";

const MARQUEE_ITEMS = ["DJ set live", "Open snack", "Primo drink incluso", "Terrazza", "Beer pong", "Karaoke alle 3"];

function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/5 py-3 backdrop-blur-md">
      <div className="flex w-max gap-8 animate-marquee">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap font-display text-xs font-bold uppercase tracking-widest text-white/60"
          >
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <MarqueeStrip />

      <section id="prenota" className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-white glow-text">I dettagli</h2>
          <p className="mt-1 mb-6 text-sm text-white/60">Tutto quello che ti serve sapere (quasi).</p>
          <EventDetails />
        </div>
        <BookingForm />
      </section>

      <Faq />
    </main>
  );
}
