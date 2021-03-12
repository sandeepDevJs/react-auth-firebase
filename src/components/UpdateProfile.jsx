import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [err, seterr] = useState();
	const [loading, setloading] = useState(false);
	const history = useHistory();

	const { currentUser, updateEmail, updatePassword } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		setloading(true);

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return seterr("Passwords Do Not Match!");
		}

		const promises = [];
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push("/");
			})
			.catch((err) => {
				seterr(err.message);
				setloading(false);
			})
			.finally(() => setloading(false));
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{err && <Alert variant="danger">{err}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								defaultValue={currentUser.email}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passwordRef}
								placeholder="Leave blank to keep the same"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password Confirm</Form.Label>
							<Form.Control
								type="password"
								ref={passwordConfirmRef}
								placeholder="Leave blank to keep the same"
							/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/">Cancel</Link>
			</div>
		</>
	);
};

export default UpdateProfile;
