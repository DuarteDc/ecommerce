import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadBrands = () =>{
    return async (dispatch)=>{
        let url = '/brands';
        try {
        const res = await client.get(url);
        dispatch(loadBrands(res.data.brands))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadBrands = (brands) =>({
    type: types.loadTags,
    payload:brands
});

