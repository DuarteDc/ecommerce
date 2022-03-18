import { types } from "../types";

const initialState = {
    logo: '',
    top_text:'',
    facebook:'',
    instagram:'',
    tiktok:''
}


export const administrableReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadAdministrableData:
            return{
                ...state,
                logo:payload.logo,
                top_text:payload.top_text,
                facebook:payload.facebook,
                instagram:payload.instagram,
                tiktok:payload.tiktok
            }
        default:
            return state;
    }
}