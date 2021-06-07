import React from "react";
import Axios from "axios";
import {UserContextProvider} from "./context/UserContext";
import "./style/index.scss";
import Router from "./Router";

Axios.defaults.withCredentials = true;

function App(): JSX.Element {
	return (
		<UserContextProvider>
			<div className="container">
				<Router/>
			</div>
		</UserContextProvider>
	);
}

export default App;