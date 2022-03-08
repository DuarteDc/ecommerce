import client from "../config/axiosConfig"
import { types } from "../types";

export const startStoreNewsletterSuscription = (data) =>{
    return async(dispatch) =>{

         let url = 'newsletter';
         try {
          const res = await client.post(url, data);
          dispatch(storeNewsletterSuscription(res.data.message));
         } catch (error) {
          console.log(error);
         }
       
       
    }
}

export const storeNewsletterSuscription = (message) =>({
    type:types.addNewsletterSuscription,
    payload:message
})