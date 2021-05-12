import React, {useState} from "react";
import ReactDOM from "react-dom";


function App() {
    const [message, setMessage] = useState(1);
    setTimeout(() => setMessage(message + 1), 1000);
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

ReactDOM.render(<App/>, document.getElementById('root'));