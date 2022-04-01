export const saveDataInfluencer = async (formData) => {
    let url = `/autinfluencers`;
    try {
        const token = await Cookies.get('token');
        const res = await client.post(url, formData, {
            headers: {
                'Authorization': token
            }
        });
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
            message: "No se pudo eliminar la dirección - intente mas tarde"
        }
    }
}