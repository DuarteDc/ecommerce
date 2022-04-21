import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadBrandsHome = () => {
    return async (dispatch) => {
        let url = '/brands/products/brand';

        try {
            const res = await client.get(url);
            dispatch(loadBrandsHome(res.data.brands));
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadBrands = () => {
    return async (dispatch) => {
        let url = '/brands';
        try {
            const res = await client.get(url);
            dispatch(loadBrands(res.data.brands))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadBrandsHome = (brands) => ({
    type: types.loadBrandsHome,
    payload: brands
})

export const loadBrands = (brands) => ({
    type: types.loadBrands,
    payload: brands
});

export const startLoadProductsPerBrand = (brand) => {
    return async (dispatch) => {
        let url = `/brands/slug/${brand}`;
        try {
            const res = await client.get(url);
            dispatch(loadProductsPerBrand(res.data.brand));
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadProductsPerBrand = (brand) => ({
    type: types.load_products_from_brand,
    payload: brand
});

/*                  filtros         */
export const startFilterProductsPerBrandAndCategory = (brand, category) => {
    return async (dispatch) => {
        const url = `/products/brands/categories/${brand._id}/${category._id}`;
        try {
            const res = await client.get(url);
            console.log(res.data.products);
            dispatch(filterProductsPerBrandAndCategory(category, res.data.products));
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterProductsPerBrandAndCategory = (category, products) => ({
    type: types.filters_to_products_from_brand,
    payload: {
        filter: category,
        products
    }
})

export const clearAll = () => ({
    type: types.clear_all_filter_from_brands
})

export const startloadProductsPerTagsInBrand = (tag) => {
    return async (dispatch) => {
        let url = `/products/tag/${tag._id}`;
        try {
            const res = await client.get(url);
            dispatch(loadProductsPerTags(tag, res.data.products));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProductsPerTags = (tag, products) => ({
    type: types.filters_to_products_from_brand,
    payload: {
        filter: tag,
        products
    }
});
