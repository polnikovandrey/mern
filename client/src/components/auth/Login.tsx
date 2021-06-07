import React, {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import Axios from "axios";

function Login() {

	const [ formEmail, setFormEmail ] = useState('');
	const [ formPassword, setFormPassword ] = useState('');

	async function register(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const loginData = {
			email: formEmail,
			password: formPassword
		};
		await Axios.post("http://localhost:5000/auth/login", loginData);
	}

	return (
		<div className="auth-form">
			<h2>Log in</h2>
			<form onSubmit={register}>
				<label htmlFor="form-email">Email</label>
				<input id="form-email" type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)}/>
				<label htmlFor="form-password">Password</label>
				<input id="form-password" type="password" value={formPassword} onChange={(event) => setFormPassword(event.target.value)}/>
				<button type="submit">Log in</button>
				<p>Don't have an account yet? <Link to="/register">Register here</Link></p>
			</form>
		</div>
	);
}

export default Login;