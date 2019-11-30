import React from "react";
import ReactModal from "react-modal";
ReactModal.setAppElement("#app");

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOn: false,
            seconds: 0,
            minutes: 1,
            sessionLength: 25,
            showModal: true,
        };

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleIncreaseTime = this.handleIncreaseTime.bind(this);
        this.handleDecreaseTime = this.handleDecreaseTime.bind(this);

        // Modal bindings
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseAndRestart = this.handleCloseAndRestart.bind(this);
    }

    // MODAL SECTION START
    handleOpenModal() {
        this.setState({
            showModal: true,
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
        });
        this.handleReset();
    }

    handleCloseAndRestart() {
        this.handleCloseModal();
        this.handleStart();
    }
    // MODAL SECTION END

    // TIMER SECTION START
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
                    this.handleOpenModal();
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
            <div>
                {this.state.isOn ? (
                    <button
                        className={
                            "btn-floating btn-large waves-effect waves-light red"
                        }
                        onClick={this.handleStop}
                        type={"button"}>
                        {"Stop"}
                    </button>
                ) : (
                    <button
                        className={
                            "btn-floating btn-large waves-effect waves-light green"
                        }
                        onClick={this.handleStart}
                        type={"button"}>
                        {"Start"}
                    </button>
                )}
                <button
                    className={
                        "btn-floating btn-large waves-effect waves-light blue"
                    }
                    onClick={this.handleReset}
                    type={"button"}>
                    {"Reset"}
                </button>
                <button
                    className={"waves-effect waves-light btn-small"}
                    disabled={this.state.isOn ? "disabled" : ""}
                    onClick={this.handleIncreaseTime}
                    type={"button"}>
                    <i className={"material-icons"}>{"arrow_upward"}</i>
                </button>
                <button
                    className={"waves-effect waves-light btn-small"}
                    disabled={this.state.isOn ? "disabled" : ""}
                    onClick={this.handleDecreaseTime}
                    type={"button"}>
                    <i className={"material-icons"}>{"arrow_downward"}</i>
                </button>

                {minutes === 0 && seconds === 0 ? (
                    <div className={"Modal"}>
                        <ReactModal
                            isOpen={this.state.showModal}
                            contentLabel={"Minimal Modal Example"}>
                            <p>
                                {
                                    "Would you like to continue your working session?"
                                }
                            </p>
                            <button
                                type={"button"}
                                className={
                                    "waves-effect waves-light btn-small red"
                                }
                                onClick={this.handleCloseModal}>
                                {"No, I need a break"}
                            </button>
                            <button
                                type={"button"}
                                className={"waves-effect waves-light btn-small"}
                                onClick={this.handleCloseAndRestart}>
                                {"Yeah, keep going"}
                            </button>
                        </ReactModal>
                    </div>
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
