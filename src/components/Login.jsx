import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [err, seterr] = useState();
	const [loading, setloading] = useState(false);
	const history = useHistory();

	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setloading(true);
		try {
			seterr("");
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (er) {
			seterr(er.message);
		}
		setloading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Login</h2>
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
						<Button disabled={loading} className="w-100" type="submit">
							Login
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't Have An Account ? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
};

export default Login;
