import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
	return (
		<Container
			className="d-flex align-items justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<h1>Firebase Auth Control</h1>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path="/" component={Dashboard} />
							<PrivateRoute path="/updateProfile" component={UpdateProfile} />
							<Route path="/signup" component={SignUp} />
							<Route path="/login" component={Login} />
							<Route path="/forgotpassword" component={ForgotPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
