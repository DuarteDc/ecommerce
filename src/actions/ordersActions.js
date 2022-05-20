import Swal from "sweetalert2";
import client from "../config/axiosConfig";
import { errorNotify, successNotify } from "../helpers/helpers";
import { types } from "../types";
import axios from "axios";

export const startLoadPendingOrders = (token) => {
    return async (dispatch) => {
        try {
            let url = '/orders/pendient/payments';
            const { data } = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(loadPendingOrders(data.orders));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadPendingOrders = (pendingOrders) => ({
    type: types.loadPenddingOrders,
    payload: pendingOrders
});

export const selectedOrderPendding = (order_id) => ({
    type: types.selectedOrderPendding,
    payload: order_id

})


export const startLoadOrdersCanceled = (token) => {
    return async (dispatch) => {
        try {
            let url = '/orders/canceled/payments';
            const { data } = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(loadOrdersCanceled(data.orders));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadOrdersCanceled = (data) => ({
    type: types.loadOrdersCanceled,
    payload: data
})

export const startLoadOrdersApproved = (token) => {
    return async (dispatch) => {
        try {
            let url = '/orders/approved/payments';
            const { data } = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(loadOrdersApproved(data.orders))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadOrdersApproved = (ordersApproved) => ({
    type: types.loadOrdersApproved,
    payload: ordersApproved
});

export const startLoadOrdersShipped = (token) => {
    return async (dispatch) => {

        try {
            let url = '/orders/shipped/payments';
            const { data } = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(loadOrdersShipped(data.orders));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadOrdersShipped = (ordersShipped) => ({
    type: types.loadShippedOrders,
    payload: ordersShipped
})


export const startUploadProofOfPayment = (data) => {
    return async (dispatch, getState) => {
        const { order_id } = getState().orders
        const amount = data.get('amount');
        try {
            let url = `payments/${order_id}`;
            await client.post(url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            successNotify("Comprobante de pago se ha subido correctamente");
            dispatch(uploadProofOfPayment(order_id, amount))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorNotify(error?.response?.data?.message);
                return;
            }
            errorNotify("No se pudo subir el comprobante de pago - Intenta mas tarder")
        }
    }
}

export const uploadProofOfPayment = (order_id, amount) => ({
    type: types.upload_proof_payment_order,
    payload: {
        order_id,
        amount,
    }
});

export const startOrderCancel = (formData, order_id) => {
    return async (dispatch) => {
        try {
            let url = `/orders/request-cancel/${order_id}`;
            const { data } = await client.post(url, formData);
            dispatch(orderCancel(order_id, data.order));
            successNotify(data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorNotify(error?.response?.data?.message);
                return;
            }
            errorNotify("No se pudo cancelar la order - Intenta mas tarder")
        }
    }
}

export const orderCancel = (order_id, order) => ({
    type: types.cancel_order,
    payload: {
        order_id,
        order
    }
});


export const startGetOrder = (_id) => {
    return async (dispatch) => {
        try {
            let url = `/orders/${_id}`;
            const { data } = await client.get(url);
            dispatch(getOrder(data.order))
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrder = (order) => ({
    type: types.loadOrderById,
    payload: order
});


