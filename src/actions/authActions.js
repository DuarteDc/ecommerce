import client from '../config/axiosConfig';
import { types } from '../types';
import errorHandler from './errorHandler';

export const startLoginEmailPassword = (data) => {
    return async (dispatch) => {
        let url = 'auth/login'
        try {
            const res = await client.post(url, data);
            const { token, user } = res.data;
            dispatch(login(token, user))
        } catch (error) {
           alert( errorHandler(error));
        }
    }
}

export const login = (token, user) => ({
    type: types.login,
    payload: {
        token,
        user
    }
});


export const startRegister = (data) => {
    return async (dispatch) => {
        let url = '/auth/register'
        try {
            const res = await client.post(url, data);
            const { user, token } = res.data;
            dispatch(register(user, token))
        } catch (error) {
            alert( errorHandler(error));
        }
    }
}


export const register = (user, token) => ({
    type: types.register,
    payload: {
        user,
        token,
    }
});