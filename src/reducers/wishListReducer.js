import { types } from "../types";

const initialState = {
    wishList:[]
}
export const wishListReducer = ( state = initialState , { type , payload}  ) =>{
    switch (type) {
        case types.loadWishListfromLocalStorage:
            return{
                ...state,
                wishList:payload
            }
        default:
            return state;
    }
}