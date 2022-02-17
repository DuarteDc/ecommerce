import { useState } from "react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartItem from "./CartItem";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from '../../actions/shoppingCartActions';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageCart from "./ImageCart";


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
                <Box className="p-5 flex flex-col justify-between hoverflow-hidden">
                    <span className="flex flex-row-reverse">
                        <CloseIcon onClick={toggleDrawer('right', false)} />
                    </span>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                        <p className="text-xl font-bold text-[#fa440a]">
                            <span>
                                <ShoppingBagIcon />
                            </span>
                            {cart.length} Items
                        </p>
                    </div>
                    <hr />
                    <span className="flex flex-row-reverse">
                        <p className="cursor-pointer text-red-600 font-bold underline decoration-1" onClick={deleteAllProducts}>
                            Remove all
                        </p>
                    </span>

                    {
                        cart.length > 0 ?
                            (

                                cart.map((item, index) => (
                                    <CartItem item={item} key={index} />
                                ))

                            ) :
                            (
                                <ImageCart />
                            )
                    }
                    {
                        cart.length > 0 && (
                            <div className="flex p-5 bg-red-500 rounded-lg items-center justify-between hover:bg-red-600 cursor-pointer" onClick={()=> console.log("Quiero pagar")}>
                                <p className="text-white font-bold">Proceder a pagar</p>
                                <span className="bg-white rounded-full text-center p-2 flex items-center">
                                    <ArrowForwardIcon />
                                </span>
                            </div>
                        )
                    }
                </Box>
            </Drawer>
        </div>
    )
}

export default Cart