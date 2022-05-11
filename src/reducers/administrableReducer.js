import { types } from "../types";

const initialState = {
    logo: '',
    top_text:'',
    facebook:'',
    instagram:'',
    tiktok:'',
    aboutUs:{},
    mission:{},
    acceptCookiesPoliticy:false
}


export const administrableReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.loadAdministrableLogo:
            return{
                ...state,
                logo:payload.logo,
                top_text:payload.top_text,
                facebook:payload.facebook,
                instagram:payload.instagram,
                tiktok:payload.tiktok
            }
        case types.loadAdministrableAbout:
            return{
                ...state,
                aboutUs: payload.about.aboutThat,
                mission: payload.about.mission
            }
        case types.accept_cookies_politicy:
            return{
                ...state,
                acceptCookiesPoliticy:true
            }
        default:
            return state;
    }
}