import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { deleteProduct, deleteOneProduct, addOneProduct } from '../../actions/shoppingCartActions';
const CartItem = ({ item }) => {
    const { product } = item;
    const dispatch = useDispatch();

    const deleteToCart = (product_id) => {
        dispatch(deleteProduct(product_id));
    }

    const removeOneFromCart = (item) => {
        dispatch(deleteOneProduct(item));
    }

    const addOneFromCart = (item) => {
        dispatch(addOneProduct(item));
    }

    return (
        <div className="p-2">
            <div className="border-4 border-[#fa440a] rounded-lg">
                <div className='flex justify-between'>
                    <div className='flex flex-row'>
                        <div className="w-24 mr-4">
                            <img src={product?.principal_image} alt={product?.name} className="w-full" />
                        </div>
                        <div className="py-4 flex flex-col justify-between">
                            <p className="font-bold text-xl">{product?.name}</p>
                            <p>{product?.short_description}</p>
                            <p className="font-bold">${product?.price} x {item?.value} = ${product.price * item.value}</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <button onClick={() => removeOneFromCart(item)} className="bg-[#f58d16] font-bold py-2 px-4 text-white rounded mx-10">-</button>
                        <button onClick={() => addOneFromCart(item)} className="bg-[#f58d16] font-bold py-2 px-4 text-white rounded">+</button>
                    </div>
                    <div>
                        <span className="flex flex-row-reverse cursor-pointer p-2" onClick={() => deleteToCart(product._id)}>
                            <CloseIcon />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem 
