'use client';

import React, {useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {Button} from '@/components/ui/button';
import {motion, AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    image: '/image/commonLayout/header/amma-hero-3-Picsart.jpeg',
    title: 'Care for loved ones back home without the stress',
  },
  {
    image: '/image/commonLayout/header/amma-hero-2-Picsart.jpeg',
    title:
      'Our medical professionals accompany your loved ones to the hospital',
  },
  {
    image: '/image/commonLayout/header/amma-hero-1-Picsart.jpeg',
    title: 'When a diagnosis is unclear or a treatment plan feels overwhelming',
  },
  {
    image: '/image/commonLayout/header/amma-hero-4-Picsart.jpeg',
    title:
      'Our AI distils medical records into actionable insights so you can take charge of your health',
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={3000}
        transitionTime={500}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        className="text-center"
        onChange={(index) => setActiveIndex(index)}
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <li
            className={`inline-block mx-1 w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 ${isSelected ? 'bg-secondary scale-125' : 'bg-secondary/40'}`}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          />
        )}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-h-100 md:h-125 lg:h-215 w-full">
            {/* Main Slide Image — full brightness, no dark wrapper */}
            <Image
              src={slide.image}
              className="h-full w-full object-cover"
              alt={slide.title}
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              width={2000}
              height={2000}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(to top, rgba(10, 55, 155, 0.97) 0%, rgba(15, 65, 175, 0.85) 22%, rgba(20, 75, 190, 0.55) 30%, rgba(25, 85, 200, 0.20) 35%, transparent 40%)',
              }}
            />

            {/* Text container */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 lg:px-6 lg:pb-10 pb-14">
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    key={index}
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 10}}
                    transition={{duration: 0.6, ease: 'easeOut'}}
                    className="flex flex-col items-start text-start space-y-3 md:space-y-5 mx-auto max-w-360 w-full">
                    {/* Subtitle — plain text, no swoosh */}
                    {/* <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight uppercase   text-orange-600">
                      Care Beyond Borders{' '}
                    </h3> */}
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                      <span className="text-orange-400">
                        Care Beyond Borders
                      </span>
                    </h1>

                    {/* Main headline */}
                    <h2
                      className="max-w-3xl text-2xl md:text-3xl lg:text-3xl xl:text-5xl font-bold leading-tight text-white"
                      style={{
                        filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))',
                      }}>
                      {slide.title}
                    </h2>

                    {/* CTA Button */}
                    <div className="pt-2 flex gap-6 items-center">
                      <Link href="/register">
                        <Button
                          className="bg-secondary text-white hover:bg-secondary/90 border-none md:px-10 py-4 mb-2 md:py-6 text-sm md:text-lg rounded-full shadow-lg"
                          style={{
                            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                          }}>
                          Request Care Now
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Carousel Style Overrides */}
      <style jsx global>{`
        .carousel .control-dots {
          bottom: 30px !important;
          z-index: 50;
        }
        .carousel .slide {
          background: transparent !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;

// 'use client';

// import React, {useState} from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import {Carousel} from 'react-responsive-carousel';
// import {Button} from '@/components/ui/button';
// import {motion, AnimatePresence} from 'framer-motion';
// import Link from 'next/link';
// import Image from 'next/image';

// const slides = [
//   {
//     image: '/image/commonLayout/banner/banner22.jpg',
//     title: 'Care for loved ones back home without the stress',
//   },
//   {
//     image: '/image/commonLayout/banner/banner21.jpg',
//     title:
//       'Our medical professionals accompany your loved ones to the hospital',
//   },
//   {
//     image: '/image/commonLayout/banner/banner23.jpg',
//     title: 'When a diagnosis is unclear or a treatment plan feels overwhelming',
//   },
//   {
//     image: '/image/commonLayout/banner/banner24.jpg',
//     title:
//       'Our AI distils medical records into actionable insights so you can take charge of your health',
//   },
// ];

// const Banner = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="relative w-full overflow-hidden bg-background">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showStatus={false}
//         showThumbs={true}
//         interval={3000}
//         transitionTime={500}
//         stopOnHover={true}
//         swipeable={true}
//         emulateTouch={true}
//         thumbWidth={80}
//         className="text-center"
//         onChange={(index) => setActiveIndex(index)}
//         renderThumbs={() =>
//           slides.map((slide, index) => (
//             <div key={index} className="h-12 w-full relative">
//               <Image
//                 src={slide.image}
//                 className="object-cover rounded border-secondary"
//                 alt={`thumb-${index}`}
//                 width={2000}
//                 height={2000}
//               />
//             </div>
//           ))
//         }
//         renderIndicator={(onClickHandler, isSelected, index, label) => (
//           <li
//             className={`inline-block mx-1 w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 ${
//               isSelected ? 'bg-secondary scale-125' : 'bg-secondary/40'
//             }`}
//             onClick={onClickHandler}
//             onKeyDown={onClickHandler}
//             value={index}
//             key={index}
//             role="button"
//             tabIndex={0}
//             aria-label={`${label} ${index + 1}`}
//           />
//         )}>
//         {slides.map((slide, index) => (
//           <div key={index} className="relative h-100 md:h-125 lg:h-187 w-full">
//             {/* Main Slide Image */}
//             <Image
//               src={slide.image}
//               className="h-full w-full object-cover"
//               alt={slide.title}
//               priority={index === 0}
//               loading={index === 0 ? undefined : 'lazy'}
//               width={2000}
//               height={2000}
//             />

//             {/* Gradient overlay */}
//             <div
//               className="absolute inset-0 z-10"
//               style={{
//                 background:
//                   'linear-gradient(to top, rgba(10, 55, 155, 0.97) 0%, rgba(15, 65, 175, 0.85) 25%, rgba(20, 75, 190, 0.55) 40%, rgba(25, 85, 200, 0.20) 50%, transparent 80%)',
//               }}
//             />

//             {/* Text container */}
//             <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 lg:px-20 lg:pb-20 pb-14">
//               <AnimatePresence mode="wait">
//                 {activeIndex === index && (
//                   <motion.div
//                     key={index}
//                     initial={{opacity: 0, y: 30}}
//                     animate={{opacity: 1, y: 0}}
//                     exit={{opacity: 0, y: 10}}
//                     transition={{duration: 0.6, ease: 'easeOut'}}
//                     className="flex flex-col items-start text-start space-y-3 md:space-y-5 mx-auto max-w-7xl w-full">
//                     {/* Subtitle — brush image behind, white text on top */}
//                     <div className="relative inline-flex items-center justify-center">
//                       {/* Brush stroke image — stretched to fill behind text */}
//                       <div
//                         className="absolute inset-0 w-full h-full"
//                         style={{
//                           transform: 'scaleX(1.08) scaleY(1.15)',
//                           zIndex: 0,
//                         }}>
//                         <Image
//                           src="/hero-bg-brash.png"
//                           alt="brash background"
//                           aria-hidden="true"
//                           height={150}
//                           width={600}
//                           className="object-fill"
//                           style={{opacity: 0.95}}
//                         />
//                       </div>

//                       {/* Text — white, bold, no dark color */}
//                       <h3
//                         className="relative z-10 text-base md:text-xl lg:text-2xl font-bold uppercase text-white px-6 py-2 md:px-8 md:py-3 italic "
//                         style={{
//                           letterSpacing: '0.2em',
//                           textShadow: '0 1px 6px rgba(0,0,0,0.2)',
//                         }}>
//                         Care Beyond Borders
//                       </h3>
//                     </div>

//                     {/* Main headline */}
//                     <h2
//                       className="max-w-3xl text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white"
//                       style={{
//                         filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))',
//                       }}>
//                       {slide.title}
//                     </h2>

//                     {/* CTA Button */}
//                     <div className="pt-2">
//                       <Link href="/register">
//                         <Button
//                           className="bg-secondary text-white hover:bg-secondary/90 border-none md:px-10 py-4 mb-2 md:py-6 text-sm md:text-lg rounded-full shadow-lg"
//                           style={{
//                             filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
//                           }}>
//                           Request Care Now
//                         </Button>
//                       </Link>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         ))}
//       </Carousel>

//       {/* Carousel Style Overrides */}
//       <style jsx global>{`
//         .carousel .control-dots {
//           bottom: 30px !important;
//           z-index: 50;
//         }
//         .carousel .thumbs-wrapper {
//           margin: 10px 0 !important;
//           padding: 0 !important;
//         }
//         .carousel .thumb {
//           border: 2px solid transparent !important;
//           border-radius: 6px;
//           cursor: pointer;
//           opacity: 0.5;
//           transition: all 0.3s ease;
//         }
//         .carousel .thumb.selected,
//         .carousel .thumb:hover {
//           border: 2px solid var(--secondary) !important;
//           opacity: 1;
//         }
//         .carousel .thumb:focus {
//           outline: none !important;
//         }
//         .carousel .slide {
//           background: transparent !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Banner;

// 'use client';

// import React, {useState} from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import {Carousel} from 'react-responsive-carousel';
// import {Button} from '@/components/ui/button';
// import {motion, AnimatePresence} from 'framer-motion';
// import Link from 'next/link';
// import Image from 'next/image';

// const slides = [
//   {
//     image: '/image/commonLayout/banner/bannerrr.jpg',
//     title: 'Care for loved ones back home without the stress',
//     description:
//       "Managing the health of a loved one from a distance can be challenging - So mojacares shows up when you can't. We are your one-stop solution for access to timely medical attention. We coordinate, advocate and deliver peace of mind.",
//   },
//   {
//     image: '/image/commonLayout/banner/banner5.jpg',
//     title:
//       'Our medical professionals accompany your loved ones to the hospital',
//     description:
//       'We manage the entire journey from admission to discharge. We are the trusted liaison with doctors, diagnostic facilities, labs and pharmacies.',
//   },
//   {
//     image: '/image/commonLayout/banner/banner3.jpg',
//     title: 'When a diagnosis is unclear or a treatment plan feels overwhelming',
//     description:
//       'Mojacares enables you to request a second opinion and coordinate referrals to the right specialist.',
//   },
//   {
//     image: '/image/commonLayout/banner/banner4.jpg',
//     title:
//       'Our AI distils medical records into actionable insights so you can take charge of your health',
//     description:
//       'We protect your privacy while empowering you with the right data to make informed decisions about your health',
//   },
// ];

// const Banner = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="relative w-full overflow-hidden bg-background">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showStatus={false}
//         showThumbs={true}
//         interval={3000}
//         transitionTime={500}
//         stopOnHover={true}
//         swipeable={true}
//         emulateTouch={true}
//         thumbWidth={80}
//         className="text-center"
//         onChange={(index) => setActiveIndex(index)}
//         renderThumbs={() =>
//           slides.map((slide, index) => (
//             <div key={index} className="h-12 w-full relative">
//               <Image
//                 src={slide.image}
//                 className="object-cover rounded border-secondary"
//                 alt={`thumb-${index}`}
//                 width={2000}
//                 height={2000}
//               />
//             </div>
//           ))
//         }
//         renderIndicator={(onClickHandler, isSelected, index, label) => (
//           <li
//             className={`inline-block mx-1 w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 ${isSelected ? 'bg-secondary scale-125' : 'bg-secondary/40'}`}
//             onClick={onClickHandler}
//             onKeyDown={onClickHandler}
//             value={index}
//             key={index}
//             role="button"
//             tabIndex={0}
//             aria-label={`${label} ${index + 1}`}
//           />
//         )}>
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className="relative h-100 md:h-125 lg:h-187 w-full bg-black/20">
//             {/* Main Slide Image */}
//             <Image
//               src={slide.image}
//               className="h-full w-full object-cover"
//               alt={slide.title}
//               priority={index === 0}
//               loading={index === 0 ? undefined : 'lazy'}
//               width={2000}
//               height={2000}
//             />

//             {/* Overlay Container */}
//             <div className="absolute top-0 left-0 text-white bg-linear-to-r from-black/75 via-black/35 to-transparent w-full h-full p-5 lg:p-20 grid grid-cols-1 lg:grid-cols-1 gap-6 items-center z-10">
//               {/* Text Content - Optimized Animation */}
//               <div className="text-start space-y-2 md:space-y-6">
//                 <AnimatePresence mode="wait">
//                   {activeIndex === index && (
//                     <motion.div
//                       key={index}
//                       initial={{opacity: 0, x: -50}}
//                       animate={{opacity: 1, x: 0}}
//                       exit={{opacity: 0, x: 20}}
//                       transition={{duration: 0.6, ease: 'easeOut'}}
//                       className="space-y-2 md:space-y-6 max-w-7xl mx-auto">
//                       <h3 className="text-xl md:text-2xl lg:text-3xl text-secondary md:font-medium uppercase tracking-wider ">
//                         Care Beyond Borders
//                       </h3>

//                       <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:font-bold leading-tight max-w-2xl">
//                         {slide.title}
//                       </h2>

//                       <p className="text-sm md:text-lg lg:text-xl text-white/90 max-w-xl hidden md:block">
//                         {slide.description}
//                       </p>

//                       <div className="pt-2">
//                         <Link href="/register">
//                           <Button className="bg-secondary text-white hover:bg-secondary/90 border-none md:px-10 py-4 md:py-6 text-sm md:text-lg rounded-full shadow-lg">
//                             Request Care Now
//                           </Button>
//                         </Link>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Right Side Empty for Balance */}
//               <div className="hidden lg:block"></div>
//             </div>
//           </div>
//         ))}
//       </Carousel>

//       {/* Styled Overrides */}
//       <style jsx global>{`
//         .carousel .control-dots {
//           bottom: 30px !important;
//           z-index: 50;
//         }
//         .carousel .thumbs-wrapper {
//           margin: 10px 0 !important;
//           padding: 0 !important;
//         }
//         .carousel .thumb {
//           border: 2px solid transparent !important;
//           border-radius: 6px;
//           cursor: pointer;
//           opacity: 0.5;
//           transition: all 0.3s ease;
//         }
//         .carousel .thumb.selected,
//         .carousel .thumb:hover {
//           border: 2px solid var(--secondary) !important;
//           opacity: 1;
//         }
//         .carousel .thumb:focus {
//           outline: none !important;
//         }
//         .carousel .slide {
//           background: transparent !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Banner;
