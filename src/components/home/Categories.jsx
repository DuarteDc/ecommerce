import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";

export const CategoryArea = () => {
  const { categoriesHome: categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const checked = localStorage.getItem('checked-sales');
    console.log(checked)
  }, []);

  return (
    <section className="px-6 py-5 max-w-[1335px] mx-auto mb-8">
      <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
        <h2 className="font-Poppins text-[25px] uppercase font-lg  text-[#222] text-center font-semibold">
          Categorias
        </h2>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        slidesPerGroup={3}
        loop={true}
        navigation={true}
        className="mySwiper"
        modules={[Navigation]}
        breakpoints={{
          250: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <Link href={`/${category.name}`}>
              <>
                <div className="relative left-0 top-0 pb-[35px] h-[300px] w-[400px]">
                  <div className="block-pick overflow-hidden relative flex justify-center  min-h-[300px] ">
                    <Image
                      src={category.imageWeb}
                      width={400}
                      height={300}
                    />

                    <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-[1] transition-all	duration-[0.4s] ease-linear delay-0">
                      <div className="absolute left-2/4 translate-x-[-50%]  bottom-[-10px] w-[161px] transition-all	duration-[0.4s] ease-linear delay-0">
                        <Link href={`/categories/${category.url}`}>
                          <button className="block-btn rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-10 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0">
                          Ver más
                          </button>
                        </Link>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <style jsx>
                  {`
                    .block-pick:hover .block-btn {
                      bottom: 50px;
                    }
                  `}
                </style>
              </>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
