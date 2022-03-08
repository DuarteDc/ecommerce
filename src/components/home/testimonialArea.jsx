import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";

export const TestimonialArea = () => {
  return (
    <section className="relative z-[1] bg-testimonial bg-cover  bg-centerbg-no-repea py-14  before:absolute before:left-0 before:top-0 before:w-full before:h-full before:z-[-1] before:bg-[#333] before:opacity-[0.3]">
      <div className="msx-w-[1320px] mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          slidesPerGroup={1}
          loop={true}
          navigation={false}
          className="mySwiper"
          modules={[Navigation]}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1400: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1600: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <div className="text-center my-0 mx-auto max-w-[745px]">
              <div className="mb-[30px]">
                <Image src="/assets/images/12.jpg" width={65} height={65} />
              </div>
              <p className="text-luz mb-0 font-Poppins leading-[1.9]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
              </p>
              <div className="mt-[25px]">
                <h4 className="text-lg text-luz">Armenta Pavon</h4>
                <span className="block text-luz text-xs">Desarrollador Backend</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center my-0 mx-auto max-w-[745px]">
              <div className="mb-[30px]">
                <Image src="/assets/images/12.jpg" width={65} height={65} />
              </div>
              <p className="text-luz mb-0 font-Poppins leading-[1.9]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
              </p>
              <div className="mt-[25px]">
                <h4 className="text-lg text-luz">Armenta Pavon</h4>
                <span className="block text-luz text-xs">Desarrollador Backend</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
