// logo
// slider 
// slider ofertas
import client from '../config/axiosConfig';
import { types } from '../types';


export const startLoadAdministrableData = () =>{
    return async (dispatch)=>{
        try {
            let url = 'administrable/logo';
            const res = await client.get(url);
            dispatch(loadAdministrableData(res.data.logo));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadAdministrableData = (administrable) =>({
   type:types.loadAdministrableData,
   payload:administrable
})
