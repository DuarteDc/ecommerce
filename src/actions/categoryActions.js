import client from '../config/axiosConfig';
import { types } from '../types';

export const startLoadCategories = () => {
    return async (dispatch) => {
        let url = '/categories';
        try {
            const res = await client.get(url);
            dispatch(loadCategories(res.data.categories))
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadCategories = (categories) => ({
    type: types.loadCategories,
    payload: categories
});


export const startLoadCategoriesHome = () => {
    return async (dispatch) => {
        let url = '/categories/categories-home';
        try {
            const res = await client.get(url);
            dispatch(loadCategoriesHome(res.data.categories));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadCategoriesHome = (categories) => ({
    type: types.loadCategoriesHome,
    payload: categories
})

export const startLoadProductsPerCategory = (category) => {
    return async (dispatch) => {
        let url = `/categories/slug/${category}`;
        try {
            const res = await client.get(url);
            dispatch(loadProductsPerCategory(res.data.category));
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadProductsPerCategory = (category) => ({
    type: types.load_products_from_category,
    payload: category
});


/********************+filtro de productos en categorias *******************************/
export const startFilterProductsPerBrandAndCategory = (brand, category_id) => {
    return async (dispatch) => {
        const url = `/products/brands/categories/${brand._id}/${category_id}`;
        try {
            const res = await client.get(url);
            dispatch(filterProductsPerBrandAndCategory(brand, res.data.products));
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterProductsPerBrandAndCategory = (brand, products) => ({
    type: types.filters_to_products_from_categories_with_brands,
    payload: {
        filter: brand,
        products
    }
})

export const startloadProductsPerTagsInCategory = (tag) => {
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
    type: types.filters_to_products_from_categories_with_brands,
    payload: {
        filter: tag,
        products
    }
});


export const clearAll = () => ({
    type: types.clear_filters_form_categories
})