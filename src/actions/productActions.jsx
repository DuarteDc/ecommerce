import client from '../config/axiosConfig';

export const getProducts = async () => {
    try {
        const res = await client.get('/products');
        return res.data.products;
    } catch (error) {
        console.log(error)
    }
}

export const getProduct = async (id) => {
    try {
        const res = await client.get(`/products/${id}`);
        return res.data.product;
    } catch (error) {
        console.log(error);
    }
}