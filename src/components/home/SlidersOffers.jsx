import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";
import SliderImage from "./SliderImage";
import { useSelector } from "react-redux";

export const SlidersOffers = () => {
    const {slidersData} = useSelector((state)=>state.sliders);

    return (
        <section className="mb-0 cursor-pointer overflow-hidden">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                
     
                className="mySwiper"
            >
                {
                    slidersData.map(slider=>(
                        <SwiperSlide key={slider._id}>
                        <SliderImage  
                         slider={slider}
                        />
                        </SwiperSlide>
                    ))
                }
               
               
            </Swiper>
        </section>
    )
}