import { useSelector } from "react-redux"
import CartItems from "./CartItems"
import styles from '../../../components/styles.module.css';

const CartMobile = ({ cart }) => {

    const { logged } = useSelector(state => state.auth)

    return (
        <div className={`py-2 max-h-[500px] overflow-y-auto ${styles.scrollbar}`}>
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