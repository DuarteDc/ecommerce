import {Swiper,  SwiperSlide } from "swiper/react";
import { Slide } from "react-slideshow-image";
import { useSelector } from "react-redux";
import { ProductCard } from "../ui";

import styles from './Slideshow.module.css'
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { Button, ButtonGroup } from "@mui/material";

export const ProductSlider = ({products, name}) => {

    return ( 
        <div className="w-full inline-block">
            <div>
                <span className="w-full text-base md:text-lg lg:text-[26px] text-[#000] font-Poppins uppercase">{name} </span>
            </div>
            <div className="text-xs w-full md:text-base lg:text-lg">
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Liquidos
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Colecciones
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Acrilicos
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Herramientas
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Geles
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Formas
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Stamping
                </span>
                <span className=" hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 rounded-l inline-block">
                    Accesorios y herramientas
                </span>
            </div>
            <Swiper 
                watchSlidesProgress={true}
                slidesPerView={4}
                pagination={{
                    dynamicBullets: true,
                        }}
                breakpoints={{
                    380:{
                        slidesPerView:1,
                        spaceBetween:10,
                    },
                    640:{
                        slidesPerView:2,
                        spaceBetween:20,
                    },
                    768: {
                        slidesPerView:3,
                        spaceBetween:30,
                    },
                    1024: {
                        slidesPerView:4,
                        spaceBetween:40,
                    }
                }}
                className="mySwiper"
            >

                    {products?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div>
                            <ProductCard
                            product={product} 
                            />
                        </div>
                    </SwiperSlide>
                    ))}
            
            </Swiper>
       </div>
    )
}