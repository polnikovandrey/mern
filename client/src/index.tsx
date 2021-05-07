import React from "react";
import ReactDOM from "react-dom";

function clock() {
    ReactDOM.render(
        (
            <div>
                <h1>Clock</h1>
                <p>It's {new Date().toLocaleTimeString()}</p>
            </div>
        ),
        document.getElementById('root'));
}
setInterval(clock, 1000);