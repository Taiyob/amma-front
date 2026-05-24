import { 
  Building, 
  GraduationCap, 
  ShoppingCart, 
  Home 
} from "lucide-react";

const locations = [
  {
    icon: <Building className="h-8 w-8 text-gray-900" />,
    title: "Workplaces",
    description: "On-site checkups for office workers",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-gray-900" />,
    title: "Schools",
    description: "Regular health checkups for students",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-gray-900" />,
    title: "Marketplaces",
    description: "Quick treatment for busy business people",
  },
  {
    icon: <Home className="h-8 w-8 text-gray-900" />,
    title: "Neighborhoods",
    description: "Direct home visits for families",
  },
];

export function WhereWeMeetYou() {
  return (
    <div className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-inter leading-tight">
            Where We Meet You
          </h2>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((loc, index) => (
            <article
              key={index}
              className="bg-background  rounded-2xl p-8 flex flex-col items-center text-center   border-2 
                         hover:border-red-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              {/* Icon container */}
              <div className="p-5 bg-white rounded-full shadow-md mb-6 flex items-center justify-center 
                              group-hover:scale-110 transition-transform duration-300">
                {loc.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-inter transition-colors duration-300">
                {loc.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 font-inter leading-relaxed">
                {loc.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}