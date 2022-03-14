import Cookies from "js-cookie";
import client from "../config/axiosConfig"

export const getStates = async () => {
    try {
        let url = '/states';
        const res = await client.get(url);
        return res.data.states;
    } catch (error) {
        console.log(error);
    }
}

export const getMinicipilitesPerState = async (id) => {
    let url = `/municipalities/${id}`;
    try {
        const res = await client.get(url);
        return res.data.municipalities;
    } catch (error) {
        console.log(error);
    }
}

export const saveAddress = async (data) => {
    let url = 'auth/save-directions';
    try {
        const token = await Cookies.get('token');
        const res = await client.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    } catch (error) {
        console.log(error);
    }
}


export const getAddress = async () => {
    let url = '/auth/directions/user';
    try {
        const token = await Cookies.get('token');
        const res = await client.get(url, {
            headers: {
                'Authorization': token
            }
        })
        return res.data.directions;
    } catch (error) {
        console.log(error);
    }
}

export const setDefaultAddress = async (data, id) => {
    let url = `/auth/update-default-direction/${id}`;
    try {
        const token = await Cookies.get('token');
        const res = await client.put(url, data, {
            headers: {
                'Authorization': token
            }
        })
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}