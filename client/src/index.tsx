import React, {useState, useEffect, FormEvent} from "react";
import ReactDOM from "react-dom";

function App() {

    const [formUserName, setFormUserName] = useState('');
    const [formPassword, setFormPassword] = useState('');

    function sendData(event: FormEvent): void {
        event.preventDefault();
        setFormUserName('');
        setFormPassword('');
    }

    return (
        <>
            <form onSubmit={sendData}>
                <input type="text" placeholder="Username" value={formUserName} onChange={(event) => setFormUserName(event.target.value)}/>
                <input type="password" placeholder="Password" value={formPassword} onChange={(event) => setFormPassword(event.target.value)}/>
                <button type="submit">Log in</button>
            </form>
        </>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));