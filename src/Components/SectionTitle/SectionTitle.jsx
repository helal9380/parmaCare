

const SectionTitle = ({title, subTitle}) => {
    return (
        <div className="text-center my-10">
            <h2 className="text-[#66BC89]">{title}</h2>
            <h2 className="text-3xl font-semibold mb-2">{subTitle}</h2>
            <div className="w-20 h-[4px] mx-auto bg-[#66BC89]"></div>
        </div>
    );
};

export default SectionTitle;