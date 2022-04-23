import client from "../config/axiosConfig";
import { types } from "../types";

export const startLoadPendingOrders = (token) =>{
    return async (dispatch)=>{
      try {
          let url = '/orders/approved/payments';
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


export const startLoadOrdersCancel = () =>{
    return () =>{
      try {
          
      } catch (error) {
          
      }
    }
}

export const startLoadOrdersPenddingApproved = () =>{
    return () =>{
        try {
            
        } catch (error) {
            
        }
    }
}


export const startUploadProofOfPayment = (data) =>{
    return async (dispatch , getState)=>{
        const { order_id } = getState().orders
        console.log(order_id)
        try {
            let url = `payments/${order_id}`;
            await client.post(url, data , {
                headers:{ 'Content-Type' : 'multipart/form-data'}
            });
            Swal.fire({
                title:"Comprobante de pago se ha subido correctamente",
                text:"El comprobante de pago sera revisado , una vez verificado se aprobara la venta y enviaran tus productos",
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