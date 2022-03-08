import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const partner = [
  { id: 1, path: "/assets/Divas C.webp" },
  { id: 2, path: "/assets/Princess C.webp" },
  { id: 3, path: "/assets/Rebel C.webp" },
  { id: 4, path: "/assets/Tokyo C.webp" },
  { id: 5, path: "/assets/Wapizima C.webp" },
];
export const PartnerArea = () => {
  return (
    <section className="bg-[#f5f5f5] py-8">
      <div className="w-full m-auto px-6">
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
          {partner.map((part) => (
            <SwiperSlide key={part.id}>
              <div className="text-center h-auto">
                <button href={{
                  pathname: '/brands/[id]',
                  query: { id: part.id }
                }} as={`/brands/${part.id}`}>
                  <Image
                    src={part.path}
                    width={200}
                    height={150}
                    className="w-auto inline-block cursor-pointer"
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
