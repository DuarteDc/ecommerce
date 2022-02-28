import { types } from "../types";

const initialState = {
    brands: [],
    brand: [],
}


export const brandsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadBrands:
            return {
                ...state,
                brands: payload
            }


        case types.loadBrand:
            return{
                ...state,
                brand: payload
            }
        default:
            return state;
    }
}