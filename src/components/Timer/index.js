import React from "react";
import Modal from "../Modal";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOn: false,
            seconds: 0,
            minutes: 5,
            sessionLength: 5,
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
                    this.handleStop();
                } else {
                    this.setState(state => ({
                        minutes: state.minutes - 1,
                        seconds: 59,
                    }));
                }
            }
        }, 10);
    }

    handleStop() {
        clearInterval(this.interval);
        this.isCountingDown(false);
    }

    handleReset() {
        this.handleStop();
        this.setState(state => ({
            seconds: 0,
            minutes: state.sessionLength,
        }));
    }

    handleIncreaseTime() {
        this.setState(state => ({
            sessionLength: state.sessionLength + 1,
            minutes: state.sessionLength + 1,
            seconds: 0,
        }));
    }

    handleDecreaseTime() {
        if (this.state.minutes > 1) {
            this.setState(state => ({
                sessionLength: state.sessionLength - 1,
                minutes: state.sessionLength - 1,
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
            <div className={"row timer"}>
                {minutes === 0 && seconds === 0 ? (
                    <Modal
                        onTimerStart={this.handleStart}
                        onTimerReset={this.handleReset}
                    />
                ) : (
                    <div className={"col m4 counter"}>
                        <span>
                            {minutes}
                            {":"}
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                    </div>
                )}
                <div className={"col s2"}>
                    {this.state.isOn ? (
                        <button
                            className={"waves-effect waves-light btn-small red"}
                            onClick={this.handleStop}
                            type={"button"}>
                            {"Stop"}
                            <i className={"material-icons left"}>{"pause"}</i>
                        </button>
                    ) : (
                        <button
                            className={
                                "waves-effect waves-light btn-small green"
                            }
                            onClick={this.handleStart}
                            type={"button"}>
                            {"Start"}
                            <i className={"material-icons left"}>
                                {"play_arrow"}
                            </i>
                        </button>
                    )}
                    <button
                        className={"waves-effect waves-light btn-small blue"}
                        onClick={this.handleReset}
                        type={"button"}>
                        {"Reset"}
                        <i className={"material-icons left"}>{"stop"}</i>
                    </button>
                    <button
                        className={"waves-effect waves-light btn-small"}
                        disabled={this.state.isOn ? "disabled" : ""}
                        onClick={this.handleIncreaseTime}
                        type={"button"}>
                        {"Up"}
                        <i className={"material-icons left"}>
                            {"arrow_upward"}
                        </i>
                    </button>
                    <button
                        className={"waves-effect waves-light btn-small"}
                        disabled={this.state.isOn ? "disabled" : ""}
                        onClick={this.handleDecreaseTime}
                        type={"button"}>
                        {"Down"}
                        <i className={"material-icons left"}>
                            {"arrow_downward"}
                        </i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Timer;
