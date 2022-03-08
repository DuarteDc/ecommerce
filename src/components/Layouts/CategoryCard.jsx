import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import Image from "next/image";
import ImageSlider from '../../../public/assets/images/background-category.jpg';

const CategoryCard = () => {
    const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-md my-8 overflow-hidden relative">
                <Image
                 src={ImageSlider}
                 alt="Hola"
                />
                <div className="absolute left-8 top-0 translate-y-2/4">
                  <h3 className="text-luz text-base font-bold mb-0">Categoria {index}</h3>
                  <p className="text-luz mt-3">130 productos</p>
                  <button className="text-luz mt-4 border-solid inline-block py-3 px-6 leading-normal rounded-sm uppercase font-normal text-sm border-2 border-luz hover:bg-black hover:border-luz transition duration-700 ease-in-out">Comprar ahora</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
}

export default CategoryCard;