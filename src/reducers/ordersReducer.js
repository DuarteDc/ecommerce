import { types } from "../types";

const initialState = {
    penddingOrders: [],
    canceledOrders: [],
    approvedOrders: [],
    shippedOrders: [],
    order_id: '',
    totalOrder: 0,
    totalPayments: 0,
    orderDetail: {},
    shippingDetail: {},
    success: false,
    productDetail: {},
}


export const ordersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadPenddingOrders:
            return {
                ...state,
                penddingOrders: payload
            }
        case types.selectedOrderPendding:
            return {
                ...state,
                order_id: payload.order_id,
                totalOrder: payload.total,
                totalPayments: payload.totalPayments
            }
        case types.upload_proof_payment_order:
            return {
                ...state,
                penddingOrders: state.penddingOrders.map(order => order._id === payload.order_id
                    ? { ...order, total_payments: order.total_payments = Number(order.total_payments) + Number(payload.amount) }
                    : order),
                order_id: ''
            }
        case types.cancel_order:
            const { order_id, order } = payload;
            return {
                ...state,
                penddingOrders: state.penddingOrders.map(orderDetail => orderDetail._id === order_id
                    ? { ...order }
                    : { ...orderDetail })
            }
        case types.loadOrdersCanceled:
            return {
                ...state,
                canceledOrders: payload
            }
        case types.loadOrdersApproved:
            return {
                ...state,
                approvedOrders: payload
            }
        case types.loadShippedOrders:
            return {
                ...state,
                shippedOrders: payload
            }
        case types.loadCancelOrder:
            return {
                ...state,
                penddingOrders: state.penddingOrders.filter(pendding => pendding._id !== payload)
            }
        case types.loadOrderById:
            return {
                ...state,
                orderDetail: payload.order,
                shippingDetail: payload?.shipping
            }

        case types.invoiced_order: {

            const { first_order, second_order, status } = payload;

            return first_order ? {
                ...state,
                success: true,
            } : {
                ...state,
                success: false,
            }

        }
        case types.cancel_order_by_id:
            return {
                ...state,
                penddingOrders: state.penddingOrders.filter(order => order._id !== payload._id),
                canceledOrders: [payload, ...state.canceledOrders],
            }

        case types.load_product_detail:
            return {
                ...state,
                productDetail: payload
            }

        case types.get_order_id:
            return {
                ...state,
                order_id: payload
            }

        case types.finish_order_canvas:
            return {
                ...state,
                approvedOrders: state.approvedOrders.map(order => order._id === payload._id ? { ...payload } : order)
            }

        case types.start_send_images_to_canvas:
            return {
                ...state,
                approvedOrders: state.approvedOrders.map(order => order._id === payload._id ? { ...payload } : order)
            }

        default:
            return state;
    }
}