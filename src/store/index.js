import { createWrapper } from "next-redux-wrapper";
import { createStore , applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer, productsReducer } from "../reducers";

const reducers = combineReducers({
  auth: authReducer,
  products: productsReducer
});

const middleware = [thunk]
const makeStore = () => createStore(reducers , composeWithDevTools(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);

