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
})