export const BannerImage = ({ title, banner }) => {
  return (
    <section
      className={`text-center px-[15px] py-[70px] md:py-[92px] ${banner} bg-cover  bg-center bg-no-repeat w-full`}
    >
      <h1 className="font-Poppins font-semibold text-4xl  lg:text-5xl leading-[1.1] text-luz">
        {title}
      </h1>
    </section>
  );
};
