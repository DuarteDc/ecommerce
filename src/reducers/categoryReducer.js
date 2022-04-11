import { types } from "../types";

const initalState = {
    categories: [],
    category: [],
    categoriesHome: []
}

export const categoryReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case types.loadCategories:
            return {
                ...state,
                categories: payload
            }
        case types.loadCategoriesHome:
            return {
                ...state,
                categoriesHome: payload
            }

        case types.load_products_from_category:

            return {
                ...state,
                category: payload
            }

        default:
            return state
    }
}