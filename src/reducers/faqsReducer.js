import { types } from "../types";

const initalState = {
    faqs: [],
}

export const faqsReducer = (state = initalState, { type, payload }) => {
    switch (type) {

        case types.load_faqs:
            return {
                ...state,
                faqs: payload
            }

        default:
            return state
    }
}