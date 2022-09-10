import { types } from "../types";

const initalState = {
    countries: [],
    country: {},
    currencies: {},
}

export const countryReducer = (state = initalState, { type, payload }) => {
    switch (type) {

        case types.load_countries:
            return {
                ...state,
                countries: payload,
            }

        case types.country_selected:
            return {
                ...state,
                country: state.countries.find(country => country._id === payload),
            }

        case types.clear_country_selected:
            return {
                ...state,
                country: ''
            }
        case types.load_currencies:
            return {
                ...state,
                currencies: payload,
            }

        default:
            return state
    }
}