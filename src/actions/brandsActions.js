import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadBrandsHome = () =>{
    return async (dispatch)=>{
        let url = '/brands/products/brand';
        try {
        const res = await client.get(url);
        dispatch(loadBrands(res.data.brands))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadBrands = (brands) =>({
    type: types.loadBrandsHome,
    payload:brands
});

