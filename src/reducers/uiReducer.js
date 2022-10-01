import { types } from "../types"
const initialState = {
    dimensions: ''
}

export const uiReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.load_dimensions_of_browser:
            return {
                ...state,
                dimensions: payload
            }

        default:
            return state;
    }

}