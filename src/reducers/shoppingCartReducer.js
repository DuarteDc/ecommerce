import { loadState } from "../actions/shoppingCartActions";
import { types } from "../types";

const data = loadState();

const initialState = {
    cart: data || []
}

export const shoppingCartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.add_to_cart: {
            let productInCart = state.cart.find((item) => item.product._id === payload.product._id);
            return productInCart ? {
                ...state,
                cart: state.cart.map((item) => item.product._id === payload.product._id
                    ? (item.value + payload.value > payload.product.quantity) ? {
                        ...item, value: item.product.quantity
                    } : {
                        ...item, value: item.value + payload.value
                    }
                    : { ...item }
                )
            } : {
                ...state,
                cart: [...state.cart, payload],
            }
        }
        case types.remove_all_from_cart: {
            let removeProduct = state.cart.filter((item) => item.product._id !== payload.product_id)
            return {
                ...state,
                cart: [...removeProduct]
            }
        }
        case types.add_one_from_cart: {
            return payload.value < payload.product.quantity ? {
                ...state,
                cart: state.cart.map((item) =>
                    item.product._id === payload.product._id
                        ? { ...item, value: item.value + 1 }
                        : { ...item }
                )
            } : {
                ...state,
                cart: [...state.cart]
            }
        }
        case types.remove_one_from_cart: {
            return payload.value > 1 ? {
                ...state,
                cart: state.cart.map((item) =>
                    item.product._id === payload.product._id
                        ? { ...item, value: item.value - 1 }
                        : { ...item }
                )
            } : {
                ...state,
                cart: state.cart.filter((item) => item.product._id !== payload.product._id)
            }
        }
        case types.clear_cart: {
            localStorage.removeItem('cart')
            return {
                ...state,
            }
        }
        default:
            return state;
    }
}