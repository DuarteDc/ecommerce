import client from '../config/axiosConfig';

export const getProducts = async () => {
    try {
        const res = await client.get('/products');
        return res.data.data;
    } catch (error) {
        console.log(error)
    }
}