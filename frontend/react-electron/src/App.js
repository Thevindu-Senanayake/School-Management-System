import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

// auth imports
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Home from "./components/Home";

import Chat from "./components/chat/Chat";

import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import { loadUser } from "./actions/authActions";
import store from "./store";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<div className="App">
				<div className="container container-fluid">
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoutes>
									<Home />
								</ProtectedRoutes>
							}
						/>
					</Routes>
				</div>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
