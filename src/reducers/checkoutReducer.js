import { types } from "../types";

const initialState = {
    client_secret:''
}
export const checkoutReducer = ( state = initialState , { type , payload}) =>{
    switch (type) {
        case types.loadSecretClientStripe:
          return {
              ...state,
              client_secret:payload
          }
        case types.loadSecretClientfromCookies:
            return{
                ...state,
                client_secret:payload
            }
        default:
          return state;
    }
}