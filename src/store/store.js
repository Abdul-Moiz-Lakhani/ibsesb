import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";

const AllReducers = { 
    userAuth: authReducer,
};

export default createStore(combineReducers(AllReducers), {}, applyMiddleware(thunk));