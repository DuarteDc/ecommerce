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
    searchedProducts: [],
    productsMostSold: [],
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

        case types.load_products_most_sold:
            return {
                ...state,
                productsMostSold: payload
            }

        case types.filters_to_products: {

            let filterInFilters = state.filters.find(filterSelected => filterSelected.type === payload.type);

            return filterInFilters ? {
                ...state,
                filters: state.filters.map(filterSelected => filterSelected.type === payload.type ? { ...payload } : filterSelected),
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
            return {
                ...state,
                searchedProducts: payload
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

            const hasCategoryAndSubcategory = state.filters.filter(filter => filter.type === 3 || filter.type === 4 && payload.type !== 4);

            return hasCategoryAndSubcategory.length === 2 ? {
                ...state,
                filters: state.filters.filter(filter => filter.type !== 3 && filter.type !== 4)
            } : {
                ...state,
                filters: state.filters.filter(filter => filter._id !== payload._id),
            }
        }
        case types.clear_subcategory:
            return {
                ...state,
                filters: state.filters.filter(p => p.type !== payload)
            }
        

        default:
            return state;
    }
}