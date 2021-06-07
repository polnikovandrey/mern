import React, {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import Axios from "axios";

function Register() {

	const [ formEmail, setFormEmail ] = useState('');
	const [ formPassword, setFormPassword ] = useState('');
	const [ formPasswordVerify, setFormPasswordVerify ] = useState('');

	async function register(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const registerData = {
			email: formEmail,
			password: formPassword,
			passwordVerify: formPasswordVerify
		};
		await Axios.post("http://localhost:5000/auth/", registerData);
	}

	return (
		<div className="auth-form">
			<h2>Register a new account</h2>
			<form onSubmit={register}>
				<label htmlFor="form-email">Email</label>
				<input id="form-email" type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)}/>
				<label htmlFor="form-password">Password</label>
				<input id="form-password" type="password" value={formPassword} onChange={(event) => setFormPassword(event.target.value)}/>
				<label htmlFor="form-password-verify">Verify password</label>
				<input id="form-password-verify" type="password" value={formPasswordVerify} onChange={(event) => setFormPasswordVerify(event.target.value)}/>
				<button type="submit">Register</button>
				<p>Already have an account? <Link to="/login">Login instead</Link></p>
			</form>
		</div>
	);
}

export default Register;