import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import AuthProvider from "./contexts/AuthContext";

function App() {
	return (
		<AuthProvider>
			<Container
				className="d-flex align-items justify-content-center"
				style={{ minHeight: "100vh" }}
			>
				<div className="w-100" style={{ maxWidth: "400px" }}>
					<SignUp />
				</div>
			</Container>
		</AuthProvider>
	);
}

export default App;
