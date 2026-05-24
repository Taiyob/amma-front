interface IHeadingProps {
  title: string;
  subTitle: string;
}

const SectionHeading = ({title, subTitle}: IHeadingProps) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-175 text-center">
        <h2 className="capitalize font-extrabold text-2xl md:text-5xl mb-6 text-[#2F2F2F]">
          {title}
        </h2>
        <p className="text-[#79716B] text-lg">{subTitle}</p>
      </div>
    </div>
  );
};

export default SectionHeading;
