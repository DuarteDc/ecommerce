import { types } from "../types";
const initialState = {
  logged: false,
  user: null
}

export const authReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.login:
      const { token, user } = payload;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user: user,
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
    default:
      return state;
  }
}

