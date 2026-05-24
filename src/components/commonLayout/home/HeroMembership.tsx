// import AppButton from '@/components/ui/AppButton';
import Logo from '@/shared/Logo/Logo';

export default function HeroMembershipBottom() {
  return (
    <section className="relative bg-[#FDFAF6] overflow-hidden">
      {/* Geometric background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #92400e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Large decorative circle — top right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-orange-200/50 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-orange-200/40 pointer-events-none" />

      {/* Large decorative circle — bottom left */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-orange-200/30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-12 bg-orange-300" />
          <span className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="h-px w-24 bg-orange-300" />
          <span className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="h-px w-12 bg-orange-300" />
        </div>

        {/* Headline */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight mb-5"
          style={{fontFamily: "'Georgia', 'Times New Roman', sans"}}>
          We bring healthcare to you, wherever you are
        </h2>

        {/* Subheadline */}
        <p
          className="text-xl md:text-2xl font-semibold text-secondary tracking-wide uppercase mb-6"
          style={{letterSpacing: '0.12em'}}>
          Mojacares makes it easier to get care without disrupting your day
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-8">
          {/* <AppButton
            label="Explore Membership"
            width="px-12 py-4 text-base md:text-lg"
            bgColor="bg-secondary hover:bg-secondary/80"
            textColor="text-white font-semibold"
            rounded="rounded-full"
            className="shadow-l  hover:shadow-x transition-all duration-300 hover:scale-105 active:scale-95"
            href="/pricing"
          /> */}

          {/* Logo */}
          <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
            <Logo />
          </div>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-14">
          <span className="h-px w-12 bg-orange-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />
          <span className="h-px w-12 bg-orange-200" />
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
    </section>
  );
}
