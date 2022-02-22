import Image from "next/image";
import { Autoplay, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
import CarrouselUI from "../ui/carrousel";
import Partner from '../../../public/assets/images/partner.png';

const PartnerArea = () => {
    return (
        <section className="bg-[#f5f5f5] py-8">
            <div className="w-full m-auto px-6">
              <CarrouselUI
               slidesPerView={4}
               spaceBetween={10}
               loop={true}
               autoplay={{
                delay: 1500,
                disableOnInteraction: false,
               }}
               pagination={{
                clickable: true,
               }}
               modules={[Pagination, Autoplay]}
               className={"mySwiper"}
              >
                  <SwiperSlide>
                      <div class="text-center h-28">
                          <a href="/">
                            <Image
                             src={Partner}
                             className="w-auto inline-block"
                            />
                          </a>
                      </div>
                  </SwiperSlide>
                  <SwiperSlide>
                      <div class="text-center h-28">
                          <a href="/">
                            <Image
                             src={Partner}
                             className="w-auto inline-block"
                            />
                          </a>
                      </div>
                  </SwiperSlide>
                  <SwiperSlide>
                      <div class="text-center h-28">
                          <a href="/">
                            <Image
                             src={Partner}
                             className="w-auto inline-block"
                            />
                          </a>
                      </div>
                  </SwiperSlide>
                  <SwiperSlide>
                      <div class="text-center h-28">
                          <a href="/">
                            <Image
                             src={Partner}
                             className="w-auto inline-block"
                            />
                          </a>
                      </div>
                  </SwiperSlide>
                  <SwiperSlide>
                      <div class="text-center h-28">
                          <a href="/">
                            <Image
                             src={Partner}
                             className="w-auto inline-block"
                            />
                          </a>
                      </div>
                  </SwiperSlide>
              </CarrouselUI>
            </div>
        </section>
    );
};

export default PartnerArea;