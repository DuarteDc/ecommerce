import { types } from "../types";
const initialState = {
  logged: false,
  user: null
}

export const authReducer = (state = initialState, { payload, type }) => {
  switch (type) {

    case types.login:
      const { user } = payload;
      return {
        ...state,
        user,
        logged: true
      }


    case types.register: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload.user,
        logged: true,
      }
    }

    case types.check_token:{
      const { user } = payload;
      return{
        ...state,
        user,
        logged: true
      }
    }

    case types.logout:
      return{
        ...state,
        user:undefined,
        logged: false
      }

    default:
      return state;
  }
}

