import { types } from "../types";

const initalState = {
    products: [],
    product: null,
    relatedProducts: [],
    filters: [],
    productSelected: null,
    brandsSelected: [],
    filteredProducts: [],
    categoriesSelected: [],
    results: {},
}

export const productsReducer = (state = initalState, { type, payload }) => {
    switch (type) {

        case types.loadProducts:
            return {
                ...state,
                products: payload,
            }

        case types.loadProduct:
            return {
                ...state,
                product: payload.product,
                relatedProducts: payload.relatedProducts
            }

        case types.addProductSelected:
            return {
                ...state,
                productSelected: payload
            }

        case types.load_products_per_pagination:
            return {
                ...state,
                products: payload,
            }
n

        case types.filters_to_products: {

            let filterInFilters = state.filters.find(filterSelected => filterSelected._id === payload._id);

            return filterInFilters ? {
                ...state
            } : {
                ...state,
                filters: [payload, ...state.filters]
            }

        }

        case types.clear_all_filter:
            return {
                ...state,
                filters: initalState.filters                
            }

        case types.search_products:
            return{
                ...state, 
                products: payload
            }

        case types.load_products_home:
            return {
                ...state,
                products: payload
            }

        case types.filter_products:
            return {
                ...state,
                products: payload,
            }

        case types.remove_filter: {
            return {
                ...state,
                filters: state.filters.filter(filter => filter._id !== payload._id),
            }
        }

        default:
            return state;
    }
}