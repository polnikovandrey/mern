import React, {FormEvent, useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Axios from "axios";
import "./AuthForm.scss";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";

function Register() {

	const [ formEmail, setFormEmail ] = useState('');
	const [ formPassword, setFormPassword ] = useState('');
	const [ formPasswordVerify, setFormPasswordVerify ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState(null);

	const { getUser } = useContext(UserContext);
	const history = useHistory();

	async function register(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const registerData = {
			email: formEmail,
			password: formPassword,
			passwordVerify: formPasswordVerify
		};
		try {
			await Axios.post(`${domain}/auth/`, registerData);
		} catch(error) {
			if (error.response) {
				if (error.response.data.errorMessage) {
					setErrorMessage(error.response.data.errorMessage);
				}
			}
			return;
		}
		await getUser();
		history.push('/');
	}

	return (
		<div className="auth-form">
			<h2>Register a new account</h2>
			{ errorMessage && <ErrorMessage message={errorMessage} clear={() => setErrorMessage(null)}/> }
			<form className="form" onSubmit={register}>
				<label htmlFor="form-email">Email</label>
				<input id="form-email" type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)}/>
				<label htmlFor="form-password">Password</label>
				<input id="form-password" type="password" value={formPassword} onChange={(event) => setFormPassword(event.target.value)}/>
				<label htmlFor="form-password-verify">Verify password</label>
				<input id="form-password-verify" type="password" value={formPasswordVerify} onChange={(event) => setFormPasswordVerify(event.target.value)}/>
				<button className="button-submit" type="submit">Register</button>
				<p>Already have an account? <Link to="/login">Login instead</Link></p>
			</form>
		</div>
	);
}

export default Register;