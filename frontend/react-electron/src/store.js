import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/authReducer";
import {
	allUsersReducer,
	userDetailsReducer,
	updateUserReducer,
	adminContactsReducer,
	adminsReducer,
} from "./reducers/userReducer";
import { markAttendaceReducer } from "./reducers/attendanceReducer";

const reducer = combineReducers({
	auth: authReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	updateUser: updateUserReducer,
	admins: adminsReducer,
	adminContacts: adminContactsReducer,
	markAttendance: markAttendaceReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
