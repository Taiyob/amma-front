import Image from 'next/image';

const MissionSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto py-6 md:py-20 px-4 md:px-12" id="our-mission">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-20">
          {/* Left Side: Image with Badge */}
          <div className="relative group">
            {/* Main Image Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-slate-100 max-h-125">
              <Image
                src="/image/pagesimage/careing2.jpg" // Replace with your actual image path
                alt="Caregiver supporting elderly"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 100% Transparency Badge */}
            <div className="absolute top-8 left-8 bg-secondary text-white p-4 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-w-30">
              <span className="text-2xl md:text-3xl font-bold leading-none">
                100%
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium mt-1">
                Transparency
              </span>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight">
                Our mission is to <br /> bridge the distance <br /> with
                dependable care.
              </h2>
              <p className="text-[#57534D] text-base md:text-lg leading-relaxed max-w-xl">
                Mojacares exists to remove stress by making care coordination
                simple, transparent, and dependable. We understand the unique
                challenges of managing healthcare for loved ones from afar.
              </p>
            </div>

            {/* Quote Block */}
            <div className="relative p-10 border-l-4 border-secondary bg-orange-50 rounded-r-xl">
              <p className="text-slate-700 italic text-lg md:text-xl leading-relaxed font-medium">
                &quot;We don&apos;t just provide medical support; we provide the
                peace of mind that comes from knowing your family is never truly
                alone.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
