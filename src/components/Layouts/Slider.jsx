import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper";
import Image from "next/image";
import ImageSlider from '../../../public/assets/images/love-nails.jpg';
import SliderImage from "./SliderImage";

const images = [
    {'id':'1',
     'image':'/assets/images/back.png',
     'title':'Aqui va un titulo',
     'description':'Aqui la descripcion corta',
     'url':'localhost:3000/ofertas'
    },
    {'id':'2',
     'image':'/assets/images/back.png',
     'title':'Aqui va un titulo',
     'description':'Aqui la descripcion corta',
     'url':'localhost:3000/ofertas'
    },
    {'id':'3',
     'image':'/assets/images/back.png',
     'title':'Aqui va un titulo',
     'description':'Aqui la descripcion corta',
     'url':'localhost:3000/ofertas'
    },
    {'id':'4',
     'image':'/assets/images/back.png',
     'title':'Aqui va un titulo',
     'description':'Aqui la descripcion corta',
     'url':'localhost:3000/ofertas'
    }
]

const Slider = ({ offers }) => {
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
                    images.map(image=>(
                        <SwiperSlide key={image.id}>
                        <SliderImage
                        
                         image={image}
                        />
                        </SwiperSlide>
                    ))
                }
               
               
            </Swiper>
        </section>
    )
}

export default Slider;