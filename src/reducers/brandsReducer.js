import { types } from "../types";

const initialState = {
    brandsHme: [],
    brands:[]
}


export const brandsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadBrandsHome:
            return {
                ...state,
                brands: payload
            }
        default:
            return state;
    }
}