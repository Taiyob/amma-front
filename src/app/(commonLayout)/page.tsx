import Banner from '@/components/commonLayout/home/Banner';
import HeroMembership from '@/components/commonLayout/home/ExploreMemberShip';
import HeroMembershipBottom from '@/components/commonLayout/home/HeroMembership';
import HowItWorked from '@/components/commonLayout/home/HowItWork';
import TestimonialBanner from '@/components/commonLayout/home/Testimonials';
// import {PricingPlans} from '@/components/price/PricingPlans';

export default function Home() {
  return (
    <main className="landing-page-font">
      {/* 1. Banner */}
      <Banner />

      {/* 2. Services — subtitle changed to orange + new text */}
      <HowItWorked />

      {/* 3. Redefining Patient Experience + Philosophy (blue bg) */}
      <HeroMembership />

      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #e8f0fe 0%, #dbeafe 40%, #eff6ff 100%)',
        }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />
        {/* 
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden>
          <span className="text-[12rem] md:text-[18rem] font-black text-blue-200/60 leading-none">
            care
          </span>
        </div> */}

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl font-semibold text-secondary uppercase tracking-wide mb-6">
            Our Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize text-neutral-900 leading-tight mb-5">
            We don&apos;t replace doctors
            <br />
            or hospitals.
          </h2>
          <div className="flex items-center gap-4 justify-center mb-6">
            <span className="h-px w-12 bg-secondary/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="h-px w-12 bg-secondary/60" />
          </div>
          <p className="text-xl md:text-2xl font-semibold text-secondary uppercase tracking-wide">
            We Connect You to the Right Care.
          </p>
        </div>
      </section>

      {/* <PricingPlans /> */}

      {/* <section className="relative py-20 md:py-28 bg-white overflow-hidden border-y border-neutral-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden>
          <span className="text-[12rem] md:text-[18rem] font-black text-neutral-100 leading-none">
            care
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Our Philosophy
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-5"
            style={{fontFamily: "'Georgia', 'Times New Roman', sans-serif"}}>
            We don&apos;t replace doctors
            <br />
            or hospitals.
          </h2>
          <div className="flex items-center gap-4 justify-center mb-6">
            <span className="h-px w-12 bg-secondary/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="h-px w-12 bg-secondary/60" />
          </div>
          <p className="text-xl md:text-2xl font-semibold text-secondary uppercase tracking-wide">
            We Connect You to the Right Care.
          </p>
        </div>
      </section> */}

      {/* <section className="relative py-20 md:py-28 bg-blue-900 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden>
          <span className="text-[12rem] md:text-[18rem] font-black text-white/5 leading-none">
            care
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Our Philosophy
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{fontFamily: "'Georgia', 'Times New Roman', sans-serif"}}>
            We don&apos;t replace doctors
            <br />
            or hospitals.
          </h2>
          <div className="flex items-center gap-4 justify-center mb-6">
            <span className="h-px w-12 bg-secondary/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="h-px w-12 bg-secondary/60" />
          </div>
     
          <p className="text-xl md:text-2xl font-semibold text-secondary uppercase tracking-wide">
            We Connect You to the Right Care.
          </p>
        </div>
      </section> */}

      {/* 4. Trust Statement */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center gap-4 justify-center mb-10">
            <span className="h-px w-16 bg-orange-300" />
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="h-px w-16 bg-orange-300" />
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight mb-5"
            style={{fontFamily: "'Georgia', 'Times New Roman', sans-serif"}}>
            Mojacares is the trusted link between your loved ones and the
            healthcare they need.
          </h2>

          {/* "We show up when you can't" → orange + uppercase */}
          <p className="text-xl md:text-2xl font-semibold text-secondary tracking-wide uppercase">
            We Show Up When You Can&apos;t
          </p>

          <div className="flex items-center gap-4 justify-center mt-10">
            <span className="h-px w-16 bg-orange-300" />
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="h-px w-16 bg-orange-300" />
          </div>
        </div>
      </section>

      {/* 5. Ambulance / Testimonial */}
      <TestimonialBanner />

      {/* 6. We bring healthcare to you */}
      <HeroMembershipBottom />
    </main>
  );
}

// import Banner from '@/components/commonLayout/home/Banner';
// import HeroMembership from '@/components/commonLayout/home/ExploreMemberShip';
// import HeroMembershipBottom from '@/components/commonLayout/home/HeroMembership';
// // import ExploreMemberShip from "@/components/commonLayout/home/ExploreMemberShip";
// import HowItWorked from '@/components/commonLayout/home/HowItWork';
// // import HowItWorks from "@/components/commonLayout/home/HowItWorkStep";
// import TestimonialBanner from '@/components/commonLayout/home/Testimonials';

// export default function Home() {
//   return (
//     <main className="landing-page-font">
//       <Banner />

//       <HowItWorked />

//       {/* ── TRUST STATEMENT ── */}
//       <section className="relative py-20 md:py-28 overflow-hidden">
//         {/* Subtle dot-grid background */}
//         <div
//           className="absolute inset-0 opacity-[0.035]"
//           style={{
//             backgroundImage:
//               'radial-gradient(circle, #000 1px, transparent 1px)',
//             backgroundSize: '28px 28px',
//           }}
//         />
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           {/* Decorative top rule */}
//           <div className="flex items-center gap-4 justify-center mb-10">
//             <span className="h-px w-16 bg-orange-300" />
//             <span className="w-2 h-2 rounded-full bg-orange-400" />
//             <span className="h-px w-16 bg-orange-300" />
//           </div>

//           <h2
//             className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight mb-5"
//             style={{fontFamily: "'Georgia', 'Times New Roman', sans"}}>
//             Mojacares is the trusted link between your loved ones and the
//             healthcare they need.
//           </h2>

//           <p
//             className="text-xl md:text-2xl font-medium text-secondary tracking-wide uppercase"
//             style={{letterSpacing: '0.12em'}}>
//             We show up when you can&apos;t
//           </p>

//           {/* Decorative bottom rule */}
//           <div className="flex items-center gap-4 justify-center mt-10">
//             <span className="h-px w-16 bg-orange-300" />
//             <span className="w-2 h-2 rounded-full bg-orange-400" />
//             <span className="h-px w-16 bg-orange-300" />
//           </div>
//         </div>
//       </section>

//       <HeroMembership />

//       {/* ── PHILOSOPHY STATEMENT ── */}
//       <section className="relative py-20 md:py-28 bg-neutral-900 overflow-hidden">
//         {/* Orange accent stripe */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent" />

//         {/* Large faint background text */}
//         <div
//           className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
//           aria-hidden>
//           <span className="text-[12rem] md:text-[18rem] font-black text-white/2.5 leading-none">
//             care
//           </span>
//         </div>

//         <div className="relative max-w-5xl mx-auto px-6 text-center">
//           <p className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-6">
//             Our philosophy
//           </p>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
//             We don&apos;t replace doctors
//             <br />
//             or hospitals.
//           </h2>
//           <div className="flex items-center gap-4 justify-center mb-6">
//             <span className="h-px w-12 bg-secondary/60" />
//             <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
//             <span className="h-px w-12 bg-secondary/60" />
//           </div>
//           <p className="text-xl md:text-2xl text-white/70 font-light">
//             We connect you to the right care.
//           </p>
//         </div>
//       </section>

//       <TestimonialBanner />
//       <HeroMembershipBottom />
//     </main>
//   );
// }
