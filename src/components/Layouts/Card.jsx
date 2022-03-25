import Image from "next/image";
import { useDispatch } from "react-redux";

import { addProductSelected } from "../../actions/productsAction";
import { newProduct } from "../../actions/shoppingCartActions";
import { priceFormat, successNotify } from "../../helpers/helpers";
import { useModal } from "../../hooks/useModal";

import ShowProduct from "../products/ShowProduct";

const Card = ({ product }) => {    

    const dispatch = useDispatch();

    const [isOpen, openModal, closeModal] = useModal();

    const price = priceFormat(product?.price || 0);

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product));
    }

    const addOneFromCart = (product, value) => {
        dispatch(newProduct(product, value));
        successNotify("El producto se agrego al carrito");
    }


    return (
        <article className="my-10 w-10/12 mx-auto relative border-gray-200 min-h-[38rem] hover:scale-[1.01] transition-all duration-500 ease-in-out animate__animated animate__fadeIn">
            <div className="hover:first:flex overflow-hidden cursor-pointer h-2/3 w-full relative"
                onClick={() => handleClickModal(product)}
            >
                <Image
                    className="object-fill w-full h-full"
                    src={product?.multimedia[0]?.path}
                    alt={product?.name}
                    layout="fill"
                    priority
                />
                {
                    product.discount > 0 && (
                        <span className="absolute py-2 px-4 bg-red-500 text-white font-bold">
                            %{product.discount}
                        </span>
                    )
                }
            </div>
            <div className="px-4 mt-5 mb-4">
                <p className="text-xl font-bold truncate">{product?.name}</p>
                <p className="text-sm font-light truncate">{product?.short_description}</p>
                <p className="text-lg font-semibold">{price}</p>
                <button className="w-full border-2 text-black border-black py-2 mt-6 font-bold hover:bg-black hover:text-white transition-all duration-500 ease-in-out uppercase"
                    onClick={() => { addOneFromCart(product, 1); }}
                >
                    Añadir al carrito
                </button>
            </div>
            <ShowProduct
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
            />
        </article>
    )
}

export default Card;