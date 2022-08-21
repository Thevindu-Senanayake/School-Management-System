import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/authReducer";
import {
	allUsersReducer,
	userDetailsReducer,
	updateUserReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
	auth: authReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	updateUser: updateUserReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
