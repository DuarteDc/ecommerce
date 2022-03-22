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
                user: "xD"
            }

        case types.load_directions:
            return {
                ...state,
                directions: payload
            }


        default:
            return state;
    }

}