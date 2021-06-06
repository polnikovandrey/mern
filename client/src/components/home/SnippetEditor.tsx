import React, {FormEvent, useEffect, useState} from "react";
import Axios from "axios";
import "./SnippetEditor.scss";

function SnippetEditor({getSnippets, setSnippetEditorOpen, editSnippetData}: any): JSX.Element {

	const [editorTitle, setEditorTitle] = useState("");
	const [editorDescription, setEditorDescription] = useState("");
	const [editorCode, setEditorCode] = useState("");

	useEffect(() => {
		if (editSnippetData) {
			setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
			setEditorDescription(editSnippetData.description ? editSnippetData.description : "");
			setEditorCode(editSnippetData.code ? editSnippetData.code : "");
		}
	}, [editSnippetData]);

	async function saveSnippet(submitEvent: FormEvent<HTMLFormElement>) {
		submitEvent.preventDefault();
		const snippetData = {
			title: editorTitle ? editorTitle : undefined,
			description: editorDescription ? editorDescription : undefined,
			code: editorCode ? editorCode : undefined
		}
		if (editSnippetData) {
			await Axios.put(`http://localhost:5000/snippet/${editSnippetData._id}`, snippetData);
		} else {
			await Axios.post("http://localhost:5000/snippet", snippetData);
		}
		getSnippets();
		closeEditor();
	}

	function closeEditor(): void {
		setSnippetEditorOpen(false);
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
				<button className="button-save" type="submit">Save</button>
				<button className="button-cancel" type="button" onClick={() => closeEditor()}>Cancel</button>
			</form>
		</div>
	);
}

export default SnippetEditor;