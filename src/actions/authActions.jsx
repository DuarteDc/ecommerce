import client from '../config/axiosConfig';
import { types } from '../types';

export const startLoginEmailPassword = (data) =>{
    return async (dispatch)=>{
        let url = '/auth/login'
        try {
         const res = await client.post(url, data);
         const {token , user } = res.data;
         dispatch( login(token , user) ) 
        } catch (error) {
         console.log(error);
        }
    }
}

export const login = (token , user) =>({
    type: types.login,
    payload:{
        token,
        user
    }
});