import { types } from "../types";

const initialState = {
    brandsHome: [],
    brands:[],
    brand: [],
}


export const brandsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadBrandsHome:
            return{
                ...state,
                brandsHome:payload
            }
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