import { types } from "../types";
import client from "../config/axiosConfig";

export const loadWishListfromLocalStorage = (wishList) => ({
    type: types.loadWishListfromLocalStorage,
    payload: wishList
});

export const deleteProduct = (product_id) => ({
    type: types.delete_product_from_wishList,
    payload: product_id,
});

export const addOneProduct = (product_id) =>({
    type: types.add_one_product_from_wishList,
    payload:product_id,
});

export const removeOneProduct = (product_id) =>({
    type: types.remove_one_product_from_wishList,
    payload:product_id,
});

export const searcProduct = (products) =>({
    type: types.search_product,
    payload:products,
})

export const startLoadProducts = (wishList) => {
    return async (dispatch) => {
        try {
            const url = '/cart/show/no-auth';
            const res = await client.post(url, { products: wishList });
            dispatch(loadProducts(res.data.products));
            return true;
        } catch (error) {
            return false;
        }
    }
}

export const loadProducts = (products) => ({
    type: types.load_wishList_from_back,
    payload: products,
})