import { Autoplay, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
import CarrouselUI from "../ui/carrousel";

const PartnerArea = () => {
    return (
        <section className="bg-[#f5f5f5] py-8">
            <div className="w-full m-auto px-6">
              <CarrouselUI
               slidesPerView={6}
               spaceBetween={10}
               loop={true}
               autoplay={{
                delay: 2500,
                disableOnInteraction: true,
               }}
               pagination={{
                clickable: true,
               }}
               modules={[Pagination, Autoplay]}
               className={"mySwiper"}
              >
                  <SwiperSlide>
                      hola
                  </SwiperSlide>
                  <SwiperSlide>
                      hola
                  </SwiperSlide>
                  <SwiperSlide>
                      hola
                  </SwiperSlide>
                  <SwiperSlide>
                      hola
                  </SwiperSlide>
                  <SwiperSlide>
                      hola
                  </SwiperSlide>
              </CarrouselUI>
            </div>
        </section>
    );
};

export default PartnerArea;