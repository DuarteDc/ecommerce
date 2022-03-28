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
        let url = '/brands/products/brand';
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
        let url = `/products/brand/${brand}`;
        try {
            const res = await client.get(url);
            dispatch(loadProductsPerBrand(res.data.products));
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadProductsPerBrand = (products) => ({
    type: types.load_products_from_brand,
    payload: products
});

/*                  filtros         */
export const startFilterProductsPerBrandAndCategory = (brand_id, category_id, category_name) => {
    return async (dispatch) => {
        const url = `/products/brands/categories/${brand_id}/${category_id}`;
        try {
            const res = await client.get(url);
            dispatch(filterProductsPerBrandAndCategory(category_id, category_name, res.data.products));
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterProductsPerBrandAndCategory = (category_id, category_name, products) => ({
    type: types.filter_products_per_category_from_brands,
    payload: {
        category_id,
        category_name,
        products,
    },
})

export const clearAllFilter = () => ({
    type: types.clear_all_filter,
})