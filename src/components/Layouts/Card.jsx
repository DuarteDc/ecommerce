import { useDispatch } from "react-redux";
import { addProductSelected } from "../../actions/productsAction";
import { priceFormat } from "../../helpers/helpers";
import { useModal } from "../../hooks/useModal";
import ShowProduct from "../products/ShowProduct";

const Card = ({ product }) => {

    const dispatch = useDispatch();

    const [isOpen, openModal, CloseModal] = useModal();

    const price = priceFormat(product?.price || 0);

    const handleClickModal = (product) =>{
      openModal();
      dispatch(addProductSelected(product));
    } 
  

    return (
        <>
            <article className="my-12 overflow-hidden w-10/12 border-2 mx-auto rounded-xl relative hover:scale-[1.01]">
                <div className="overflow-hidden cursor-pointer" onClick={()=>handleClickModal(product)}>
                    <span className="absolute bg-[#fa440a] text-white p-2 font-bold">
                        {product?.discount} %
                    </span>
                    <img src={product.principal_image} className="object-contain w-full h-full" />
                </div>
                <div className="px-4 mt-4 mb-4">
                    <p className="text-xl">{product?.name}</p>
                    <p className="text-md font-light">{product?.short_description}</p>
                    <p className="text-lg font-bold">{price}</p>
                    <p className="float-right semibold">{product?.quantity}</p>
                    <button className="w-full bg-wine py-2 mt-2 text-white font-bold hover:bg-[#ff9f30] rounded-lg">
                        Add to card
                    </button>
                </div>
                <ShowProduct 
                  isOpen={isOpen} 
                  openModal={openModal} 
                  CloseModal={CloseModal} 
                />
            </article>
        </>
    )
}

export default Card;