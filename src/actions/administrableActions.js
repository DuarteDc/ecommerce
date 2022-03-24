import client from '../config/axiosConfig';
import { types } from '../types';


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

export const loadAdministrableLogo = (administrable) =>({
   type:types.loadAdministrableLogo,
   payload:administrable
});


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

export const loadAdministrableAbout = (about) =>({
   type:types.loadAdministrableAbout,
   payload:about
   
})
