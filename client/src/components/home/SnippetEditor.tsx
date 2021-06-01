import React, {FormEvent, useState} from "react";
import Axios from "axios";

function SnippetEditor(properties: any): JSX.Element {

	const [editorTitle, setEditorTitle] = useState("");
	const [editorDescription, setEditorDescription] = useState("");
	const [editorCode, setEditorCode] = useState("");

	async function saveSnippet(submitEvent: FormEvent<HTMLFormElement>) {
		submitEvent.preventDefault();
		const snippetData = {
			title: editorTitle ? editorTitle : undefined,
			description: editorDescription ? editorDescription : undefined,
			code: editorCode ? editorCode : undefined
		}
		await Axios.post("http://localhost:5000/snippet", snippetData);
		properties.getSnippets();
		closeEditor();
	}

	function closeEditor(): void {
		properties.setNewSnippetEditorOpen(false);
		setEditorTitle("");
		setEditorDescription("");
		setEditorCode("");
	}

	return (
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
	);
}

export default SnippetEditor;