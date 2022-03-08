import { types } from "../types";

const initalState = {
   slidersData:[]
}

export const sliderReducer = (state = initalState , {type, payload}) =>{
   switch (type) {
       case types.loadSlidersData:
           return{
               ...state,
               slidersData:payload
           }
       default:
           return state;
   }   
}