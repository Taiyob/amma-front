import React from 'react';

type FeaturedCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const FeaturedCard = ({feature}: {feature: FeaturedCardProps}) => {
  const {title, description, icon} = feature;

  return (
    <div className="p-8 rounded-xl border border-transparent rounded-xl shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 group duration-300 shadow-sm flex flex-col items-start">
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-full group-hover:scale-110 bg-orange-50 flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>

      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  );
};

export default FeaturedCard;
