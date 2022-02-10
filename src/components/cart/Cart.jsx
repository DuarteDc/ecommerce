import { useState } from "react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from '../../actions/shoppingCartActions';

const Cart = () => {
    const { cart } = useSelector((state) => state.cart);
    const [state, setState] = useState({
        right: false,
    });

    const dispatch = useDispatch();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const deleteAllProducts = () => {
        dispatch(clearCart());
    }

    return (
        <div>
            <ShoppingCartIcon onClick={toggleDrawer('right', true)} />
            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                <Box sx={{ width: 250 }} sx={{ width: 700 }}>
                    <span className="flex flex-row-reverse" onClick={deleteAllProducts}>Limpiar todo</span>
                    {cart.map((item, index) => (
                        <CartItem item={item} key={index} />
                    ))}
                </Box>
            </Drawer>
        </div>
    )
}

export default Cart