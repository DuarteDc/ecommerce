import { types } from "../types";

const initialState = {
    penddingOrders:[],
    canceledOrders:[],
    approvedOrders:[],
    shippedOrders:[],
    order_id:'',
    orderDetail:{}
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
        case types.upload_proof_payment_order:
            return{
                ...state,
                order_id:''
            }
        case types.loadOrdersCanceled:
            return{
                ...state,
                canceledOrders:payload
            }
        case types.loadOrdersApproved:
            return{
                ...state,
                approvedOrders:payload
            }
        case types.loadShippedOrders:
            return{
                ...state,
                shippedOrders:payload
            }
        case types.loadCancelOrder:
            return{
                ...state,
                penddingOrders: state.penddingOrders.filter(pendding =>pendding._id !== payload)
            }
        case types.loadOrderById:
           return {
               ...state,
               orderDetail:payload
           }
        default:
            return state;
    }
}