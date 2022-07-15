import client from '../config/axiosConfig';
import { types } from '../types';


/**
 * It's an async function that returns a function that returns a promise that returns a function that
 * returns
 * @returns an object with a type and a payload.
 */
export const startLoadAdministrableLogo = () =>{
    return async (dispatch)=>{
        try {
            let url = 'administrable/logo';
            const {data} = await client.get(url);
            dispatch(loadAdministrableLogo(data.logo));
        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * This function returns an object with a type property and a payload property.
 * @param administrable - {
 */
export const loadAdministrableLogo = (administrable) =>({
   type:types.loadAdministrableLogo,
   payload:administrable
});


/**
 * It's an async function that returns a function that returns a promise.
 * @returns an object with a type of 'LOAD_ADMINISTRABLE_ABOUT' and a payload of 'about'
 */
export const startLoadAdministrableAbout = () =>{
    return async (dispatch)=>{
        try {
            let url = 'administrable/about';
            const {data} = await client.get(url);
            dispatch(loadAdministrableAbout(data.about))
        } catch (error) {
            console.log(error);
            
        }
    }
}
/**
 * It takes an object as an argument and returns an object with a type and a payload.
 * @param about - {
 */

export const loadAdministrableAbout = (about) =>({
   type:types.loadAdministrableAbout,
   payload:about
   
});

export const acceptCookies = () =>({
    type:types.accept_cookies_politicy
});

