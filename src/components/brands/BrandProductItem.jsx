import { useDispatch } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { addProductSelected } from "../../actions/productsAction";
import { CardProduct2 } from "../ui/cardProduct2";

const BrandProductItem = ({ openModal, product }) => {

    const dispatch = useDispatch();

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product))
    }

    return (
        <SwiperSlide>
            <CardProduct2
                image={product.multimedia[0]?.path}
                product={product}
                handleClickModal={(product) => handleClickModal(product)}
            />
        </SwiperSlide>
    )
}

export default BrandProductItem