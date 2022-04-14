import { types } from "../types";

const initalState = {
    categories: [],
    category: [],
    categoriesHome: [],
    categoryFilters: [],
    filteredProducts: [],
    results: {}
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
        case types.filters_to_products_from_categories_with_brands:

            const { filter, products } = payload;

            let filterInFilters = state.categoryFilters.find(filterSelected => filterSelected._id === filter._id);

            return filterInFilters ? {
                ...state
            } : {
                ...state,
                filteredProducts: products.length > 0 ? [...products, ...state.filteredProducts] : [...state.filteredProducts],
                categoryFilters: [filter, ...state.categoryFilters],
                results: { quantity: products.length, name: filter.name },
            }

        case types.clear_filters_form_categories:
            return {
                ...state,
                categoryFilters: initalState.categoryFilters,
                filteredProducts: initalState.filteredProducts,
                results: initalState.results,
            }

        default:
            return state
    }
}