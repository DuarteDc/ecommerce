import { types } from "../types";

const initalState = {
    products: [],
    allProducts: [],
    categoriesSelected: [],
    brandsSelected: [],
    filteredProducts: [],
    productSelected: null,
}

export const productsReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case types.loadProducts:
            return {
                ...state,
                allProducts: payload,
                products: payload,
            }

        case types.addProductSelected:
            return {
                ...state,
                productSelected: payload
            }

        case types.add_category_to_filter: {
            let categoryInParams = state.categoriesSelected.find((category) => category._id === payload._id);
            return categoryInParams ? {
                ...state
            } : {
                ...state,
                categoriesSelected: [...state.categoriesSelected, payload],
                filteredProducts: state.allProducts.filter((product) => product.category._id === payload._id),
                products: [...state.products, state.filteredProducts],
            }
        }

        case types.remove_category_to_categoriesSelected: {
            let removeCategory = state.categoriesSelected.filter((category) => category._id !== payload._id);
            let filteredProducts = state.allProducts.filter((product) => product.category._id !== payload._id);
            return state.categoriesSelected.length > 0 ? {
                ...state,
                categoriesSelected: [...removeCategory],
                products: [...filteredProducts, filteredProducts]
            } : {
                ...state,
                products: [...state.allProducts]
            }
        }

        case types.add_brand_to_filter: {
            let brandInParams = state.brandsSelected.find((brand) => brand._id === payload._id);
            return brandInParams ? {
                ...state
            } : {
                ...state,
                brandsSelected: [...state.brandsSelected, payload],
            }
        }

        case types.remove_brand_to_brandsSelected:{
            let removeBrand = state.brandsSelected.filter((brand)=> brand._id !== payload._id);
            return{
                ...state, 
                brandsSelected: [...removeBrand]
            }
        }

        case types.clear_all_filter: {
            return {
                ...state,
                products: [...state.allProducts],
                categoriesSelected: [...initalState.categoriesSelected],
                brandsSelected: [...initalState.brandsSelected]
            }
        }

        default:
            return state;
    }
}