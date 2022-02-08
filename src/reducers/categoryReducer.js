import { types } from "../types";

const initalState = {
    categories: []
}

export const categoryReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.loadCategories:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}