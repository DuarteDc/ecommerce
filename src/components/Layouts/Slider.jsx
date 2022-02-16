import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper";

const Slider = ({ offers }) => {
    console.log(offers);
    return (
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
            className="mb-10"
        >
            {
                offers.map((offer) => (
                    <SwiperSlide key={offer._id}>
                        <img src="https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/06.jpg" alt=""
                            className="h-full w-full" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Slider;