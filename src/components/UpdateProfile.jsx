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

	const { signUp } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setloading(true);
		if (passwordRef.current.value === passwordConfirmRef.current.value) {
			try {
				seterr("");
				await signUp(emailRef.current.value, passwordRef.current.value);
				history.push("/");
			} catch (er) {
				seterr(er.message);
			}
		} else {
			seterr("Passwords do not match!");
		}
		setloading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{err && <Alert variant="danger">{err}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password Confirm</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already Have An Account ? <Link to="/login">Login</Link>
			</div>
		</>
	);
};

export default UpdateProfile;
