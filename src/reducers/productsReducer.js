import { types } from "../types";

const initalState = {
    products: [],
    allProducts: [],
    product: null,
    relatedProducts: [],
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
                product: payload.product,
                relatedProducts: payload.relatedProducts,
            }

        case types.addProductSelected:
            return {
                ...state,
                productSelected: payload
            }

        case types.load_products_per_brand:

            const { brand, products } = payload;

            let brandInFilter = state.brandsSelected.find(brandSelected => brandSelected._id === brand._id);

            return brandInFilter ? {
                ...state
            } : {
                ...state,
                productsFilter: products.length > 0 ? [...products, ...state.productsFilter] : [...state.productsFilter],
                brandsSelected: [brand, ...state.brandsSelected],
            }

        case types.load_products_per_pagination:
            return {
                ...state,
                products: payload
            }

        case types.clear_all_filter:
            return {
                ...state,
                brandsSelected: initalState.brandsSelected,
                productsFilter: initalState.productsFilter,
                categoriesSelected: initalState.categoriesSelected,
            }

        default:
            return state;
    }
}