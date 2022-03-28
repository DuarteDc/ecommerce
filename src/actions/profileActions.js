import Cookies from 'js-cookie';

import client from '../config/axiosConfig';

import { types } from '../types'

export const startLoadDataProfile = () => {
    return async (dispatch) => {
        let url = '/auth'
        try {
            const token = await Cookies.getItem('token');
            const res = await client.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            const { user } = res.data;
            dispatch(loadDataUser("Hola xD"))
        } catch (error) {
            Cookies.remove('token');
        }
    }
}

export const loadDataUser = (user) => ({
    type: types.load_data_user,
    payload: user,
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


export const startGetDirections = () => {
    return async (dispatch) => {
        let url = '/auth/directions/user';
        try {
            const token = await Cookies.get('token');
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

export const setDefaultAddress = async (data, id) => {
    let url = `/auth/update-default-direction/${id}`;
    try {
        const token = await Cookies.get('token');
        const res = await client.put(url, data, {
            headers: {
                'Authorization': token
            }
        })
    } catch (error) {
        console.log(error);
    }
}