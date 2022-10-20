import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../ui";

import ProductCardMobile from "../ui/Mobile/ProductCard";
import { startLoadCategoriesWithProducts } from "../../actions/brandsActions";

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const ProductSlider = ({ products, name, categories, brand_id }) => {

    const router = useRouter();

    const { dimensions } = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const categoriesSearch = async (brand_id, category_id) => {
        await dispatch(startLoadCategoriesWithProducts(category_id, brand_id))
        router.push({
            pathname: '/',
            query: { 'category_id': category_id },
        },
            undefined, { shallow: true }
        )
    }

    return (
        <div className="w-full inline-block">
            <div>
                <span className="w-full text-base md:text-lg lg:text-[26pxgit ] text-[#000] font-Poppins uppercase">{name} </span>
            </div>
            <div className="text-xs w-full md:text-base lg:text-lg pb-2 ">
                {
                    categories.map(({ _id, name }) => (
                        <span onClick={() => categoriesSearch(brand_id, _id)}
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
                        slidesPerView: 2.3,
                        spaceBetween: 2,
                    },
                    380: {
                        slidesPerView: 2.3,
                        spaceBetween: 5,
                    },
                    640: {
                        slidesPerView: 2.3,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3.3,
                        spaceBetween: 5,
                    },
                    1024: {
                        slidesPerView: 4.3,
                        spaceBetween: 5,
                    }
                }}
                className="mySwiper"
            >

                {products?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div>
                            {dimensions === 'sm' ? (
                                <ProductCardMobile
                                    product={product} />
                            ) : (
                                <ProductCard
                                    product={product}
                                />
                            )}
                        </div>
                    </SwiperSlide>
                ))}
                {
                    products.length > 0 && (
                        <SwiperSlide className="flex items-center lg:min-h-[30rem] justify-center">
                            <div className="text-pink-600 border-2 border-[#e91e63] px-14 py-2 cursor-pointer hover:bg-[#e91e63] hover:text-white rounded-full flex flex-col items-center transition-all duration-700 ease-in-out">
                                <KeyboardDoubleArrowRightIcon sx={{ fontSize: 35 }} />
                                <span className="font-semibold">Ver más</span>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}