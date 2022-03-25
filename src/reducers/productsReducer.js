import { types } from "../types";

const initalState = {
    products: [],
    product: null,
    relatedProducts: [],
    productSelected: null,
    brandsSelected: [],
    filteredProducts: [],
    categoriesSelected: [],
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
                relatedProducts: payload.relatedProducts,
            }

        case types.addProductSelected:
            return {
                ...state,
                productSelected: payload
            }

        case types.load_products_per_brand: {

            const { brand, products } = payload;

            let brandInFilter = state.brandsSelected.find(brandSelected => brandSelected._id === brand._id);

            return brandInFilter ? {
                ...state
            } : {
                ...state,
                filteredProducts: products.length > 0 ? [...products, ...state.filteredProducts] : [...state.filteredProducts],
                brandsSelected: [brand, ...state.brandsSelected],
            }
        }

        case types.load_products_per_category: {

            const { category_id, category_name, products } = payload;

            const category = {
                _id: category_id,
                name: category_name
            }

            let categoryInFilter = state.categoriesSelected.find(category => category._id === category_id);

            return categoryInFilter ? {
                ...state,
            } : {
                ...state,
                filteredProducts: products.length > 0 ? [...products, ...state.filteredProducts] : [...state.filteredProducts],
                categoriesSelected: [category, ...state.categoriesSelected],
            }
            
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
                filteredProducts: initalState.filteredProducts,
                categoriesSelected: initalState.categoriesSelected,
            }

        default:
            return state;
    }
}