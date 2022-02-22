import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadProducts = () =>{
    return async (dispatch)=>{
        let url = '/products';
        try {
        const res = await client.get(url);
        dispatch(loadProducts(res.data.products))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProducts = (products) =>({
    type: types.loadProducts,
    payload:products
});


export const addProductSelected = (product) =>({
    type:types.addProductSelected,
    payload:product
})

export const addBrandToParams = (brand) =>({
    type:types.add_brand_to_filter,
    payload:brand,
})

export const addCategoryToParams = (category) =>({
    type:types.add_category_to_filter,
    payload:category,
})

export const removeCategory = (category) =>({
    type: types.remove_category_to_categoriesSelected,
    payload:category  
})

export const removeBrand = (brand) =>({
    type: types.remove_brand_to_brandsSelected,
    payload:brand
})

export const clearAll = () =>({
    type: types.clear_all_filter
})