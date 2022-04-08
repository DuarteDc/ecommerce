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
export const startFilterProductsPerBrandAndCategory = (brand_id, category) => {
    return async (dispatch) => {
        const url = `/products/brands/categories/${brand_id}/${category._id}`;
        try {
            const res = await client.get(url);
            console.log(res.data.products);
            dispatch(filterProductsPerBrandAndCategory(category, res.data.products));
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterProductsPerBrandAndCategory = (category, productsBrand) => ({
    type: types.filters_to_products_from_brand,
    payload: {
        filterBrand:category,
        productsBrand
    }
})

export const clearAll = () => ({
    type: types.clear_all_filter
})