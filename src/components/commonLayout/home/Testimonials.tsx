'use client';

import Image from 'next/image';
import {useState, useEffect} from 'react';

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Our team of medical professionals accompanies your loved one to the hospital and manages the entire hospital journey from admission to discharge. We are the trusted liaison with doctors, diagnostic facilities, labs and pharmacies.',
    name: 'Bridget Ellacott',
    title: 'Clinical Nurse Manager',
  },
];

export default function TestimonialBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-120 rounded-3xl overflow-hidden shadow-2xl">
        {/* ── LEFT: Image ── */}
        <div className="relative min-h-80 lg:min-h-full">
          <Image
            src="/image/commonLayout/landing/professinoal.jpg"
            alt="Mojacares medical team"
            fill
            className="object-cover"
            loading="lazy"
          />
          {/* Gradient fade into right panel */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-blue-50/20 hidden lg:block" />
          {/* Bottom overlay for branding */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-white/80 text-sm font-medium tracking-wide">
                Mojacares Team
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Quote panel ── */}
        <div
          className="relative flex flex-col justify-center px-8 md:px-12 py-12"
          style={{
            background:
              'linear-gradient(135deg, #e8f0fe 0%, #dbeafe 40%, #eff6ff 100%)',
          }}>
          {/* Decorative top-left orange bar */}
          <div className="absolute top-0 left-0 w-1 h-24 bg-secondary rounded-r" />

          {/* Oversized quote mark */}
          <div
            className="text-secondary text-[9rem] font-black leading-none select-none mb-2 -mt-4"
            style={{fontFamily: "'Georgia', serif"}}
            aria-hidden>
            &quot;
          </div>

          {/* Quote text */}
          <blockquote
            className="text-lg md:text-xl lg:text-2xl text-neutral-800 leading-relaxed italic mb-8"
            style={{fontFamily: "'Georgia', 'Times New Roman', serif"}}>
            {t.quote}
          </blockquote>

          {/* Divider + Attribution */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-orange-500" />
            <div>
              <p className="text-neutral-900 font-semibold text-sm tracking-wide">
                {t.name}
              </p>
              <p className="text-neutral-500 text-sm">{t.title}</p>
            </div>
          </div>

          {/* Slide dots — only shown if multiple testimonials */}
          {testimonials.length > 1 && (
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'bg-orange-500 w-6'
                      : 'bg-blue-200 hover:bg-blue-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import Image from 'next/image';
// import {useState, useEffect} from 'react';

// type Testimonial = {
//   id: number;
//   quote: string;
//   name: string;
//   title: string;
// };

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     quote:
//       'Our team of medical professionals accompanies your loved one to the hospital and manages the entire hospital journey from admission to discharge. We are the trusted liaison with doctors, diagnostic facilities, labs and pharmacies.',
//     name: 'Bridget Ellacott',
//     title: 'Clinical Nurse Manager',
//   },
// ];

// export default function TestimonialBanner() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (testimonials.length <= 1) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const t = testimonials[currentSlide];

//   return (
//     <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 min-h-120 rounded-3xl overflow-hidden shadow-2xl">
//         {/* ── LEFT: Image ── */}
//         <div className="relative min-h-80 lg:min-h-full">
//           <Image
//             src="/image/commonLayout/public/ambulance.jpg"
//             alt="Mojacares medical team"
//             fill
//             className="object-cover"
//             loading="lazy"
//           />
//           {/* Gradient fade into right panel */}
// <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a379b]/20 hidden lg:block" />
//           {/* Bottom overlay for branding */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-orange-400" />
//               <span className="text-white/80 text-sm font-medium tracking-wide">
//                 Mojacares Team
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT: Quote panel ── */}
//         <div className="relative bg-[#0a379b] flex flex-col justify-center px-8 md:px-12 py-12">
//           {/* Decorative top-left orange bar */}
//           <div className="absolute top-0 left-0 w-1 h-24 bg-orange-500 rounded-r" />

//           {/* Oversized quote mark */}
//           <div
//             className="text-orange-500/20 text-[9rem] font-black leading-none select-none mb-2 -mt-4"
//             style={{fontFamily: "'Georgia', serif"}}
//             aria-hidden></div>

//           {/* Quote text */}
//           <blockquote
//             className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed italic mb-8"
//             style={{fontFamily: "'Georgia', 'Times New Roman', serif"}}>
//             {t.quote}
//           </blockquote>

//           {/* Divider + Attribution */}
//           <div className="flex items-center gap-4">
//             <span className="h-px w-10 bg-orange-500" />
//             <div>
//               <p className="text-white font-semibold text-sm tracking-wide">
//                 {t.name}
//               </p>
//               <p className="text-white/50 text-sm">{t.title}</p>
//             </div>
//           </div>

//           {/* Slide dots — only shown if multiple testimonials */}
//           {testimonials.length > 1 && (
//             <div className="flex gap-2 mt-8">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     i === currentSlide
//                       ? 'bg-orange-500 w-6'
//                       : 'bg-white/25 hover:bg-white/40'
//                   }`}
//                   aria-label={`Go to testimonial ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import {useState, useEffect} from 'react';

// type Testimonial = {
//   id: number;
//   quote: string;
//   name: string;
//   title: string;
// };

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     quote:
//       'Our team of medical professionals accompanies your loved one to the hospital and manages the entire hospital journey from admission to discharge. We are the trusted liaison with doctors, diagnostic facilities, labs and pharmacies.',
//     name: 'Bridget Ellacott',
//     title: 'Clinical Nurse Manager',
//   },
// ];

// export default function TestimonialBanner() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (testimonials.length <= 1) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const t = testimonials[currentSlide];

//   return (
//     <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 min-h-120 rounded-3xl overflow-hidden shadow-2xl">
//         {/* ── LEFT: Image ── */}
//         <div className="relative min-h-80 lg:min-h-full">
//           <Image
//             src="/image/commonLayout/public/ambulance.jpg"
//             alt="Mojacares medical team"
//             fill
//             className="object-cover"
//             loading="lazy"
//           />
//           {/* Gradient fade into right panel */}
//           <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-white/20 hidden lg:block" />
//           {/* Bottom overlay for branding */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-orange-400" />
//               <span className="text-white/80 text-sm font-medium tracking-wide">
//                 Mojacares Team
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT: Quote panel ── */}
//         <div className="relative bg-white flex flex-col justify-center px-8 md:px-12 py-12">
//           {/* Decorative top-left orange bar */}
//           <div className="absolute top-0 left-0 w-1 h-24 bg-orange-500 rounded-r" />

//           {/* Oversized quote mark */}
//           <div
//             className="text-orange-500/20 text-[9rem] font-black leading-none select-none mb-2 -mt-4"
//             style={{fontFamily: "'Georgia', serif"}}
//             aria-hidden>
//             &quot;
//           </div>

//           {/* Quote text */}
//           <blockquote
//             className="text-lg md:text-xl lg:text-2xl text-neutral-800 leading-relaxed italic mb-8"
//             style={{fontFamily: "'Georgia', 'Times New Roman', serif"}}>
//             {t.quote}
//           </blockquote>

//           {/* Divider + Attribution */}
//           <div className="flex items-center gap-4">
//             <span className="h-px w-10 bg-orange-500" />
//             <div>
//               <p className="text-neutral-900 font-semibold text-sm tracking-wide">
//                 {t.name}
//               </p>
//               <p className="text-neutral-500 text-sm">{t.title}</p>
//             </div>
//           </div>

//           {/* Slide dots — only shown if multiple testimonials */}
//           {testimonials.length > 1 && (
//             <div className="flex gap-2 mt-8">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     i === currentSlide
//                       ? 'bg-orange-500 w-6'
//                       : 'bg-neutral-300 hover:bg-neutral-400'
//                   }`}
//                   aria-label={`Go to testimonial ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import {useState, useEffect} from 'react';

// type Testimonial = {
//   id: number;
//   quote: string;
//   name: string;
//   title: string;
// };

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     quote:
//       'Our team of medical professionals accompanies your loved one to the hospital and manages the entire hospital journey from admission to discharge. We are the trusted liaison with doctors, diagnostic facilities, labs and pharmacies.',
//     name: 'Bridget Ellacott',
//     title: 'Clinical Nurse Manager',
//   },
// ];

// export default function TestimonialBanner() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (testimonials.length <= 1) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const t = testimonials[currentSlide];

//   return (
//     <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 min-h-120 rounded-3xl overflow-hidden shadow-2xl">
//         {/* ── LEFT: Image ── */}
//         <div className="relative min-h-80 lg:min-h-full">
//           <Image
//             src="/image/commonLayout/public/ambulance.jpg"
//             alt="Mojacares medical team"
//             fill
//             className="object-cover"
//             loading="lazy"
//           />
//           {/* Gradient fade into right panel */}
// <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a379b]/20 hidden lg:block" />
//           {/* Bottom overlay for branding */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-orange-400" />
//               <span className="text-white/80 text-sm font-medium tracking-wide">
//                 Mojacares Team
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT: Quote panel ── */}
//         <div className="relative bg-[#0a379b] flex flex-col justify-center px-8 md:px-12 py-12">
//           {/* Decorative top-left orange bar */}
//           <div className="absolute top-0 left-0 w-1 h-24 bg-orange-500 rounded-r" />

//           {/* Oversized quote mark */}
//           <div
//             className="text-orange-500/20 text-[9rem] font-black leading-none select-none mb-2 -mt-4"
//             style={{fontFamily: "'Georgia', serif"}}
//             aria-hidden></div>

//           {/* Quote text */}
//           <blockquote
//             className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed italic mb-8"
//             style={{fontFamily: "'Georgia', 'Times New Roman', serif"}}>
//             {t.quote}
//           </blockquote>

//           {/* Divider + Attribution */}
//           <div className="flex items-center gap-4">
//             <span className="h-px w-10 bg-orange-500" />
//             <div>
//               <p className="text-white font-semibold text-sm tracking-wide">
//                 {t.name}
//               </p>
//               <p className="text-white/50 text-sm">{t.title}</p>
//             </div>
//           </div>

//           {/* Slide dots — only shown if multiple testimonials */}
//           {testimonials.length > 1 && (
//             <div className="flex gap-2 mt-8">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     i === currentSlide
//                       ? 'bg-orange-500 w-6'
//                       : 'bg-white/25 hover:bg-white/40'
//                   }`}
//                   aria-label={`Go to testimonial ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
