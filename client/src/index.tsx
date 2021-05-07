import React from "react";
import ReactDOM from "react-dom";

const name: string = 'Andrey Polnikov';
const element = <div style={{background: "orange"}}>
    <h1 className="red">Hello, {name}</h1>
</div>;
ReactDOM.render(element, document.getElementById('root'));