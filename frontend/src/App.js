import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// auth imports
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Admin imports
import AdminChat from "./components/chat/AdminChat";
import AllUsers from "./components/pages/admin/AllUsers";
import UpdateProfile from "./components/pages/admin/UpdateProfile";
import Attendance from "./components/pages/admin/Attendance";

// User imports
import UserChat from "./components/chat/UserChat";
import MarkAttendance from "./components/pages/MarkAttendance";
import ViewAttendance from "./components/pages/ViewAttendance";

import ProtectedRoutes from "./components/routes/ProtectedRoutes";

import { loadUser } from "./actions/authActions";
import store from "./store";
import Home from "./components/Home";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<div className="App">
				<div className="">
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoutes>
									<Home />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/all-users"
							element={
								<ProtectedRoutes isAdmin={true}>
									<AllUsers />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/edit-profile"
							element={
								<ProtectedRoutes isAdmin={true}>
									<UpdateProfile />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/admin/chat"
							element={
								<ProtectedRoutes isAdmin={true}>
									<AdminChat />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/register"
							element={
								<ProtectedRoutes isAdmin={true}>
									<Register />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/chat"
							element={
								<ProtectedRoutes>
									<UserChat />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/attendance/mark"
							element={
								<ProtectedRoutes>
									<MarkAttendance />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/attendance/view"
							element={
								<ProtectedRoutes>
									<ViewAttendance />
								</ProtectedRoutes>
							}
						/>
						<Route
							path="/attendance"
							element={
								<ProtectedRoutes>
									<Attendance />
								</ProtectedRoutes>
							}
						/>
					</Routes>
				</div>
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
