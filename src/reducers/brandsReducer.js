import { types } from "../types";

const initialState = {
    brands: [],
}


export const brandsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadTags:
            return {
                ...state,
                brands: payload
            }
        default:
            return state;
    }
}