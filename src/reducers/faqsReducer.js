import { types } from "../types";

const initalState = {
    faqs: [],
    categories: [],
}

export const faqsReducer = (state = initalState, { type, payload }) => {
    switch (type) {

        case types.load_faqs:
            return {
                ...state,
                faqs: payload
            }

        case types.load_faqs_categories:
            return {
                ...state,
                categories: payload
            }
        case types.load_faqs_per_category:
            return {
                ...state,
                faqs: payload
            }

        default:
            return state
    }
}