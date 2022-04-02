import { types } from "../types";

const initialState = {
    cart: [],
    cartWithDiscount:[],
    cartWithOutDiscount:[],
    subtotal:0,
    total:0,
    superTotal:{},
    withDiscount:{},
    withoutDiscount:{},
    shipping_costs:{},
    success:false,
}

export const shoppingCartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       case types.addProductShoppingCart:
           return{
               ...state,
               cart:payload
           }
        case types.loadShoppingCartFromCookies:
            return{
                ...state,
                cart:payload
            }
        case types.updatedProductQuantity:
            return{
                ...state,
                cart:state.cart.map(product=>product.product_id === payload.product_id ? payload : product)
            }
        case types.calculateTotalShoppingCart:
            return{
                ...state,
                subtotal:payload.subtotalCart,
                total:payload.total,
                shipping_costs:payload.shippingSelected
            }
        case types.finaliceCheckoutCart:
            return{
                ...state,
                superTotal:payload.superTotal,
                withDiscount:payload.withDiscount,
                withoutDiscount:payload.withoutDiscount,
                success:true  
            }
       case types.loadTotalsFromCookies:
           return{
               ...state,
               superTotal:payload.superTotal,
               withDiscount:payload.withDiscount,
               withoutDiscount:payload.withoutDiscount,
               shipping_costs:payload.shippingCosts
           }
       default:
           return state;
    }
}