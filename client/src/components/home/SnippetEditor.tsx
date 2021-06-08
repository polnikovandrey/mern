import React, {FormEvent, useEffect, useState} from "react";
import Axios from "axios";
import "./SnippetEditor.scss";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";

function SnippetEditor({getSnippets, setSnippetEditorOpen, editSnippetData}: any): JSX.Element {

	const [editorTitle, setEditorTitle] = useState("");
	const [editorDescription, setEditorDescription] = useState("");
	const [editorCode, setEditorCode] = useState("");
	const [ errorMessage, setErrorMessage ] = useState(null);

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
		try {
			if (editSnippetData) {
				await Axios.put(`${domain}/snippet/${editSnippetData._id}`, snippetData);
			} else {
				await Axios.post(`${domain}/snippet`, snippetData);
			}
		} catch(error) {
			if (error.response) {
				if (error.response.data.errorMessage) {
					setErrorMessage(error.response.data.errorMessage);
				}
			}
			return;
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
			{ errorMessage && <ErrorMessage message={errorMessage} clear={() => setErrorMessage(null)}/> }
			<form className="form" onSubmit={(e) => saveSnippet(e)}>
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