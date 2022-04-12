import { types } from "../types";

const initalState = {
    categories: [],
    category: [],
    categoriesHome: [],
    filteredProducts: [],
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
        case types.filters_to_products_from_categories:
            return {
                ...state,
                filteredProducts: payload
            }

        default:
            return state
    }
}