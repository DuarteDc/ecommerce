import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadProducts = () => {
    return async (dispatch) => {
        let url = '/products';
        try {
            const res = await client.get(url);
            dispatch(loadProducts(res.data.products))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProducts = (products) => ({
    type: types.loadProducts,
    payload: products
});

export const startLoadProduct = (id) => {
    return async (dispatch) => {
        let url = `/products/${id}`;
        try {
            const res = await client.get(url);
            console.log(res.data.product)
            dispatch(loadProduct(res.data.product));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProduct = (product) => ({
    type: types.loadProduct,
    payload: product
})

export const addProductSelected = (product) => ({
    type: types.addProductSelected,
    payload: product
})

export const clearAll = () => ({
    type: types.clear_all_filter
})

export const startLoadProductsPerBrand = (brand) => {
    return async (dispatch) => {
        let url = `/products/brand/${brand._id}`;
        try {
            const res = await client.get(url);
            console.log(res.data.products);
            dispatch(addBrandToParams(brand, res.data.products))
        } catch (error) {
            console.log(error);
        }
    }
}

export const addBrandToParams = (brand, products) => ({
    type: types.add_brand_to_filter,
    payload: {
        brand,
        products
    },
});

export const removeBrand = (brand) => ({
    type: types.remove_brand_to_brandsSelected,
    payload: brand
});

export const startLoadProductsPerCategory = (category) => {
    return async (dispatch) => {
        let url = `/products/category/${category._id}`;
        try {
            const res = await client.get(url);
            console.log(res.data.products);
            dispatch(addCategoryToParams(category, res.data.products))
        } catch (error) {
            console.log(error);
        }
    }
}

export const addCategoryToParams = (category, products) => ({
    type: types.add_category_to_filter,
    payload: {
        category,
        products,
    },
})

export const removeCategory = (category) => ({
    type: types.remove_category_to_categoriesSelected,
    payload: category
})