import Link from "next/link";

export function HealthCTASection() {
    return (
        <div className="py-20 md:py-28 bg-neutral-700 relative overflow-hidden">
            {/* Subtle blurred orbs (background decoration) */}
            <div className="absolute -left-48 -top-48 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-inter">
                        Ready to organize your<br />
                        family’s health?
                    </h2>

                    <p className="mt-6 text-lg text-white/80 font-inter leading-relaxed">
                        Join thousands of families who trust Mojacares to keep their health records safe and accessible.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <Link href={"/register"}>
                            <button className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-neutral-700">
                                Request Access Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}