import Image from "next/image";
import { useDispatch } from "react-redux";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { addProductSelected } from "../../actions/productsAction";
import { newProduct } from "../../actions/shoppingCartActions";
import { priceFormat, successNotify } from "../../helpers/helpers";
import { useModal } from "../../hooks/useModal";

import ShowProduct from "../products/ShowProduct";

const Card = ({ product }) => {

    const dispatch = useDispatch();

    const [isOpen, openModal, closeModal] = useModal();

    const price = helpers.priceFormat(product?.price || 0);

    const handleClickModal = (product) => {
        openModal();
        dispatch(addProductSelected(product));
    }

    const addOneFromCart = (product, value) => {
        dispatch(newProduct(product, value));
        successNotify("El producto se agrego al carrito");
    }


    return (
        <article className="my-10 w-10/12 mx-auto relative border-gray-200 min-h-[34rem] animate__animated animate__fadeIn border-2">
            <div className="hover:first:flex overflow-hidden cursor-pointer h-3/4 w-full relative"
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
                        <span className="absolute py-2 px-4 bg-amber-800 text-white font-bold drop-shadow-lg">
                            %{product.discount}
                        </span>
                    )
                }
            </div>
            <div className="px-4 mt-5 mb-4">
                <div>
                    <p className="text-xl font-bold truncate text-gray-600">{product?.name}</p>
                    <p className="text-sm font-light truncate mt-1">{product?.short_description}</p>
                </div>
                <div className="flex justify-between mt-4">
                    <p className="text-lg font-semibold text-black">{price}</p>
                    <ShoppingCartIcon
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() => { addOneFromCart(product, 1); }}
                    />
                </div>
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