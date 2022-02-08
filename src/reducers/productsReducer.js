import { types } from "../types";

const initalState = {
    products:[]
}

export const productsReducer = (state = initalState , action) =>{
    switch (action.type) {
        case types.loadProducts:
          return {
              ...state,
              products:action.payload
          }
        default:
           return state;
    }
}