import { types } from "../types";

const initialState = {
    client_secret:'',
    banksAccounts:[],
    bankAccountSelected:null,
    success:false
}
export const checkoutReducer = ( state = initialState , { type , payload}) =>{
    switch (type) {
        case types.loadSecretClientStripe:
          return {
              ...state,
              client_secret:payload,
              success:false
          }
        case types.loadSecretClientfromCookies:
            return{
                ...state,
                client_secret:payload,
                success:false
            }
        case types.loadBanksAccounts:
            return{
                ...state,
                banksAccounts:payload,
                success:false
            }
        case types.loadBankAccountSelected:
            return{
                ...state,
                bankAccountSelected:payload,
                success:false
            }
        case types.successFinaliceTransfer:
            return{
                ...state,
                success:true
            }
        default:
          return state;
    }
}