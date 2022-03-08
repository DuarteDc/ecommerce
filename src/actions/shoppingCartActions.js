import { types } from "../types";


export const loadState = () => {
    try {
        return JSON.parse(localStorage.getItem('cart'));
    } catch (error) {
        return;
    }
}


export const newProduct = (product, value) => ({
    type: types.add_to_cart,
    payload: {
        product,
        value
    }
})

export const deleteProduct = (product_id) => ({
    type: types.remove_all_from_cart,
    payload: {
        product_id
    }
})

export const addOneProduct = ({ product, value }) => ({
    type: types.add_one_from_cart,
    payload: {
        product,
        value
    }
})

export const deleteOneProduct = ({ product, value }) => ({
    type: types.remove_one_from_cart,
    payload: {
        product,
        value
    }
})

export const clearCart = () => ({
    type: types.clear_cart,
})