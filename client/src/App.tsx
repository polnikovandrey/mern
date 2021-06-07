import React from "react";
import Router from "./Router";
import "./style/index.scss";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function App(): JSX.Element {
	return <div className="container"><Router/></div>;
}

export default App;