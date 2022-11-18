
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import ClearIcon from '@mui/icons-material/Clear';

import ButtonGroup from '../../ui/buttonGroup';
import { useCart } from '../../../hooks/useCart';

import { helpers } from '../../../helpers';


const CartItems = ({ product, quantity, logged, cart }) => {

    const { updateProductQuantity, handleChangeProductQuantity, removeProduct, quantity: inputQuantity } = useCart(logged, quantity, product, cart, undefined, true);

    const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product.discount, product.price * quantity);
    const total = helpers.priceFormat(totalWithDiscountApply);
    const price = helpers.priceFormat(product.price);

    return (
        <div className="flex shadow-sm py-1 relative text-xs">
            <Zoom>
                <picture>
                    <img
                        src={product.multimedia[0].path}
                        alt={product.name}
                        width="100"
                        className="min-w-[6rem] min-h-[6rem] h-[7rem] w-[7rem]"
                        height="100"
                    />
                </picture>
            </Zoom>
            <div className="grid grid-cols-3 w-full">
                <div className="flex flex-col justify-center items-center col-span-2">
                    <span className="font-semibold truncate absolute top-3">
                        {product.name}
                    </span>
                    <ButtonGroup
                        quantity={inputQuantity}
                        increaseDecreaseQuantityProduct={updateProductQuantity}
                        handleChangeQuantity={handleChangeProductQuantity}
                        product={product}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className="">
                        <p className="font-semibold">{price}</p>
                        <p className="font-bold text-[#e91e63] text-sm">{total}</p>
                    </div>
                    <ClearIcon
                        onClick={removeProduct}
                        className="absolute right-1 top-1 cursor-pointer" sx={{ fontSize: 20 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CartItems