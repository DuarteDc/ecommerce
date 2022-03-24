import client from '../config/axiosConfig';
import { types } from "../types";

export const startLoadProducts = () => {
    return async (dispatch) => {
        let url = '/products';
        try {
            const res = await client.get(url);
            dispatch(loadProducts(res.data))
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
            const { product, relatedProducts } = res.data;
            dispatch(loadProduct(product, relatedProducts));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProduct = (product, relatedProducts) => ({
    type: types.loadProduct,
    payload: {
        product,
        relatedProducts,
    }
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
            dispatch(loadProductsPerBrand(brand, res.data.products));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProductsPerBrand = (brand, products) => ({
    type: types.load_products_per_brand,
    payload: {
        brand,
        products
    },
});

export const removeBrand = (brand) => ({
    type: types.remove_brand_to_brandsSelected,
    payload: brand
});

export const removeCategory = (category) => ({
    type: types.remove_category_to_categoriesSelected,
    payload: category
})


export const startLoadProductPerPagination = (page) => {
    return async (dispatch) => {
        let url = `products?page=${page}`
        try {
            const res = await client.get(url);
            dispatch(loadProducts(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProductPerPagination = (products) => ({
    type: types.load_products_per_pagination,
    payload: products
})