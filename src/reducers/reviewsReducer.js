import { types } from "../types";

const initialState = {
    reviews: '',
}

export const reviewsReducers = (state = initialState, { type, payload }) => {

    switch (type) {
        case types.start_load_reviews:
            return {
                ...state,
                reviews: payload,
            }

        default:
            return state;
    }

}