import { HYDRATE } from "next-redux-wrapper";
import { types } from "../types";

const initalState = {
   slidersData:[]
}

export const sliderReducer = (state = initalState , {type, payload}) =>{
   switch (type) {
       case HYDRATE:
          return { ...state, ...action.payload.settings };
          
       case types.loadSlidersData:
           return{
               ...state,
               slidersData:payload
           }
       default:
           return state;
   }   
}