import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadProducts = () =>{
    return async (dispatch)=>{
        let url = '/products';
        try {
        const res = await client.get(url);
        dispatch(loadProducts(res.data.products))
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadProducts = (products) =>({
    type: types.loadProducts,
    payload:products
})