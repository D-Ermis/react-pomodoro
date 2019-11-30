import React from "react";
import Timer from "../Timer";

function App() {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col s12"}>
                    <h1>{"Pomodoro"}</h1>
                </div>
            </div>
            <Timer />
        </div>
    );
}

export default App;
