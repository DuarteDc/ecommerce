import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import ImageSlider from '../../../public/assets/images/background-category.jpg';
import { useSelector } from "react-redux";
import Link from "next/link";

const CategoryComponent = () => {
    const {categoriesHome:categories} = useSelector((state)=>state.categories); 
    
    return (
      <section className="px-6">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          slidesPerGroup={3}
          loop={true}
          navigation={true}
          className="mySwiper"
          modules={[Navigation]}
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
            1400:{
              slidesPerView: 4,
              spaceBetween: 20,
            }

          }}
        >
          {categories.map(category => (
            <SwiperSlide key={category._id}>
              <div className="rounded-md my-8 mx-auto overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-full before:h-screen before:bg-[#222] before:transition before: duration-[.5] before:opacity-[.30] before:z-[2] max-h-[300px] max-w-[400px] cursor-pointer">
                <Link href="/products">
                  <img src={category.image} className="w-full h-full"/>
                  </Link>
                <div className="absolute left-8 top-32 translate-y-2/4 z-[3]">
                  <h3 className="text-luz text-lg font-bold mb-0  font-['Poppins']">{category.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
}

export default CategoryComponent;