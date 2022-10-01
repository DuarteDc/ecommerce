import { useSelector } from "react-redux"
import CartItems from "./CartItems"

const CartMobile = ({ cart }) => {

    const { logged } = useSelector(state => state.auth)

    return (
        <div className="py-2 max-h-[500px] overflow-y-auto">
            {
                cart?.map(({ product_id, quantity }) => (
                    <CartItems
                        key={product_id}
                        product={product_id}
                        quantity={quantity}
                        logged={logged}
                        cart={cart}
                    />
                ))
            }
        </div>
    )
}

export default CartMobile