import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {useSelector} from "react-redux";
/**tags */

export const PartnerArea = () => {
  const {brands} = useSelector((state)=>state.brands);
  return (
    <section className=" py-8 m-auto">
      <div className=" px-6 ">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className={"mySwiper"}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand._id}>
              <div className="text-center h-auto ">
                <Link href={{
                  pathname: '/brands/[id]',
                  query: { id: brand._id }
                }} as={`/brands/${brand._id}`}>
                  <Image
                    src={brand.image}
                    width={200}
                    height={200}
                    className="w-auto inline-block cursor-pointer"
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
