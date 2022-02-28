import { types } from "../types";

const initalState = {
    categories: [],
    categoriesHome:[]
}

export const categoryReducer = (state = initalState, {type , payload}) => {
    switch (type) {
        case types.loadCategories:
            return {
                ...state,
                categories:payload
            }
        case types.loadCategoriesHome:
            return{
                ...state,
                categoriesHome:payload
            }
        default:
            return state
    }
}