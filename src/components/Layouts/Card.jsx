import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { addProductSelected } from "../../actions/productsAction";
import { priceFormat } from "../../helpers/helpers";
import { useModal } from "../../hooks/useModal";
import ShowProduct from "../products/ShowProduct";
import Item from '../../../public/assets/images/item.jpg';


const Card = ({ product }) => {

    const dispatch = useDispatch();
    const img = useRef();
    const [isOpen, openModal, CloseModal] = useModal();
    const price = priceFormat(product?.price || 0);

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product));
    }

    const handleHoverImg = ({ target }) => {
        if (product?.multimedia?.length > 0) {
            target.src = product?.multimedia[0]?.path
        } else {
            target.src = product?.principal_image
        }
    }

    const handleInitialImg = () => {
        img.current.src = product?.principal_image
    }


    return (
        <article className="my-10 w-10/12 mx-auto relative border-gray-200 h-[38rem] hover:scale-[1.01] transition-all duration-500 ease-in-out">
            <div className="
                hover:first:flex overflow-hidden cursor-pointer h-2/3 w-full h-full relative"
                onClick={() => handleClickModal(product)}
            >
                <img
                    className="object-fill w-full h-full"
                    src={product?.principal_image}
                    alt={product?.name}
                    ref={img}
                    onMouseOver={handleHoverImg}
                    onMouseOut={handleInitialImg}
                />
            </div>
            <div className="px-4 mt-5 mb-4">
                <p className="text-xl font-bold">{product?.name}</p>
                <p className="text-md font-light">{product?.short_description}</p>
                <p className="text-lg font-semibold">{price}</p>
                <button className="w-full border-2 text-black border-black py-2 mt-6 font-bold hover:bg-black hover:text-white transition-all duration-500 ease-in-out">
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