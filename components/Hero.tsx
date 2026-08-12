import Countdown from "@/components/Countdown";
import PurchaseModal from "@/components/PurchaseModal";
import { EVENT } from "@/lib/event";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-61px)] items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        aria-hidden
        className="retro-rings pointer-events-none"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <h1 className="font-display text-6xl leading-[0.82] tracking-[-0.055em] text-neon-violet sm:text-8xl lg:text-[8.2rem]">
          Festino a casa
          <br />
          <span className="text-neon-pink">di Luca</span>
        </h1>
        <Countdown targetISO={EVENT.dateISO} />
        <PurchaseModal />
      </div>
    </section>
  );
}
