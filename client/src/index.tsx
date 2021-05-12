import React, {useState} from "react";
import ReactDOM from "react-dom";


function App() {

    const [showMessage, setShowMessage] = useState(false);

    function handleClick() {
        setShowMessage(!showMessage);
    }

    return (
        <>
            <button onClick={handleClick}>Click me</button>
            {showMessage && <p>Message is visible</p>}
            {showMessage ? <Message message="Toggled on"/> : <Message message="Toggled off"/>}
        </>
    );
}

function Message(properties: any) {
    return <p>{properties.message}</p>;
}

ReactDOM.render(<App/>, document.getElementById('root'));