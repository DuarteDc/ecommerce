import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductSelected } from "../../actions/productsAction";
import { priceFormat } from "../../helpers/helpers";
import { useModal } from "../../hooks/useModal";
import ShowProduct from "../products/ShowProduct";
import Item from '../../../public/assets/images/item.jpg';

const Card = ({ product }) => {

    const dispatch = useDispatch();

    const [isOpen, openModal, CloseModal] = useModal();

    const price = priceFormat(product?.price || 0);

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product));
    }
    return (
        <article className="my-10 w-10/12 mx-auto relative  h-[44rem] hover:scale-[1.01] transition-all duration-500 ease-in-out border-2 border-gray-200">
            <div className="overflow-hidden cursor-pointer h-1/2 w-full" onClick={() => handleClickModal(product)}>
                <Image
                 src={Item}
                 className="object-fill"
                 width={720}
                 height={960}
                />
            </div>
            <div className="px-4 mt-1 mb-4">
                <p className="text-xl font-bold">{product?.name}</p>
                <p className="text-md font-light">{product?.short_description}</p>
                <p className="text-lg font-semibold">{price}</p>
                <button className="w-full border-2 text-black border-black py-2 mt- font-bold hover:bg-black hover:text-white transition-all duration-500 ease-in-out">
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