import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

function Home(): JSX.Element {
	const [snippets, setSnippets] = useState([]);
	const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
	const [editSnippetData, setEditSnippetData] = useState(null);

	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			getSnippets();
		} else {
			setSnippets([]);
		}
	}, [user]);

	async function getSnippets() {
		const snippetsResponse = await Axios.get(`${domain}/snippet/`);
		setSnippets(snippetsResponse.data);
	}

	function editSnippet(snippetData: any) {
		setEditSnippetData(snippetData);
		setSnippetEditorOpen(true);
	}

	function renderSnippets() {
		const snippetsClone = [...snippets];
		const sortedSnippets = snippetsClone.sort((a: any, b: any) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
		return sortedSnippets.map((snippet, index) => {
			return <Snippet key={index} snippet={snippet} getSnippets={getSnippets} editSnippet={editSnippet}/>
		});
	}

	return (
		<div className="home">
			{!snippetEditorOpen && user && <button className="button-editor-toggle" onClick={() => setSnippetEditorOpen(true)}>Add snippet</button>}
			{snippetEditorOpen && (
				<SnippetEditor setSnippetEditorOpen={setSnippetEditorOpen} getSnippets={getSnippets} editSnippetData={editSnippetData}/>
			)}
			{snippets.length > 0
				? renderSnippets()
				: (user && <p className="no-snippets-message">No snippets have been added</p>)
			}
			{
				user === null && (
					<div className="no-user-message">
						<h2>Welcome to the Snippet Manager</h2>
						<Link to="/register">Register here</Link>
					</div>
				)
			}
		</div>
	);
}

export default Home;