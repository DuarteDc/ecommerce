import { types } from "../types";

export const loadDimensionsOfBrowser = (dimensions) => ({
    type: types.load_dimensions_of_browser,
    payload: dimensions
});