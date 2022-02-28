import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadBrands = () => {
    return async (dispatch) => {
        let url = '/brands';
        try {
            const res = await client.get(url);
            dispatch(loadBrands(res.data.brands))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadBrands = (brands) => ({
    type: types.loadBrands,
    payload: brands
});

export const startLoadBrand = (brand) => {
    return async (dispatch) => {
        let url = `/brands/${brand}`;
        try {
            const res = await client.get(url);
            dispatch(loadBrand(res.data.brand))
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadBrand = (brand) => ({
    type: types.loadBrand,
    payload: brand
})
