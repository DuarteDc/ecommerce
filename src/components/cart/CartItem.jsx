import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { deleteProduct } from '../../actions/shoppingCartActions';
const CartItem = ({ item }) => {
    const { product } = item;
    const dispatch = useDispatch();

    const deleteToCart = (product_id) =>{        
        dispatch(deleteProduct(product_id));
    }
    return (
        <div className="p-2">
            <div className="border-2 border-black rounded-lg">
                <div>
                    <span className="flex flex-row-reverse cursor-pointer" onClick={()=>deleteToCart(product._id)}>
                        <CloseIcon />
                    </span>
                </div>
                <div className='flex flex-row'>
                    <div className="w-32 mr-4">
                        <img src={product?.principal_image} alt="" className="w-full" />
                    </div>
                    <div>
                        <p className="font-bold text-xl">{product?.name}</p>
                        <p className="text-lg">{product?.short_description}</p>
                        <p className="font-bold text-xl">${product?.price}</p>
                        <p className="font-bold">x{item?.value}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem 
