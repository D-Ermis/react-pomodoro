import React from "react";
import Timer from "../Timer";

function App() {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col s12"}>
                    <h1>{"Pomodoggy"}</h1>
                </div>
            </div>
            <Timer />
            <div className={"row"}>
                <div className={"col s12"}>
                    <span>{"Speed x100 for testing purposes"}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
