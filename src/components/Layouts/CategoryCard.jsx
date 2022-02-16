import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const CategoryCard = () => {
    const categories = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <section className="px-6">
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                slidesPerGroup={3}
                loop={true}
                className="mySwiper"
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
                }}
            >
                {
                    categories.map((cat, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-[#f58d16] text-center py-12 rounded-lg text-white cursor-pointer">
                                <h2 className="text-2xl">Categories</h2>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section >
    )
}

export default CategoryCard;