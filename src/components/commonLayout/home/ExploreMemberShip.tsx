import Image from 'next/image';

export default function HeroMembership() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[88vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <Image
        src="/image/commonLayout/public/happy.jpg"
        alt="Happy patient with doctor"
        fill
        className="object-cover object-center scale-105"
        priority
      />

      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a379b]/70 via-[#0a379b]/30 to-[#0a379b]/10" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0a379b]/50 via-transparent to-transparent" />

      {/* Decorative diagonal accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-transparent via-secondary/70 to-transparent" />

      {/* Top label */}
      <div className="absolute top-10 left-8 md:left-16 flex items-center gap-3 z-10">
        <span className="w-6 h-px bg-secondary" />
        <span className="text-secondary text-xs font-semibold uppercase tracking-[0.25em]">
          Patient Experience
        </span>
      </div>

      {/* Main Content — bottom left, asymmetric */}
      <div className="relative z-10 w-full pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="max-w-2xl">
            {/* Oversized serif quote mark */}
            <div
              className="text-secondary/40 text-[6rem] leading-none font-black -mb-6 select-none"
              style={{fontFamily: "'Georgia', serif"}}
              aria-hidden>
              &quot;
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{fontFamily: "'Georgia', 'Times New Roman', serif"}}>
              Redefining
              <br />
              <span className="text-secondary">the Patient</span>
              <br />
              Experience
            </h1>

            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-10 bg-secondary" />
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </div>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-lg font-light">
              With calming environments designed to enhance your comfort and
              enable our doctors to perform at their best.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom right corner — subtle stat or detail */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10 text-right hidden md:block">
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
          Mojacares
        </p>
        <p className="text-white/20 text-xs">Care Beyond Borders</p>
      </div>
    </section>
  );
}
