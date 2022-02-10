import { types } from "../types";

export const newProduct = (product, value) => ({
    type: types.add_to_cart,
    payload: {
        product,
        value
    }
})

export const deleteProduct = (product_id) =>({
    type: types.remove_all_from_cart,
    payload: {
        product_id
    }
})

export const clearCart = () =>({
    type: types.clear_cart,
})