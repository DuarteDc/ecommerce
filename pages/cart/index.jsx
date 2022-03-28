import React, { useEffect, useState } from 'react'
import Layout from '../../src/components/Layouts'
import Router from 'next/router'

import { clearCart } from '../../src/actions/shoppingCartActions';
import { useDispatch, useSelector } from 'react-redux';
import CartDetails from '../../src/components/cart/CartDetails';

const Cart = () => {
    const dispatch = useDispatch();

    const [total, setTotal] = useState('');

    const { cart } = useSelector((state) => state.cart);

    const deleteAllProducts = () => {
        dispatch(clearCart());
    }

    const getTotalPrice = () => {

        /*if (cart.length > 0) {
            const initialValue = 0;
            const totalPrice = cart?.reduce((previousValue, currentValue) => ((previousValue.product.price * previousValue.value) + (currentValue.product.price * currentValue.value), initialValue));
            setTotal(totalPrice);
        }*/
        
        setTotal(0);
        
    }

    useEffect(() => {
        getTotalPrice();
    }, [cart]);

    return (
        <Layout>
            <section className="container mx-auto my-10">
                <p className="w-full bg-gray-50 py-4 text-center uppercase my-10 font-bold text-xl">Mi carrito</p>
                <div className="overflow-x-auto px-2 h-screen">
                    <span>
                        <p className="text-right cursor-pointer text-red-600 font-bold underline decoration-1 py-2"
                            onClick={deleteAllProducts}
                        >
                            Limpiar mi carrito
                        </p>
                    </span>
                    <CartDetails cart={cart} />
                    <div className="grid grid-col-1 lg:grid-cols-2 mt-12">
                        <div>
                            <button className="border-2 border-black px-4 py-2 uppercase hover:bg-black
                             hover:text-white transition-all duration-700 ease-in-out border-2"
                                onClick={() => Router.push('/productos')}
                            >
                                Continuar comprando
                            </button>
                        </div>
                        <div>
                            <div className="p-10">
                                <p className="text-lg text-center uppercase mb-5 font-semibold">Total en carrito</p>
                                <div className="border-black border-2">
                                    <div className="flex justify-between border-b-2 border-black px-2 py-3">
                                        <p className="font-semibold">Subtotal:</p>
                                        <p className="font-semibold text-gray-500">${total}</p>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-black px-2 py-3">
                                        <p className="font-semibold">Descuento:</p>
                                        <p className="font-semibold text-gray-500">%10</p>
                                    </div>
                                    <div className="flex justify-between px-2 py-3">
                                        <p className="font-semibold">Total:</p>
                                        <p className="font-semibold text-gray-500">$600</p>
                                    </div>
                                </div>
                                <button className="border-2 border-black px-4 py-2 uppercase bg-black text-white transition-all duration-700 ease-in-out border-2 hover:bg-white hover:text-black mt-5"
                                    onClick={() => Router.push('/checkout')}
                                >
                                    Proceder a pagar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Cart