import React, {FormEvent, useEffect, useState} from "react";
import Axios from "axios";
import Snippet from "./Snippet";

function Home(): JSX.Element {
	const [snippets, setSnippets] = useState([]);
	const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);
	const [editorTitle, setEditorTitle] = useState("");
	const [editorDescription, setEditorDescription] = useState("");
	const [editorCode, setEditorCode] = useState("");

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

	async function saveSnippet(submitEvent: FormEvent<HTMLFormElement>) {
		submitEvent.preventDefault();
		const snippetData = {
			title: editorTitle ? editorTitle : undefined,
			description: editorDescription ? editorDescription : undefined,
			code: editorCode ? editorCode : undefined
		}
		await Axios.post("http://localhost:5000/snippet", snippetData);
		getSnippets();
		closeEditor();
	}

	function closeEditor(): void {
		setNewSnippetEditorOpen(false);
		setEditorTitle("");
		setEditorDescription("");
		setEditorCode("");
	}

	return (
		<div className="home">
			{!newSnippetEditorOpen && <button onClick={() => setNewSnippetEditorOpen(true)}>Add snippet</button>}
			{newSnippetEditorOpen && (
				<div className="snippet-editor">
					<form onSubmit={(e) => saveSnippet(e)}>
						<label htmlFor="editor-title">Title</label>
						<input id="editor-title" type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)}/>
						<label htmlFor="editor-description">Description</label>
						<input id="editor-description" type="text" value={editorDescription} onChange={(e) => setEditorDescription(e.target.value)}/>
						<label htmlFor="editor-code">Code</label>
						<textarea id="editor-code" value={editorCode} onChange={(e) => setEditorCode(e.target.value)}/>
						<button type="submit">Save snippet</button>
						<button type="button" onClick={() => closeEditor()}>Cancel</button>
					</form>
				</div>
			)}
			{renderSnippets()}
		</div>
	);
}

export default Home;