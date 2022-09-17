import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { startAddProductShoppingCart, startRemoveProductShoppingCart, startRemoveProductsShoppingCartNotLogged, startUpdatedProductQuantity, addProductToShoppingCart } from '../actions/shoppingCartActions';

import { helpers } from '../helpers';
import { notify } from '../helpers/helpers';
import { useDebounce } from './useDebounce';

export const useCart = (logged = false, currenQuantity = 1, product = {}, cart) => {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(currenQuantity);
    const [updatedQuantity, setUpdatedQuantity] = useState(false);
    const update = useDebounce(quantity, 500);

    const updateCart = (product_id, quantity) => {

        if (logged) return dispatch(startUpdatedProductQuantity({ product_id, quantity }));



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
            if (product.quantity > 0 && quantity > 0) {
                setQuantity(prev => prev - 1);
                setUpdatedQuantity(true);
            }
            else setUpdatedQuantity(false);
        else
            if (product.quantity > 0 && product.quantity > quantity) {
                setQuantity(prev => prev + 1);
                setUpdatedQuantity(true);
            }
            else setUpdatedQuantity(false);
        helpers.calculateTotalOfCart();
    }

    const removeProduct = (id = '') => {
        if (logged) return dispatch(startRemoveProductShoppingCart(id));
        dispatch(startRemoveProductsShoppingCartNotLogged(id));
    }

    const addProduct = (setIsEnable) => {
        const productInCart = helpers.existInShoppingCart(product._id, cart);
        if (productInCart) return notify('El producto ya ha sido agregado al carrito de compras');
        if (logged) {
            dispatch(startAddProductShoppingCart({ product_id: product._id, currenQuantity }, product));
            setIsEnable(true);
        }
    }

    useEffect(() => {
        if (updatedQuantity && quantity) {
            const product_id = product._id;
            updateCart(product_id, quantity);
        }
    }, [update]);

    return { updateProductQuantity, addProduct, removeProduct, handleChangeProductQuantity, quantity }
}
