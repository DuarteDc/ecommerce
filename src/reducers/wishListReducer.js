import { types } from "../types";

const initialState = {
    wishList: [],
    products: [],
    allProducts: []
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
                allProducts: state.products.filter(product => product._id !== payload),
                wishList: state.wishList.filter(product => product.product_id !== payload),
            }

        }

        case types.add_one_product_from_wishList: {
            return {
                ...state,
                wishList: [...state.wishList, { product_id: payload }],
            }
        }

        case types.remove_one_product_from_wishList: {
            return {
                ...state,
                wishList: state.wishList.filter(product => product.product_id !== payload),
                products: state.products.filter(product => product._id !== payload),
                allProducts: state.allProducts.filter(product => product._id !== payload),
            }
        }

        case types.search_product: {
            return {
                ...state,
                products: payload
            }
        }

        case types.load_wishList_from_back:
            return {
                ...state,
                products: payload,
                allProducts:payload,
            }

        default:
            return state;
    }
}