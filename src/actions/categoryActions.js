import client from '../config/axiosConfig';
import { types } from '../types';

export const startLoadCategories = () => {
    return async (dispatch) => {
        let url = '/categories';
        try {
            const res = await client.get(url);
            console.log(res.data.categories)
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


export const startLoadCategoriesHome = () =>{
    return async (dispatch) =>{
     let url = '/categories/categories-home';
     try {
        const res =  await client.get(url);
        dispatch(loadCategoriesHome(res.data.categories));
     } catch (error) {
         console.log(error);
     }
    }
}

export const loadCategoriesHome = (categories) =>({
    type:types.loadCategoriesHome,
    payload:categories
})