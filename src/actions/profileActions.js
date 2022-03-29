import Cookies from 'js-cookie';

import axios from 'axios';
import client from '../config/axiosConfig';

import { types } from '../types'

export const startLoadDataUser = (ctx) => {
    return async (dispatch) => {
        let url = '/auth'
        try {
            const token = ctx.req.cookies.token;
            const res = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            const { user } = res.data;
            dispatch(loadDataUser(user))
        } catch (error) {
            Cookies.remove('token');
        }
    }
}

export const loadDataUser = (user, token) => ({
    type: types.load_data_user,
    payload: user
})

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

export const startSaveNewAddress = (data) => {

    return async (dispatch) => {
        let url = 'auth/save-directions';
        try {
            const token = await Cookies.get('token');
            const res = await client.post(url, data, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(saveNewAddress(data));
            return {
                hasError: false,
                message: res?.data?.message,
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error?.response?.data?.message,
                }
            }

            return {
                hasError: true,
                message: "No se pudo actualizar la dirección - intente mas tarde"
            }
        }
    }
}

export const saveNewAddress = (data) => ({
    type: types.add_new_address,
    payload: data,
});

export const startGetDirections = (ctx) => {
    return async (dispatch) => {
        let url = '/auth/directions/user';
        try {
            const token = ctx.req.cookies.token;
            const res = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            })
            dispatch(getDirections(res.data.directions));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getDirections = (directions) => ({
    type: types.load_directions,
    payload: directions
});

export const setDefaultAddress = (data, id) => {
    return async (dispatch) => {

        let url = `/auth/update-default-direction/${id}`;

        try {
            const token = await Cookies.get('token');
            const res = await client.put(url, data, {
                headers: {
                    'Authorization': token
                }
            });
            if (res.data.success) {
                dispatch(changeDefaultAddress(id));
            }
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
                message: "No se pudo actualizar la dirección - intente mas tarde"
            }
        }
    }
}

export const changeDefaultAddress = (addres_id) => ({
    type: types.change_default_addres,
    payload: addres_id
})

export const startDeleteAddress = (addres_id) => {
    return async (dispatch) => {
        let url = `/auth/delete-directions/${addres_id}`;
        try {
            const token = await Cookies.get('token');
            const res = await client.delete(url, {
                headers: {
                    'Authorization': token
                }
            });
            if (res.data.success) {
                dispatch(deleteAddress(addres_id));
            }
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
}

export const deleteAddress = (addres_id) => ({
    type: types.delete_addres,
    payload: addres_id,
})