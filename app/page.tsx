import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import BookingForm from "@/components/BookingForm";
import Faq from "@/components/Faq";

const MARQUEE_ITEMS = ["DJ set live", "Open snack", "Primo drink incluso", "Terrazza", "Beer pong", "Karaoke alle 3"];

function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-neon-pink/20 bg-neon-pink py-3 text-black shadow-[0_0_40px_rgba(255,45,155,0.2)]">
      <div className="flex w-max gap-8 animate-marquee">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap font-display text-xs font-black uppercase tracking-[0.18em]"
          >
            <span aria-hidden>{"/// "}</span>
            {item}
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

      <section
        id="prenota"
        className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
      >
        <div
          aria-hidden
          className="absolute -left-44 top-28 -z-10 size-96 rounded-full bg-neon-pink/8 blur-3xl"
        />
        <div>
          <p className="section-kicker font-mono text-[10px] uppercase tracking-[0.25em] text-neon-pink">
            01 // Info evento
          </p>
          <h2 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white glow-text">
            Tutto quello
            <br />
            che <span className="outline-text">devi sapere.</span>
          </h2>
          <p className="mb-8 mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Il resto rimane tra chi c&apos;era. Una casa, un dancefloor improvvisato e una notte
            che non finirà nelle storie.
          </p>
          <EventDetails />
        </div>
        <div className="lg:sticky lg:top-6">
          <p className="section-kicker mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-green">
            02 // Secure access
          </p>
          <BookingForm />
        </div>
      </section>

      <Faq />
    </main>
  );
}
