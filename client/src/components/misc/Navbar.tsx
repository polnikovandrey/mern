import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./Navbar.scss";
import UserContext from "../../context/UserContext";
import Axios from "axios";

function Navbar(): JSX.Element {

	const { user, getUser } = useContext(UserContext);

	async function logout() {
		await Axios.get('http://localhost:5000/auth/logout');
		await getUser();
	}

	return (
		<div className="navbar">
			<Link to="/">
				<h1>Snippet manager</h1>
			</Link>
			{
				!user
					? (
						<>
							<Link to="/login">Log in</Link>
							<Link to="/register">Register</Link>
						</>)
					: <button className="button-logout" onClick={logout}>Log out</button>
			}
		</div>
	);
}

export default Navbar;