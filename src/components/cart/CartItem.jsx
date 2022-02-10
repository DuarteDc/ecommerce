import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { deleteProduct, addOneMore } from '../../actions/shoppingCartActions';
const CartItem = ({ item }) => {
    const { product } = item;
    const dispatch = useDispatch();

    const deleteToCart = (product_id) => {
        dispatch(deleteProduct(product_id));
    }
    return (
        <div className="p-2">
            <div className="border-2 border-gray-300 rounded-lg bg-gray-100">
                <div className='flex justify-between'>
                    <div className='flex flex-row'>
                        <div className="w-24 mr-4">
                            <img src={product?.principal_image} alt={product?.name} className="w-full" />
                        </div>
                        <div className="py-2">
                            <p className="font-bold text-xl">{product?.name}</p>
                            <p className="font-bold">${product?.price} x {item?.value} = ${product.price * item.value}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>addOneMoreToCart(product)}>+</button>
                        <button>-</button>
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
