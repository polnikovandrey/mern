import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

function App(): JSX.Element {

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        console.log('Component update side effect');
    });

    useEffect(() => {
        console.log('Component specific state update side effect');
    }, [showMessage]);

    return (
        <>
            <button onClick={() => setShowMessage(!showMessage)}>Toggle message</button>
            {showMessage && (
                <>
                    <Random/>
                    <p>Some message</p>
                </>
            )}
        </>
    );
}

function Random(): JSX.Element {

    const [randomNumber, setRandomNumber] = useState(Math.random());

    useEffect(() => {
        console.log('Component mount side effect');
        const intervalId = setInterval(() => setRandomNumber(Math.random()), 1000);
        return () => {
            console.log('Component unmount side effect');
            clearInterval(intervalId);
        };
    }, []);

    return <h1>{randomNumber}</h1>;
}

ReactDOM.render(<App/>, document.getElementById('root'));