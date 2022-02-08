import client from '../config/axiosConfig';

export const getCategories = async () => {
    try {
        const res = await client.get('/categories');
        return res.data.categories;
    } catch (error) {
        console.log(error)
    }
}