import React from "react";
import ReactDOM from "react-dom";

function App(properties: any) {
    const message: string = properties.message;
    return (
        <>
            <Welcome user="John Doe" message={message}/>
            <Welcome user="Jane Doe" message={message}/>
            <Welcome user="Pete Doe" message={message}/>
        </>
    );
}

function Welcome(properties: any) {
    return (
        <>
            <h1>Welcome, {properties.user}</h1>
            <p>{properties.message}</p>
        </>
    );
}

ReactDOM.render(<App message="to the React playground"/>, document.getElementById('root'));