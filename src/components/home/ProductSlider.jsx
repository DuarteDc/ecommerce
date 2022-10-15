import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../ui";

import "swiper/css/pagination";
import { useSelector, useDispatch } from "react-redux";
import ProductCardMobile from "../ui/Mobile/ProductCard";
import { startLoadCategoriesWithProducts } from "../../actions/brandsActions";

export const ProductSlider = ({ products, name, categories, brand_id }) => {

    const { dimensions } = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const categoriesSearch = async (brand_id, category_id) => {
        await dispatch(startLoadCategoriesWithProducts(category_id, brand_id))
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
                    slidesPerView={4}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        0:{
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        380: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
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
                </Swiper>
        </div>
    )
}