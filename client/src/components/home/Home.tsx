import React, {useEffect, useState} from "react";
import Axios from "axios";

function Home(): JSX.Element {
	const [snippets, setSnippets] = useState([]);

	useEffect(() => {
		getSnippets();
	}, []);

	async function getSnippets() {
		const snippetsResponse = await Axios.get('http://localhost:5000/snippet/');
		setSnippets(snippetsResponse.data);
	}

	return <div className="home">Home</div>;
}

export default Home;