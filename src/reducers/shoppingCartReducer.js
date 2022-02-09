import { types } from "../types";

const initialState = {
    products: []
}

export const shoppingCartReducer = (state = initialState, {type, payload}) =>{
    switch (type) {
        case types.getProducts:
            return {
                ...state, 
                products:payload
            }
            case types.deleteProduct:
                return{
                    ...state,
                    products:payload
                }
        default:
            return state;
    }
}