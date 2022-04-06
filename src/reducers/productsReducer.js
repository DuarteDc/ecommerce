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


        case types.filters_to_products: {

            const { filter, products } = payload;

            let filterInFilters = state.filters.find(filterSelected => filterSelected._id === filter._id);

            return filterInFilters ? {
                ...state
            } : {
                ...state,
                filteredProducts: products.length > 0 ? [...products, ...state.filteredProducts] : [...state.filteredProducts],
                filters: [filter, ...state.filters],
                results: { quantity: products.length, name: filter.name },
            }

        }

        case types.clear_all_filter:
            return {
                ...state,
                filteredProducts: initalState.filteredProducts,
                filters: initalState.filters,
                results: initalState.results,
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