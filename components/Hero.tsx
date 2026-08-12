import Countdown from "@/components/Countdown";
import PurchaseModal from "@/components/PurchaseModal";
import { EVENT } from "@/lib/event";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-61px)] items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-pink/10"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <h1 className="font-display text-6xl font-medium leading-[0.88] tracking-[-0.065em] text-neon-violet sm:text-8xl lg:text-[8.5rem]">
          Festino a casa
          <br />
          <span className="italic text-neon-pink">di Luca</span>
        </h1>
        <Countdown targetISO={EVENT.dateISO} />
        <PurchaseModal />
      </div>
    </section>
  );
}
