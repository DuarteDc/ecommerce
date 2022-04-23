import { types } from "../types";

const initialState = {
    penddingOrders:[],
    order_id:''
}


export const ordersReducer = ( state = initialState  , { type , payload }) =>{
    switch (type) {
        case types.loadPenddingOrders:
            return{
              ...state,
              penddingOrders:payload
            }
        case types.selectedOrderPendding:
            return{
                ...state,
                order_id:payload
            }
        default:
            return state;
    }
}