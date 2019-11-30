import React from "react";
import Timer from "../Timer";

function App() {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col s12"}>
                    <h1>{"Pomodoro"}</h1>
                    <h2>{"by Doggy"}</h2>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col s12"}>
                    <Timer />
                </div>
            </div>
        </div>
    );
}

export default App;
