import { createStore , applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "../reducers";

const reducers = combineReducers({
   auth: authReducer
});

export const makeStore =  createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);
