import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import { types } from "../types";

const initalState = {
    sliders: []
}

export const sliderReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case types.loadSlidersData:
            return {
                ...state,
                sliders: payload
            }
        default:
            return state;
    }
}