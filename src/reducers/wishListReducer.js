import { types } from "../types";

const initialState = {
    wishList: [],
    products: [],
}
export const wishListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadWishListfromLocalStorage:
            return {
                ...state,
                wishList: payload
            }

        case types.delete_product_from_wishList: {
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload),
            }

        }

        case types.load_wishList_from_back:
            return {
                ...state,
                products: payload
            }

        default:
            return state;
    }
}