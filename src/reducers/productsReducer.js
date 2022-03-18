import { Category } from "@mui/icons-material";
import { types } from "../types";

const initalState = {
    products: [],
    allProducts: [],
    product: null,
    productSelected: null,
    brandsSelected: [],
    productsFilter: [],
    categoriesSelected: [],
}

export const productsReducer = (state = initalState, { type, payload }) => {
    switch (type) {

        case types.loadProducts:
            return {
                ...state,
                products: payload,
                allProducts: payload
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

        case types.add_brand_to_filter:
            let brandInFilter = state.brandsSelected.find(brand => brand._id === payload.brand._id)
            return brandInFilter ? {
                ...state
            } : {
                ...state,
                brandsSelected: [...state.brandsSelected, payload.brand],
            }

        case types.load_products_per_brand:
            return {
                ...state,
                products: payload,
                allProducts: payload
            }

        case types.add_category_to_filter:
            let categoryInFilter = state.categoriesSelected.find((category) => category.id === payload.id)
            return categoryInFilter ? {
                ...state,
            } : {
                ...state,
                categoriesSelected: [...state.categoriesSelected, payload],
                //productsFilter: state.allProducts.filter(product => product.category === payload.id),
                //products: [...state.productsFilter, state.productsFilter]
            }


        case types.load_products_per_pagination:
            return{
                ...state, 
                products: payload
            }


        default:
            return state;
    }
}