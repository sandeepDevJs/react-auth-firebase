import React, { useState, useContext, useEffect } from "react";
import { auth } from "../shared/firebase";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
	const [currentUser, setcurrentUser] = useState();
	const [loading, setloading] = useState(true);

	const signUp = (email, password) =>
		auth.createUserWithEmailAndPassword(email, password);

	const login = (email, password) =>
		auth.signInWithEmailAndPassword(email, password);

	const logout = () => auth.signOut();

	const resetPassword = (email) => auth.sendPasswordResetEmail(email);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setcurrentUser(user);
			setloading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		login,
		logout,
		resetPassword,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
