import { types } from "../types";

export const loadWishListfromLocalStorage = (wishList) => ({
    type:types.loadWishListfromLocalStorage,
    payload:wishList
 });