import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

function App() {

    const snippets: Array<{ title: string }> = [
        { title: 'Snippet1' },
        { title: 'Snippet2' },
        { title: 'Snippet3' }
    ];

    function renderSnippets() {
        return snippets.map(({title}, index) => {
            return <Snippet title={title} key={index}/>;
        })
    }

    return (
        <>{renderSnippets()}</>
    );
}

function Snippet(properties: any) {
    return <h1>{properties.title}</h1>
}

ReactDOM.render(<App/>, document.getElementById('root'));