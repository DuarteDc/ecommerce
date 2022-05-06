import Cookies from 'js-cookie';

import axios from 'axios';
import client from '../config/axiosConfig';

import { types } from '../types'
import Swal from 'sweetalert2';


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
});

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


export const startUpdateDataUser = (formData) => {
    return async (dispatch) => {
        let url = `/auth/update-user-info`;
        try {
            const token = await Cookies.get('token');
            const {data} = await client.put(url, formData, {
                headers: {
                    'Authorization': token
                }
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
              Toast.fire({
                icon: 'success',
                title: data.message
              });
            dispatch(updateDataUser(data.user));

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

export const updateDataUser = (user) => ({
    type: types.update_data_user,
    payload: user,
})


export const startUpdateImageUser = (formData) => {
    return async (dispatch) => {
        let url = `/auth/update-profile-image`;
        try {
            const token = await Cookies.get('token');
            const res = await client.put(url, formData, {
                headers: {
                    'Authorization': token
                }
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
              Toast.fire({
                icon: 'success',
                title: 'Imagen de perfil actualizada satisfactoriamente'
              });
              dispatch(updateImageUser(res.data.user));

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

export const updateImageUser = (user) => ({
    type: types.update_image_user,
    payload: user,
});


export const startUpdatePhoneNumber = (phone_number) =>{
    return async (dispatch) =>{
        try {
            const token = await Cookies.get('token');
            let url = '/auth/update-phone-number';
            const {data} = await client.put(url , phone_number ,{
                headers: {
                    'Authorization': token
                }
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
            Toast.fire({
              icon: 'success',
              title: data.message
            });

            dispatch(loadDataUser(data.user));
        } catch (error) {
            console.log(error);
        }
    }
}

export const startUpdatedPasswordClient = (password) =>{
    return async ()=>{
        try {
            const token = await Cookies.get('token');
            let url = '/auth/changePassword';
            await client.post(url , password ,{
                headers: {
                    'Authorization': token
                }
            });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
            Toast.fire({
              icon: 'success',
              title:"Contraseña actualizada satisfactoriamente"
            });
            
        } catch (error) {
            console.log(error);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
            Toast.fire({
              icon: 'error',
              title:error.response.data.message
            });
        }
    }
}

export const startGetStates = () =>{
    return async (dispatch)=>{

        try {
            let url = '/states';
            const {data} = await client.get(url);
            const states = data.states.map(state=>{
                
                const stateSelect = {
                label:state.name,
                value:state._id
                }

                return stateSelect;
            })
            dispatch(getStatesData(states));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getStatesData = (states) =>({
    type:types.load_states,
    payload:states
});

export const startGetMunicipality = (state_id) =>{
    return async (dispatch) =>{
        try {
            let url = `/municipalities/${state_id}`;
            const {data} =  await client.get(url);
            const municipalities = data.municipalities.map(municipality=>{
                
                const municipalitySelect = {
                label:municipality.name,
                value:municipality._id
                }

                return municipalitySelect;
            })
            dispatch(getMunicipality(municipalities));
        } catch (error) {
            console.log(error);
        }
    }

}

export const getMunicipality = (municipalities) =>({
    type:types.load_municipalities,
    payload:municipalities
});



/**
 * It's an async function that returns a function that dispatches an action creator that returns an
 * action object.
 * @param token - the token that is generated when the user logs in.
 * @returns an object with a type and a payload.
 */
export const startLoadFiscalAddress = (token) =>{
    return async (dispatch)=>{
        try {
            let url = '/auth/sat/direction';
            const {data} = await client.get(url,{
                headers: {
                    'Authorization': token
                }
            });
            dispatch(loadFiscalAddress(data.SATDirection , data.state , data.municipality));
        } catch (error) {
            console.log(error);
        }
    }
}


/**
 * It returns an object with a type property and a payload property.
 * @param customer - {
 */
export const loadFiscalAddress = (customer , state , municipality) =>({
    type:types.load_fiscal_address,
    payload:{
        customer,
        state,
        municipality
    }
});

/**
 * This function is an asynchronous function that returns a function that takes a dispatch function as
 * an argument.
 * @returns An object with a property of type and a property of payload.
 */
 export const startAddFiscalAddress = (formData) =>{
    return async(dispatch)=>{
         try {
            const token =  Cookies.get('token');
            let url = '/auth/save-sat-direction';
            const {data} = await client.post(url,formData,{
                headers: {
                    'Authorization': token
                }
            });
           
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
            Toast.fire({
              icon: 'success',
              title:data.message
            });

            dispatch(AddFiscalAddress(data.customer));
            
         } catch (error) {
             console.log(error);
         }
    }
}

/**
 * AddFiscalAddress is a function that takes a customer object as an argument and returns an object
 * with a type property and a payload property.
 * @param customer - {
 */
export const AddFiscalAddress = (customer) =>({
    type:types.load_fiscal_address,
    payload:customer
});


export const startUpdateFiscalAddress = (fiscalAddress) =>{
    return async (dispatch)=>{
        try {
            const token =  Cookies.get('token');
            let url = '/auth/update-sat-direction';
            const {data} = await client.put(url , fiscalAddress , {
                headers: {
                    'Authorization': token
                }
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            
            Toast.fire({
              icon: 'success',
              title:data.message
            });
            dispatch(updateFiscalAddress(data.customer , data.state , data.municipality));
        } catch (error) {
           console.log(error); 
        }
    }
}

export const updateFiscalAddress = (customer , state , municipality) =>({
    type:types.load_fiscal_address,
    payload:{
        customer,
        state,
        municipality
    }
});


export const startInvoidedOrder = (order_id) =>{
    return async()=>{

        try {
            let url = `/orders/invoice/${order_id}`;
            await client.post(url);
            Swal.fire({
              title:'Operación Exitosa',
              text:"Tu factura ha sido generada satisfactoriamente , te hemos enviado la factura a tu correo electronico , revisa tu bandeja de entrada , si no has recibido el correo contacta al equipo de soporte",
              icon:"success"  
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                title:'Vaya ... Hubo un error',
                text:'Contacta al equipo de soporte o verifica tus datos fiscales',
                icon:"error"  
            })
        }
    }
}

export const invoicedOrder = () =>({
    type:types,

})