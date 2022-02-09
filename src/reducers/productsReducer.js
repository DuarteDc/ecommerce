import { types } from "../types";

const initalState = {
    products:[],
    productSelected:null
}

export const productsReducer = (state = initalState , {type , payload}) =>{
    switch (type) {
        case types.loadProducts:
          return {
              ...state,
              products:payload
          }
        case types.addProductSelected:
            return{
                ...state,
                productSelected:payload
            }
        default:
           return state;
    }
}