import { types } from "../types";

const initalState = {
    tags: []
}

export const tagsReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case types.loadTags:
            return {
                ...state,
                tags: payload
            }
        default:
            return state
    }
}