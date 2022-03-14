import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import SliderImage from "../Layouts/SliderImage";
import { useSelector } from "react-redux";

export const Slider = () => {
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
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    slidersData.map(slider=>(
                        <SwiperSlide key={slider._id}>
                        <SliderImage  
                         image={slider.imageWeb}
                        />
                        </SwiperSlide>
                    ))
                }
               
               
            </Swiper>
        </section>
    )
}