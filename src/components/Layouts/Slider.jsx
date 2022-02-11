import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper";

const Slider = ({ offers }) => {
    return (
        <section className="mb-10 cursor-pointer overflow-hidden">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    offers.map((offer) => (
                        <SwiperSlide>
                            <img src="https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/06.jpg" alt=""
                                className="h-full w-full" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default Slider;