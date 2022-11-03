import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addProductToShoppingCart, startAddProductShoppingCart, startRemoveProductShoppingCart, startRemoveProductsShoppingCartNotLogged, startUpdateCartNoAuth, startUpdatedProductQuantity } from '../actions/shoppingCartActions';

import { helpers } from '../helpers';
import { warningNotify, notify, successNotify } from '../helpers/helpers';
import { useDebounce } from './useDebounce';

import Cookies from 'js-cookie';

export const useCart = (logged = false, currentQuantity = 1, product = {}, cart, type = 1, isAdd = false, timeToUpdate = 300) => {

    const dispatch = useDispatch();
    const { existInShoppingCart, prepareCartDataForLocalStorage, prepareProductsToFussion } = helpers;

    const [quantity, setQuantity] = useState(currentQuantity);
    const [updatedQuantity, setUpdatedQuantity] = useState(false);
    const [productInCart, setProductInCart] = useState(false);
    const update = useDebounce(quantity, timeToUpdate);


    const currency = Cookies.get('Currency') || 'MXN';

    const updateCart = (product_id, quantity = 1) => {

        if (logged) return dispatch(startUpdatedProductQuantity({ product_id, quantity: quantity || 1 }));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.map(cart => cart?.product_id?._id === product_id ? { ...cart, quantity: cart.quantity = quantity || 1 } : cart);

        const newCart = prepareProductsToFussion(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(startUpdateCartNoAuth(newCart, currency, { product_id, quantity: quantity || 1 }));
    }

    const handleChangeProductQuantity = ({ target }) => {
        if (target.value > product.quantity) {
            warningNotify(`Cantidad disponible: ${product.quantity}`);
            return setQuantity(product.quantity);
        }

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
            else {
                warningNotify(`Cantidad disponible: ${product.quantity}`);
                setUpdatedQuantity(false)
            }
    }

    const removeProduct = () => {
        if (logged) return dispatch(startRemoveProductShoppingCart(product._id));
        dispatch(startRemoveProductsShoppingCartNotLogged(product._id));
    }

    const addProduct = () => {
        const productInCart = existInShoppingCart(product._id, cart);
        
        if (logged)
            return dispatch(startAddProductShoppingCart({ product_id: product._id, quantity: quantity || 1 }, product));

        const newCart = [];
        const product_id = prepareCartDataForLocalStorage(product);

        dispatch(addProductToShoppingCart({ product_id, quantity: quantity || 1 }));
        if (!productInCart)
            newCart = [...cart, { product_id, quantity: quantity || 1 }];
        else
            newCart = cart.map(cart => cart.product_id._id === product._id ? { ...cart, quantity: cart.quantity = quantity || 1 } : cart);

        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    useEffect(() => {
        const productInShoppingCart = existInShoppingCart(product?._id, cart);
        setProductInCart(productInShoppingCart);
        if (!productInShoppingCart) return;
        const { quantity } = cart.find(p => p.product_id._id === product?._id);
        setQuantity(quantity)
    }, [cart, logged]);

    useEffect(() => {
        if (updatedQuantity && quantity && isAdd) {
            const product_id = product._id;
            updateCart(product_id, quantity);
        }
    }, [update]);

    return { updateProductQuantity, addProduct, removeProduct, handleChangeProductQuantity, quantity, productInCart }
}
