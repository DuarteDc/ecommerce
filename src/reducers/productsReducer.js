import { types } from "../types";

const initalState = {
    products:[]
}

export const productsReducer = (state = initalState , {type , payload}) =>{

    switch (type) {
        case types.loadProducts:
          return {
              ...state,
              products:payload
          }
        default:
           return state;
    }
}