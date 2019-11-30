import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOn: false,
            seconds: 0,
            minutes: 3,
        };

        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
    }

    handleStartTimer() {
        this.isCountingDown(true);
        this.interval = setInterval(() => {
            const {minutes, seconds} = this.state;

            if (seconds > 0) {
                this.setState(state => ({
                    seconds: state.seconds - 1,
                }));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.interval);
                    this.isCountingDown(false);
                } else {
                    this.setState(state => ({
                        minutes: state.minutes - 1,
                        seconds: 59,
                    }));
                }
            }
        }, 10);
    }

    handleStopTimer() {
        clearInterval(this.interval);
        this.isCountingDown(false);
    }

    // Set isOn state to TRUE or FALSE
    isCountingDown(isOn) {
        this.setState({
            isOn,
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {minutes, seconds} = this.state;
        return (
            <div>
                {this.state.isOn ? (
                    <button onClick={this.handleStopTimer} type={"button"}>
                        {"Stop"}
                    </button>
                ) : (
                    <button onClick={this.handleStartTimer} type={"button"}>
                        {"Start"}
                    </button>
                )}

                {minutes === 0 && seconds === 0 ? (
                    <h1>{this.state.isOn ? "ON" : "OFF"}</h1>
                ) : (
                    <h1>
                        {minutes}
                        {":"}
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                )}
            </div>
        );
    }
}

export default Timer;
