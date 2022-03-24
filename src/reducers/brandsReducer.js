import { types } from "../types";

const initialState = {
    brandsHome: [],
    brands: [],
    products: [],
    filteredProducts: [],
    categoriesSelected: [],
}


export const brandsReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.loadBrandsHome:
            return {
                ...state,
                brandsHome: payload
            }

        case types.loadBrands:
            return {
                ...state,
                brands: payload
            }

        case types.load_products_from_brand:
            return {
                ...state,
                products: payload,
            }

        case types.filter_products_per_category_from_brands:

            const { category_id, category_name, products } = payload;

            const category = {
                id: category_id,
                name: category_name
            }

            let categoryInFilter = state.categoriesSelected.find(category => category.id === category_id);

            return categoryInFilter ? {
                ...state,
            } : {
                ...state,
                filteredProducts: products.length > 0 ? [...products, ...state.filteredProducts] : [...state.filteredProducts],
                categoriesSelected: [category, ...state.categoriesSelected],
            }

        case types.clear_all_filter:
            return {
                ...state,
                filteredProducts: initialState.filteredProducts,
                categoriesSelected: initialState.categoriesSelected,
            }

        default:
            return state;
    }
}