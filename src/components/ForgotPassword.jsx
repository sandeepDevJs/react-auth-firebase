import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const emailRef = useRef();

	const [err, seterr] = useState();
	const [loading, setloading] = useState(false);
	const [message, setmessage] = useState("");

	const { resetPassword } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setloading(true);
		try {
			setmessage("");
			seterr("");
			await resetPassword(emailRef.current.value);
			setmessage("Check Mail For Further Instructions!");
		} catch (er) {
			seterr(er.message);
		}
		setloading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Forgot Password</h2>
					{err && <Alert variant="danger">{err}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Reset!
						</Button>
					</Form>
					<div className="w-100 text-center mt-2">
						<Link to="/login">Log In</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't Have An Account ? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
};

export default ForgotPassword;
