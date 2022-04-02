import { types } from "../types";

import client from '../config/axiosConfig';

export const startLoadFaqs = () => {
    return async (dispatch) => {
        let url = '/faq';
        try {
            const res = await client.get(url);
            dispatch(loadFaqs(res.data.faqs))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadFaqs = (faqs) => ({
    type: types.load_faqs,
    payload: faqs
})