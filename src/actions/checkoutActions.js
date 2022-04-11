import client from "../config/axiosConfig";
import Cookies from "js-cookie";
import { types } from "../types";

export const startLoadClientSecret = () =>{
    return async (dispatch , getState) =>{
        const {order_id} = getState().cart;
        try {
            let url = `/orders/stripe/clients/${order_id}`;
            const {data} =  await client.post(url);
            Cookies.set('client_secret', JSON.stringify(data.client_secret));
            dispatch(loadClientSecret(data.client_secret))
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadClientSecret = (client_secret) =>({
    type:types.loadSecretClientStripe,
    payload:client_secret
});


/**Add client_secret stripe to state */
export const addClientSecretFromCookies = (client_secret) =>({
   type:types.loadSecretClientfromCookies,
   payload:client_secret
})
