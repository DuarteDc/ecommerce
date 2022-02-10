import { types } from "../types";

const initialState = {
    cart: []
}

export const shoppingCartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.add_to_cart: {
            let productInCart = state.cart.find((item) => item.product._id === payload.product._id);
            return productInCart ? {
                ...state,
                cart: state.cart.map((item) =>
                    item.product._id === payload.product._id
                        ? { ...item, value: item.value + payload.value }
                        : { ...item }
                )
            } : {
                ...state,
                cart: [...state.cart, payload]
            }
        }
        case types.remove_all_from_cart: {
            let removeAll = state.cart.filter((item) => item.product._id !== payload.product_id)
            return {
                ...state,
                cart: [...removeAll]
            }
        }
        case types.add_one_more_to_cart: {
            let addOneMore = state.cart.filter((item) => item.product._id = payload.product._id);
            console.log(addOneMore);
            return {
                ...state,
            }
        }
        case types.clear_cart: {
            return initialState
        }
        default:
            return state;
    }
}