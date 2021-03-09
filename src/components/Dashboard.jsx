import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
	const [err, seterr] = useState();
	const history = useHistory();

	const handleLogout = async () => {
		seterr(" ");
		try {
			await logout();
			history.push("/login");
		} catch (errs) {
			seterr("Some Error Has Occured!");
		}
	};

	const { currentUser, logout } = useAuth();

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{err && <Alert variant="danger">{err}</Alert>}
					<strong>Email : </strong> {currentUser.email}
					<Link to="/updateProfile" className="btn btn-primary w-100 mt-3">
						Update
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	);
};

export default Dashboard;
