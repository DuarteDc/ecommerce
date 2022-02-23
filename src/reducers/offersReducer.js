import { types } from "../types";

const initalState = {
    offers: [],
}

export const offersReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case types.loadOffers:
            return {
                ...state,
                offers: payload
            }
        default:
            return state;
    }
}