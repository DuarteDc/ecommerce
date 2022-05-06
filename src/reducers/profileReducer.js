import { types } from "../types";

const initialState = {
    user: null,
    directions: [],
    states:[],
    municipalities:[],
    fiscalAddress:{},
    stateSelected:{},
    municipalitySelected:{}
}


export const profileReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.load_data_user:
            return {
                ...state,
                user: payload
            }

        case types.load_directions:
            return {
                ...state,
                directions: payload
            }

        case types.add_new_address:
            return {
                ...state,
                directions: [...state.directions, payload],
            }

        case types.change_default_addres:
            return {
                ...state,
                directions: state.directions.map(direction => direction._id === payload
                    ? { ...direction, default: direction.default = true }
                    : { ...direction, default: direction.default = false })
            }

        case types.delete_addres:
            return {
                ...state,
                directions: state.directions.filter(direction => direction._id !== payload),
            }

        case types.update_data_user:
            return {
                ...state,
                user:{...state.user, fullname: state.user.fullname = payload.fullname,
                    email:state.user.email = payload.email,
                    phone: state.user.phone = payload.phone,
                }
            }

        case types.update_image_user:
            return {
                ...state,
                user: {...state.user, payload}
            }
        case types.load_states:
            return{
                ...state,
                states:payload
            }
        case types.load_municipalities:
            return{
                ...state,
                municipalities:payload
            }
        case types.load_fiscal_address:
            return{
                ...state,
                fiscalAddress:payload.customer,
                stateSelected:payload.state,
                municipalitySelected:payload.municipality
            }
        default:
            return state;
    }

}