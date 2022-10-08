import ClearIcon from '@mui/icons-material/Clear';

import { ButtonGroup } from '../../ui';
import { useCart } from '../../../hooks/useCart';

import { helpers } from '../../../helpers';


const CartItems = ({ product, quantity, logged, cart }) => {

    const { updateProductQuantity, handleChangeProductQuantity, removeProduct, quantity: inputQuantity } = useCart(logged, quantity, product, cart);

    const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product.discount, product.price * quantity);
    const total = helpers.priceFormat(totalWithDiscountApply);
    const price = helpers.priceFormat(product.price);

    return (
        <div className="mb-1 text-xs flex shadow-lg justify-between overflow-hidden grid grid-cols-3 relative p-[1px]">
            <img
                src={product.multimedia[0].path}
                alt={product.name}
                width="100"
                height="100"
            />
            
            <div className="flex flex-col justify-center truncate items-center">

                <div>
                    <ButtonGroup
                        quantity={inputQuantity}
                        increaseDecreaseQuantityProduct={updateProductQuantity}
                        handleChangeQuantity={handleChangeProductQuantity}
                        product={product}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">{price}</p>
                <p className="font-bold text-[#e91e63] text-sm">{total}</p>
            </div>
            <ClearIcon
                onClick={removeProduct}
                className="absolute right-1 top-1 cursor-pointer" sx={{ fontSize: 20 }}
            />
        </div>
    )
}

export default CartItems