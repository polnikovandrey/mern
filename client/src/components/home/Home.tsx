import React, {FormEvent, useEffect, useState} from "react";
import Axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";

function Home(): JSX.Element {
	const [snippets, setSnippets] = useState([]);
	const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);

	useEffect(() => {
		getSnippets();
	}, []);

	async function getSnippets() {
		const snippetsResponse = await Axios.get('http://localhost:5000/snippet/');
		setSnippets(snippetsResponse.data);
	}

	function renderSnippets() {
		const snippetsClone = [...snippets];
		const sortedSnippets = snippetsClone.sort((a: any, b: any) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
		return sortedSnippets.map((snippet, index) => {
			return <Snippet key={index} snippet={snippet}/>
		});
	}

	return (
		<div className="home">
			{!newSnippetEditorOpen && <button onClick={() => setNewSnippetEditorOpen(true)}>Add snippet</button>}
			{newSnippetEditorOpen && (
				<SnippetEditor setNewSnippetEditorOpen={setNewSnippetEditorOpen} getSnippets={getSnippets}/>
			)}
			{renderSnippets()}
		</div>
	);
}

export default Home;