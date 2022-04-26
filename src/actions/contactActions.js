import client from '../config/axiosConfig';

export const startSendMessage = async (data) => {
    let url = '/contact';
    try {
        const res = await client.post(url, data);

        return {
            hasError: false,
            message: res?.data?.message,
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                hasError: true,
                message: error?.response?.data?.message
            }
        }

        return {
            hasError: true,
            message: "Parece que hubo un error - Intente más tarde"
        }
    }

}
