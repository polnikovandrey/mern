import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">Homepage</Route>
				<Route path="/login">Login</Route>
				<Route path="/register">Register</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;