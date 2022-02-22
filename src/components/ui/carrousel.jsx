import React from "react";
import { Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CarrouselUI = ({
  children,
  slidesPerView,
  spaceBetween,
  loop,
  autoplay,
  pagination,
  modules,
  className,
}) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      autoplay={autoplay}
      pagination={pagination}
      modules={modules}
      className={className}
    >
      {children}
    </Swiper>
  );
};

export default CarrouselUI;
