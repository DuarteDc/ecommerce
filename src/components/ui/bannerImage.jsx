export const BannerImage = ({ title, banner }) => {
  return (
    <section
      className={`text-center px-[15px] py-[92px] ${banner} bg-cover  bg-center bg-no-repeat sm:w-full`}
    >
      <h1 className="font-Poppins font-semibold text-4xl  lg:text-5xl leading-[1.1] text-luz">
        {title}
      </h1>
    </section>
  );
};
