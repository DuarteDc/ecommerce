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

        default:
            return state;
    }
}