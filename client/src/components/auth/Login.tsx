import React, {FormEvent, useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Axios from "axios";
import "./AuthForm.scss";
import UserContext from "../../context/UserContext";

function Login() {

	const [ formEmail, setFormEmail ] = useState('');
	const [ formPassword, setFormPassword ] = useState('');

	const { getUser } = useContext(UserContext);

	const history = useHistory();

	async function register(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const loginData = {
			email: formEmail,
			password: formPassword
		};
		await Axios.post("http://localhost:5000/auth/login", loginData);
		await getUser();
		history.push('/');
	}

	return (
		<div className="auth-form">
			<h2>Log in</h2>
			<form className="form" onSubmit={register}>
				<label htmlFor="form-email">Email</label>
				<input id="form-email" type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)}/>
				<label htmlFor="form-password">Password</label>
				<input id="form-password" type="password" value={formPassword} onChange={(event) => setFormPassword(event.target.value)}/>
				<button className="button-submit" type="submit">Log in</button>
				<p>Don't have an account yet? <Link to="/register">Register here</Link></p>
			</form>
		</div>
	);
}

export default Login;