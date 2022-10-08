import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer, productsReducer, categoryReducer, shoppingCartReducer, offersReducer, tagsReducer, brandsReducer, newsletterReducer, sliderReducer, administrableReducer, profileReducer, wishListReducer, checkoutReducer, faqsReducer, ordersReducer, reviewsReducers, countryReducer, uiReducer } from "../reducers";
const reducers = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
  cart: shoppingCartReducer,
  checkout: checkoutReducer,
  offers: offersReducer,
  tags: tagsReducer,
  sliders: sliderReducer,
  brands: brandsReducer,
  newsletter: newsletterReducer,
  administrable: administrableReducer,
  profile: profileReducer,
  wishList: wishListReducer,
  faqs: faqsReducer,
  orders: ordersReducer,
  reviews: reviewsReducers,
  countries: countryReducer,
  ui: uiReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    if (state.wishList) nextState.wishList = state.wishList;
    if (state.auth) nextState.auth = state.auth;
    if (state.cart) nextState.cart = state.cart;
    return nextState;
  } else {
    return reducers(state, action);
  }
}

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const middleware = [thunk]
const makeStore = () => createStore(reducer, bindMiddleware(middleware));

export const wrapper = createWrapper(makeStore);

