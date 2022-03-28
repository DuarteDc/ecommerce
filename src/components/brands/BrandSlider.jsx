import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";


import { CardProduct } from "../ui/cardProduct";

import Link from "next/link";

import ShowProduct from '../products/ShowProduct'
import { useModal } from '../../hooks/useModal'
import { addProductSelected } from "../../actions/productsAction";
import { useDispatch } from "react-redux";

const BrandSlider = ({ brand }) => {

    const dispatch = useDispatch();

    const [isOpen, openModal, closeModal] = useModal();

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product))
    }

    return (
        <section className="my-32 font-bold text-gray-900" key={brand._id}>
            <div className="flex justify-between items-center text-gray-500 text-sm">
                <h2 className="text-xl mb-4 uppercase">{brand.name}</h2>
                <Link href={{
                    pathname: '/marcas/[...name]',
                    query: { name: [brand.name, brand._id] }
                }}>
                    <a className="cursor-pointer hover:text-black transition-all duration-700 ease-in-out">Ver mas...</a>
                </Link>
            </div>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={2}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    className={"mySwiper"}
                    modules={[Pagination]}
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
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                >

                    {
                        brand.products.map(product => (
                            <SwiperSlide
                                key={product._id}
                            >
                                <CardProduct
                                    image={product.multimedia[0]?.path}
                                    product={product}
                                    handleClickModal={(product) => handleClickModal(product)}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <ShowProduct
                isOpen={isOpen}
                closeModal={closeModal}
            />
        </section >
    )
}

export default BrandSlider