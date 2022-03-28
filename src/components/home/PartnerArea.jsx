import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
/**tags */

export const PartnerArea = () => {
  const { brands } = useSelector((state) => state.brands);
  return (
    <section className="bg-[#f5f5f5] py-8 m-auto">
      <div className="mx-auto px-6 max-w-[1420px] flex justify-around ">
          {brands.map((brand) => (
              <div className="text-center h-auto " key={brand._id}>
                <Link href={{
                  pathname: '/marcas/[name]',
                  query: { id: brand._id },
                }}
                  as={`/marcas/${brand.name}`}
                >
                  <Image
                    src={brand.image}
                    width={100}
                    height={100}
                    className="w-auto inline-block cursor-pointer"
                  />
                </Link>
              </div>
               ))}
      </div>
    </section>
  );
};
