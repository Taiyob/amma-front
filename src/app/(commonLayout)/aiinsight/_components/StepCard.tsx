type IStepProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const StepCard = ({step}: {step: IStepProps}) => {
  return (
    <div className="flex items-start gap-6">
      {/* Icon Circle */}
      <div className="shrink-0 w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg ">
        {step.icon}
      </div>

      {/* Content */}
      <div className="pt-2">
        <h3 className="text-xl text-[#1A2E44] mb-2">{step.title}</h3>
        <p className="text-[#57534D] leading-relaxed text-sm md:text-base">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
