import React, {useEffect, useState} from "react";
import Axios from "axios";
import Snippet from "./Snippet";

function Home(): JSX.Element {
	const [snippets, setSnippets] = useState([]);

	useEffect(() => {
		getSnippets();
	}, []);

	async function getSnippets() {
		const snippetsResponse = await Axios.get('http://localhost:5000/snippet/');
		setSnippets(snippetsResponse.data);
	}

	function renderSnippets() {
		return snippets.map((snippet, index) => {
			return <Snippet key={index} snippet={snippet}/>
		});
	}

	return (
		<div className="home">
			{renderSnippets()}
		</div>
	);
}

export default Home;