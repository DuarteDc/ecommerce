import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { deleteOneProduct, addOneProduct, deleteProduct } from '../../actions/shoppingCartActions';

const CartDetails = ({ cart }) => {

    const dispatch = useDispatch();

    const deleteToCart = (product_id) => {
        dispatch(deleteProduct(product_id));
    }

    const addOneFromCart = (item) => {
        dispatch(addOneProduct(item));
    }

    const removeOneFromCart = (item) => {
        dispatch(deleteOneProduct(item));
    }

    return (
        <table className="w-full">
            <thead className="text-left border-t-2 border-black border-b-2 uppercase py-10">
                <tr>
                    <th className="py-3">Producto</th>
                    <th className="py-3">Descripción</th>
                    <th className="py-3">Precio unitario</th>
                    <th className="py-3">Cantidad</th>
                    <th className="py-3">Total</th>
                    <th className="py-3"></th>
                </tr>
            </thead>
            <tbody>
                {
                    cart?.map((cart) => (
                        <tr className="border-b-2 border-black text-gray-500" key={cart.product._id}>
                            <td>
                                <img
                                    src={cart.product?.multimedia[0].path}
                                    alt={cart.product?.name}
                                    className="w-32 h-32"
                                />
                            </td>
                            <td>
                                <p className="font-bold text-gray-500">{cart.product?.name}</p>
                                <div className="flex mt-1">
                                    <p className="text-sm font-light">Marca:</p>
                                    <p className="text-sm font-semibold">{cart.product?.brand?.name}</p>
                                </div>
                                <div className="flex mt-1">
                                    <p className="text-sm font-light">Categoría:</p>
                                    <p className="text-sm font-semibold">{cart.product?.category?.name}</p>
                                </div>
                            </td>
                            <td>${cart.product.price}</td>
                            <td>
                                <button className="hover:text-white mx-1 hover:bg-black font-bold 
                                    px-3 py-1 border-2 border-black transition-all duration-700 ease-in-out mr-0"
                                    onClick={() => removeOneFromCart(cart)}
                                >-</button>
                                <span className="w-16 text-center font-bold px-5">{cart.value}</span>
                                <button className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-1 border-2 border-black transition-all duration-700 ease-in-out ml-0"
                                    onClick={() => addOneFromCart(cart)}
                                >+</button>
                            </td>
                            <td>${cart.product.price * cart.value}</td>
                            <td>
                                <DeleteOutlineIcon className="text-black cursor-pointer"
                                    onClick={() => deleteToCart(cart.product._id)}
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CartDetails