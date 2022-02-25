import { Category } from "@mui/icons-material";
import { types } from "../types";

const initalState = {
    products: [],
    product: null,
    productSelected: null,
    productsfilter: [],
    brandsSelected: [],
    categoriesSelected: [],
}

export const productsReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case types.loadProducts:
            return {
                ...state,
                products: payload,
                allProducts: payload,
            }

        case types.loadProduct:
            return {
                ...state,
                product: payload
            }

        case types.addProductSelected:
            return {
                ...state,
                productSelected: payload
            }

        case types.add_category_to_filter: {
            let categoryInParams = state.categoriesSelected.find((category) => category._id === payload.category._id);
            let inconmigProducts = [...state.productsfilter, ...payload.products];
            let newProducts = new Set(inconmigProducts);
            return categoryInParams ? {
                ...state
            } : {
                ...state,
                categoriesSelected: [...state.categoriesSelected, payload.category],
                productsfilter: [...newProducts]
            }
        }

        case types.remove_category_to_categoriesSelected: {
            let removeCategory = state.categoriesSelected.filter((category) => category._id !== payload._id);
            return state.categoriesSelected.length > 0 ? {
                ...state,
                categoriesSelected: [...removeCategory],
                productsfilter: state.productsfilter.filter(product => product.category !== payload._id)
            } : {
                ...state,
                categoriesSelected: [...removeCategory],
                productsfilter: state.productsfilter.filter(product => product.category !== payload._id)
            }
        }

        case types.add_brand_to_filter: {
            let brandInParams = state.brandsSelected.find((brand) => brand._id === payload.brand._id);
            let inconmigProducts = [...payload.products, ...state.productsfilter];
            let newProducts = new Set(inconmigProducts);
            return brandInParams ? {
                ...state,
            } : {
                ...state,
                brandsSelected: [...state.brandsSelected, payload.brand],
                productsfilter: [...newProducts]
            }
        }

        case types.remove_brand_to_brandsSelected: {
            let removeBrand = state.brandsSelected.filter((brand) => brand._id !== payload._id);
            return state.brandsSelected.length > 0 ? {
                ...state,
                brandsSelected: [...removeBrand],
                productsfilter: state.productsfilter.filter(product => product.brand !== payload._id)
            } : {
                ...state,
                brandsSelected: [...initalState.brandsSelected],
                productsfilter: state.productsfilter.filter(product => product.brand !== payload._id)
            }
        }

        case types.clear_all_filter:
            return {
                ...state,
                productsfilter: [...initalState.productsfilter],
                categoriesSelected: [...initalState.categoriesSelected],
                brandsSelected: [...initalState.brandsSelected],
            }

        default:
            return state;
    }
}