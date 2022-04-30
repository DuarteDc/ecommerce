import Swal from "sweetalert2";
import client from "../config/axiosConfig";
import { types } from "../types";

export const startLoadPendingOrders = (token) =>{
    return async (dispatch)=>{
      try {
          let url = '/orders/pendient/payments';
          const {data} = await client.get(url ,{
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

export const loadPendingOrders = (pendingOrders) =>({
    type:types.loadPenddingOrders,
    payload:pendingOrders
});

export const selectedOrderPendding = (order_id) =>({
    type:types.selectedOrderPendding,
    payload:order_id

})


export const startLoadOrdersCanceled = (token) =>{
    return async (dispatch) =>{
      try {
          let url = '/orders/canceled/payments';
          const {data} = await client.get(url,{
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

export const loadOrdersCanceled = (data) =>({
    type:types.loadOrdersCanceled,
    payload:data
})

export const startLoadOrdersApproved = (token) =>{
    return async (dispatch) =>{
        try {
            let url = '/orders/approved/payments';
            const {data} = await client.get(url,{
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

export const loadOrdersApproved = (ordersApproved) =>({
    type:types.loadOrdersApproved,
    payload:ordersApproved
});

export const startLoadOrdersShipped = (token) =>{
  return async (dispatch) =>{
    
    try {
        let url = '/orders/shipped/payments';
        const {data} = await client.get(url,{
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

export const loadOrdersShipped = (ordersShipped) =>({
    type:types.loadShippedOrders,
    payload:ordersShipped
})


export const startUploadProofOfPayment = (data) =>{
    return async (dispatch , getState)=>{
        const { order_id } = getState().orders
        try {
            let url = `payments/${order_id}`;
            await client.post(url, data , {
                headers:{ 'Content-Type' : 'multipart/form-data'}
            });
            Swal.fire({
                title:"Comprobante de pago se ha subido correctamente",
                text:"El comprobante de pago sera revisado , una vez verificado se aprobara la venta y se enviaran tus productos",
                icon:"success"
            })
            dispatch(uploadProofOfPayment(order_id))
        } catch (error) {
            console.log(error);
        }
    }
}

export const uploadProofOfPayment = (order_id) =>({
    type:types.upload_proof_payment_order,
    payload:order_id
});

export const startOrderCancel = (order_id) =>{
    return async (dispatch) =>{
        try {
            let url = `/orders/cancel/${order_id}`;
            await client.delete(url);
            dispatch(orderCancel(order_id));
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
              Toast.fire({
                icon: 'success',
                title: 'Tu pedido ha sido cancelado satisfactoriamente'
              });

        } catch (error) {
            console.log(error);
        }
    }
}

export const orderCancel = (order_id) =>({
    type:types.loadCancelOrder,
    payload:order_id

});


export const startGetOrder = (_id) =>{
    return async (dispatch) =>{
        try {
            let url = `/order/${_id}`;
            const {data} = await client.get(url);
            dispatch(getOrder(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrder = (order) =>({
    type:types,
    payload:order
});
