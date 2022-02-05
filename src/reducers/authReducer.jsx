import { types } from "../types";

const initialState = {
  logged:false,
  user:null
}

export const authReducer = (state = initialState , {payload , type}) =>{
    switch (type) {
        case types.login:
          console.log(payload);
          localStorage.setItem('token',payload.token);
          return{
            ...state,
            user:payload.user,
            logged:true
          }
        default:
            return state;
    }
}