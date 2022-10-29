import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../ui";

import ProductCardMobile from "../ui/Mobile/ProductCard";

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const ProductSlider = ({ products, name, categories, brand_id, search, brand_url }) => {

    const router = useRouter();
    const { dimensions } = useSelector(state => state.ui);

    const showMore = () => {

        const { category_id } = router.query;

        if (!category_id) return router.push(`/marcas/${brand_url}`);

        router.push({
            pathname: `/marcas/${brand_url}`,
            query: { category_id }
        })
    }

    return (
        <div className="w-full inline-block">
            <div className="bg-gray-100 py-3 text-center">
                <span className="w-full text-base md:text-lg lg:text-[26pxgit ] text-[#000]  text-center font-Poppins uppercase">{name} </span>
            </div>
            <div className="text-xs w-full md:text-base lg:text-lg pb-4 pt-4 ">
                {
                    categories.map(({ _id, name }) => (
                        <span onClick={() => search(brand_id, _id)}
                            key={_id}
                            className="cursor-pointer hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 inline-block">
                            {name}
                        </span>
                    ))
                }
            </div>
            <Swiper
                watchSlidesProgress={true}
                slidesPerView={4.4}
                breakpoints={{
                    0: {
                        slidesPerView: 2.2,
                        spaceBetween: 2,
                    },
                    380: {
                        slidesPerView: 2.2,
                        spaceBetween: 5,
                    },
                    640: {
                        slidesPerView: 2.2,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 5,
                    },
                    1024: {
                        slidesPerView: 3.3,
                        spaceBetween: 5,
                    },
                    1280: {
                        slidesPerView: 4.3,
                        spaceBetween: 5,
                    }
                }}
                className="mySwiper"
            >

                {products?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div>
                            {/* {dimensions === 'sm' ? (
                                <ProductCardMobile
                                    product={product} />
                            ) : ( */}
                            <ProductCard
                                product={product}
                            />
                            {/* )} */}
                        </div>
                    </SwiperSlide>
                ))}
                {
                    products.length > 0 && (
                        <SwiperSlide className="flex items-start top-12 md:top-36  lg:min-h-[30rem] justify-center" onClick={showMore}>
                            <div className="text-pink-600 border-2 border-[#e91e63] px-6 md:px-14 py-2 cursor-pointer hover:bg-[#e91e63] hover:text-white rounded-full flex flex-col items-center transition-all duration-700 ease-in-out text-xs md:text-xl">
                                <KeyboardDoubleArrowRightIcon />
                                <span className="font-semibold">Ver más</span>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}