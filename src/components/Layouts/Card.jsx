import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductSelected } from "../../actions/productsAction";
import { priceFormat } from "../../helpers/helpers";
import { useModal } from "../../hooks/useModal";
import ShowProduct from "../products/ShowProduct";

const Card = ({ product }) => {

    const dispatch = useDispatch();

    const [isOpen, openModal, CloseModal] = useModal();

    const price = priceFormat(product?.price || 0);

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product));
    }
    return (
        <article className="my-10 w-10/12 mx-auto relative border-gray-200 h-[38rem] hover:scale-[1.02] transition-all duration-500 ease-in-out border-2 border-gray-200">
            <div className="overflow-hidden cursor-pointer h-2/3 w-full" onClick={() => handleClickModal(product)}>
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX472_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1570119352353" className="object-fill w-full h-full" />
            </div>
            <div className="px-4 mt-8 mb-4">
                <p className="text-xl font-bold">{product?.name}</p>
                <p className="text-md font-light">{product?.short_description}</p>
                <p className="text-lg font-semibold">{price}</p>
                <button className="w-full border-2 text-black border-black py-2 mt-5 text-white font-bold hover:bg-black hover:text-white transition-all duration-700 ease-in-out">
                    ADD TO CART
                </button>
            </div>
            <ShowProduct
                isOpen={isOpen}
                openModal={openModal}
                CloseModal={CloseModal}
            />
        </article>
    )
}

export default Card;