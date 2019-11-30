import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOn: false,
            seconds: 0,
            minutes: 3,
            sessionLength: 3,
        };

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleIncreaseTime = this.handleIncreaseTime.bind(this);
        this.handleDecreaseTime = this.handleDecreaseTime.bind(this);
    }

    handleStart() {
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
        }, 100);
    }

    handleStop() {
        clearInterval(this.interval);
        this.isCountingDown(false);
    }

    handleReset() {
        this.handleStop();
        this.setState(prevState => ({
            seconds: 0,
            minutes: prevState.sessionLength,
        }));
    }

    handleIncreaseTime() {
        this.setState(state => ({
            minutes: state.minutes + 1,
            seconds: 0,
        }));
    }

    handleDecreaseTime() {
        if (this.state.minutes > 1) {
            this.setState(state => ({
                minutes: state.minutes - 1,
                seconds: 0,
            }));
        }
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
                    <button onClick={this.handleStop} type={"button"}>
                        {"Stop"}
                    </button>
                ) : (
                    <button onClick={this.handleStart} type={"button"}>
                        {"Start"}
                    </button>
                )}
                <button onClick={this.handleReset} type={"button"}>
                    {"Reset"}
                </button>
                <button onClick={this.handleIncreaseTime} type={"button"}>
                    {"UP"}
                </button>
                <button onClick={this.handleDecreaseTime} type={"button"}>
                    {"DOWN"}
                </button>

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
