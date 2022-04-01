import axios from "axios";
import client from "../config/axiosConfig";

export const saveDataInfluencer = async (formData) => {
    
    let url = `/influencers`;
    try {
        const res = await client.post(url, formData);
        
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
            message: "Parece que hubo un error - intente mas tarde"
        }
        
    }
}