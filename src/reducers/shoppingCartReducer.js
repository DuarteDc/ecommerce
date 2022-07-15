import { types } from "../types";

const initialState = {
    cart: [],
    cartNotLogged: [],
    coupon: '',
    subtotalWithCoupon: 0,
    subtotal: 0,
    total: 0,
    superTotal: {},
    withDiscount: {},
    withoutDiscount: {},
    canvas: {},
    business_rule:{},
    shipping_costs: {},
    order_id: '',
    success: false,
    shippingAddress: [],
    BusinessRules: [],
    addressSelected: {}
}

export const shoppingCartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.addProductShoppingCart:
            return {
                ...state,
                cart: payload
            }
        case types.calculateTotalShoppingCart:
            return {
                ...state,
                subtotalWithCoupon: payload.subtotalWithCoupon,
                subtotal: payload.subtotalCart,
                total: payload.total,
                shipping_costs: payload.shippingSelected
            }
        case types.finaliceCheckoutCart:
            return {
                ...state,
                superTotal: payload.superTotal,
                withDiscount: payload.withDiscount,
                withoutDiscount: payload.withoutDiscount,
                order_id: payload.order_id,
                canvas: payload.canvasTotals,
                coupon: payload.coupon,
                success: true
            }
        case types.loadTotalsFromCookies:
            return {
                ...state,
                superTotal: payload.superTotal,
                withDiscount: payload.withDiscount,
                withoutDiscount: payload.withoutDiscount,
                shipping_costs: payload.shippingCosts,
                order_id: payload.order_id,
                canvas: payload.canvasTotals,
                business_rule: payload.business_rule,
                coupon: payload.coupon,
            }
        case types.removeProductShoppingCart:
        case types.loadShoppingCart:
        case types.updatedShoppingCart:
        case types.loadShoppingCartFromLocalStorage:
        case types.loadShoppingCartFussion:
        case types.updatedProductQuantity:
            return {
                ...state,
                cart: payload,
                cartNotLogged: []
            }
        case types.loadShoppingCartNotLoggedFromLocalStorage:
        case types.addProductShoppingCartNoLoggued:
            return {
                ...state,
                cartNotLogged: payload,
                cart: [],
            }
        case types.updatedProductQuantityCartNotLogged:
            return {
                ...state,
                cartNotLogged: state.cartNotLogged.map(product => product.product_id._id === payload.product_id._id ? payload : product)
            }
        case types.deleteProductShoppingCartNotLogged:
            return {
                ...state,
                cartNotLogged: state.cartNotLogged.filter((cart) => cart.product_id._id !== payload)
            }
        case types.loadDirectionsShoppingCart:
            return {
                ...state,
                shippingAddress: payload
            }
        case types.addAddressSelected:
            return {
                ...state,
                addressSelected: payload
            }
        case types.addDirectionInCart:
            return {
                ...state,
                shippingAddress: [...state.shippingAddress, payload]
            }

        case types.add_coupon:

            return {
                ...state,
                subtotal: payload.subtotal,
                coupon: payload.coupon,
            }

        case types.remove_coupon:
            return {
                ...state,
                coupon: initialState.coupon
            }

        case types.removeAddressFromCart:
            return {
                ...state,
                addressSelected: ''
            }

        case types.load_business_rules:
            return {
                ...state,
                BusinessRules: payload,
            }

        default:
            return state;
    }
}