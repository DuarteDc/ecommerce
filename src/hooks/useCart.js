import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addProductToShoppingCart, startAddProductShoppingCart, startRemoveProductShoppingCart, startRemoveProductsShoppingCartNotLogged, startUpdateCartNoAuth, startUpdatedProductQuantity } from '../actions/shoppingCartActions';

import { helpers } from '../helpers';
import { notify } from '../helpers/helpers';
import { useDebounce } from './useDebounce';

import Cookies from 'js-cookie';

export const useCart = (logged = false, currenQuantity = 1, product = {}, cart, type = 1) => {

    const dispatch = useDispatch();
    const { SweetAlert, calculateTotalOfCart, existInShoppingCart, prepareCartDataForLocalStorage, prepareProductsToFussion } = helpers;

    const [quantity, setQuantity] = useState(currenQuantity);
    const [updatedQuantity, setUpdatedQuantity] = useState(false);
    const [productInCart, setProductInCart] = useState(false);
    const update = useDebounce(quantity, 300);

    const currency = Cookies.get('Currency') || 'MXN';

    const updateCart = (product_id, quantity) => {

        if (logged) return dispatch(startUpdatedProductQuantity({ product_id, quantity }));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.map(cart => cart?.product_id?._id === product_id ? { ...cart, quantity: cart.quantity = quantity } : cart);

        const newCart = prepareProductsToFussion(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(startUpdateCartNoAuth(newCart, currency, { product_id, quantity }));
    }

    const handleChangeProductQuantity = ({ target }) => {
        if (target.value.length < 1) return setQuantity(1);

        if (target.value > product.quantity) return setQuantity(product.quantity);

        const quantity = target.value.replace(/^0+/, '');
        setQuantity(quantity);
        setUpdatedQuantity(true);
    }

    const updateProductQuantity = (value = 1) => {
        if (value === -1)
            if (product.quantity >= 1 && quantity >= 2) {
                setQuantity(prev => Number(prev) - 1);
                setUpdatedQuantity(true);
            }
            else setQuantity(1);
        else
            if (product.quantity > 0 && product.quantity > quantity) {
                setQuantity(prev => +prev + 1);
                setUpdatedQuantity(true);
            }
            else setUpdatedQuantity(false);
    }

    const removeProduct = () => {
        if (logged) return dispatch(startRemoveProductShoppingCart(product._id));
        dispatch(startRemoveProductsShoppingCartNotLogged(product._id));
    }

    const addProduct = () => {
        const productInCart = existInShoppingCart(product._id, cart);
        if (productInCart && type === 1) return notify('El producto ya ha sido agregado al carrito de compras');

        if (logged)
            return dispatch(startAddProductShoppingCart({ product_id: product._id, quantity }, product));

        const newCart = [];
        const product_id = prepareCartDataForLocalStorage(product);

        dispatch(addProductToShoppingCart({ product_id, quantity }));
        if (!productInCart)
            newCart = [...cart, { product_id, quantity }];
        else
            newCart = cart.map(cart => cart.product_id._id === product._id ? { ...cart, quantity: cart.quantity = quantity } : cart);

        localStorage.setItem('cart', JSON.stringify(newCart));
        SweetAlert(
            undefined,
            '¡¡Buen Trabajo!!',
            `<p>El producto ha sido agregado al carrito satisfactoriamente</p>`
        )
    }

    useEffect(() => {
        setProductInCart(existInShoppingCart(product?._id, cart))
    }, [logged, cart]);

    useEffect(() => {
        if (updatedQuantity && quantity) {
            const product_id = product._id;
            updateCart(product_id, quantity);
        }
    }, [update]);

    return { updateProductQuantity, addProduct, removeProduct, handleChangeProductQuantity, quantity, productInCart }
}
