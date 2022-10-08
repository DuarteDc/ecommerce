
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { helpers } from '../../../helpers';
import { notify } from '../../../helpers/helpers';
import { useCart } from '../../../hooks/useCart';
import { addOneProduct, removeOneProduct } from '../../../actions/wishListActions';


const ProductCard = ({ product }) => {

    const { _id, name, price, url, quantity, discount } = product;

    const { logged } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const { addProduct, productInCart } = useCart(logged, 1, product, cart);

    const dispatch = useDispatch();
    const router = useRouter();

    const sale_price = helpers.priceFormat(product.price);
    const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product.discount, product.price);
    const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);

    const [isInWhisList, setisInWhisList] = useState(helpers.existInWishList(product._id));

    const handleShowProduct = () => {
        router.push(`/productos/${url}`);
    };

    const handleToogleWishList = (_id) => {
        const { message, existInWishList } = helpers.toggleWishListProducts(_id);
        setisInWhisList(!isInWhisList);
        notify(message);
        if (existInWishList) return dispatch(removeOneProduct(_id));
        dispatch(addOneProduct(_id));
    };

    return (
        <div className="shadow-md mx-auto w-full relative mb-3 animate__animated animate__zoomIn">
            <div className="flex justify-center itmes-center relative">
                <img
                    src={product.multimedia[0].path}
                    alt={name}
                    width="100"
                    className="min-w-[6rem] min-h-[6rem] h-[10rem] w-[10rem] cursor-pointer"
                    height="100"
                    onClick={handleShowProduct}
                />
                <span
                    className="absolute bottom-0 right-2 bg-gray-100 rounded-full px-1 py-[1px] z-20 flex items-center"
                >
                    {
                        discount > 0 && <p className="line-through  text-[10px]">{sale_price}</p>
                    }
                    <p className="text-sm px-1 text-[#e91e63] font-bold">{sale_price_discount}</p>

                </span>
            </div>
            <p
                className="text-xs px-2 truncate cursor-pointer"
                onClick={handleShowProduct}
            >
                {name}
            </p>
            <div className="flex items-center px-2 py-1 justify-between">
                <div onClick={addProduct}>
                    {
                        productInCart
                            ? (
                                <span className="text-xs bg-[#333] rounded-lg flex items-center text-white px-5 py-2" >
                                    Agregado
                                </span>
                            )
                            : (
                                <span className="text-xs border-[1px] border-[#333] rounded-lg flex items-center px-5 py-2 cursor-pointer" >
                                    <AddShoppingCartIcon
                                        sx={{ color: '#000', fontSize: 15 }}
                                        onClick={addProduct}
                                        className="mr-1"
                                    />
                                    Añadir
                                </span>
                            )
                    }
                </div>
                <span className="cursor-pointer bg-gray-100 rounded-full px-1 py-[1px]" onClick={() => handleToogleWishList(_id)}>
                    {
                        isInWhisList ? (
                            <FavoriteIcon
                                sx={{ fontSize: 20, color: '#ff0000' }}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{ color: '#bbb', fontSize: 20 }}
                            />
                        )
                    }
                </span>
            </div>
        </div>
    )
}

export default ProductCard; 