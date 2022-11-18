import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import Rating from '@mui/material/Rating';

import { useSelector } from "react-redux";


const TestimonialArea = () => {

  const { reviews } = useSelector(state => state.reviews);

  return (
    <section className="relative z-[1] bg-testimonial bg-cover  bg-center bg-no-repeat py-14  before:absolute before:left-0 before:top-0 before:w-full before:h-full before:z-[-1] before:bg-[#333] before:opacity-[0.7]">
      <div className="max-w-[1320px] mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          slidesPerGroup={1}
          loop={true}
          navigation={false}
          className="mySwiper"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay, Navigation]}
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1400: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1600: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
        >
          {
            reviews?.map(review => (
              <SwiperSlide key={review._id}>
                <div className="text-center my-0 mx-auto max-w-[745px] px-6">
                  <div className="mb-[30px] flex justify-center">
                    <Image
                      src={review?.client?.profileImage}
                      width={65}
                      height={65}
                      layout="responsive"
                      alt={review.client.fullname}
                      className="rounded-[50%]"
                    />
                  </div>
                  <p className="text-luz mb-0 font-Poppins leading-[1.9]">
                    {review?.review}
                  </p>
                  <div className="mt-[25px]">
                    <h4 className="text-lg text-luz">{review?.client?.fullname}</h4>
                    <span className="block text-luz text-xs py-10">
                      <Rating name="half-rating-read" defaultValue={review.qualification} readOnly />
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialArea;