import React, {useState} from "react";
import ReactDOM from "react-dom";


function App() {

    const [clicks, setClicks] = useState(0);

    function handleClick() {
        setClicks(clicks + 1);
    }

    return (
        <>
            <button onClick={handleClick}>Click me</button>
            <p>{clicks}</p>
        </>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));