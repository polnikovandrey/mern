import React from "react";
import Axios from "axios";
import "./Snippet.scss";
import domain from "../../util/domain";

function Snippet({snippet, getSnippets, editSnippet}: any): JSX.Element {

	async function deleteSnippet() {
		if (window.confirm("Do you want to delete the snippet?")) {
			await Axios.delete(`${domain}/snippet/${snippet._id}`);
			getSnippets();
		}
	}

	return (
		<div className="snippet">
			{snippet.title && <h2 className="title">{snippet.title}</h2>}
			{snippet.description && <p className="description">{snippet.description}</p>}
			{snippet.code && (
				<pre className="code">
					<code>
						{snippet.code}
					</code>
				</pre>
			)}
			<button className="button-edit" onClick={() => editSnippet(snippet)}>Edit</button>
			<button className="button-delete" onClick={deleteSnippet}>Delete</button>
		</div>
	);
}

export default Snippet;