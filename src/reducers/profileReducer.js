import { types } from "../types";

const initialState = {
    user: null,
    directions: [],
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
                directions: [payload, ...state.directions],
            }

        case types.change_default_addres:
            return {
                ...state,
                directions: state.directions.map(direction => direction._id === payload
                    ? { ...direction, default: direction.default = true }
                    : { ...direction, default: direction.default = false })
            }

        case types.delete_addres:
            return{
                ...state,
                directions: state.directions.filter(direction => direction._id !== payload),
            }

        default:
            return state;
    }

}