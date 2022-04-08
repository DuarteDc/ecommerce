import { types } from "../types";

const initialState = {
    brandsHome: [],
    brands: [],
    products: [],
    brand: [],
    filteredProducts: [],
    categoriesSelected: [],
    filtersBrand: [],
    resultsBrand: []
}


export const brandsReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.loadBrandsHome:
            return {
                ...state,
                brandsHome: payload
            }
  

        case types.filters_to_products_from_brand: {

            const { filterBrand, productsBrand } = payload;

            let filterInFilters = state.filtersBrand.find(filterSelected => filterSelected._id === filterBrand._id);

            return filterInFilters ? {
                ...state
            } : {
                ...state,
                filteredProducts: productsBrand.length > 0 ? [...productsBrand, ...state.filteredProducts] : [...state.filteredProducts],
                filtersBrand: [filterBrand, ...state.filtersBrand],
                resultsBrand: { quantity: productsBrand.length, name: filterBrand.name },
            }

        }

        case types.load_products_from_brand:
            return {
                ...state,
                brand: payload,
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