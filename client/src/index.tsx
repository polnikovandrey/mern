import React from "react";
import ReactDOM from "react-dom";

function Welcome(properties: any) {
    return <h1>Welcome, {properties.user}</h1>;
}

const toRender = <div>
    <Welcome user="John Doe"/>
    <Welcome user="Jane Doe"/>
    <Welcome user="Peter Doe"/>
</div>

ReactDOM.render(toRender, document.getElementById('root'));