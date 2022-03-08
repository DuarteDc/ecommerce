import { types } from "../types";

const initialState = {
  message:''
}

export const newsletterReducer = (state = initialState , {type, payload}) =>{
   switch (type) {
       case types.addNewsletterSuscription:
           return{
               ...state,
               message:payload
           }
       default:
           return state;
   }
}