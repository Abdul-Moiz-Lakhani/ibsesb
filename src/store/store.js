import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import appliancesRecord from "./reducers/appliancesRecord";
import usersList from "./reducers/usersList";

const AllReducers = { 
    userAuth: authReducer,
    appliances: appliancesRecord,
    usersList: usersList
};

export default createStore(combineReducers(AllReducers), {}, applyMiddleware(thunk));