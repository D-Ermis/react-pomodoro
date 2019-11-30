import React from "react";
import ReactModal from "react-modal";
ReactModal.setAppElement("#app");

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseAndRestart = this.handleCloseAndRestart.bind(this);
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
        });
        this.props.onTimerReset();
    }

    handleCloseAndRestart() {
        this.handleCloseModal();
        this.props.onTimerStart();
    }

    render() {
        return (
            <div className={"Modal"}>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel={"Pomodoro Modal"}>
                    <h3>{"Continue working?"}</h3>
                    <button
                        type={"button"}
                        className={"waves-effect waves-light btn-small red"}
                        onClick={this.handleCloseModal}>
                        {"No"}
                    </button>
                    <button
                        type={"button"}
                        className={"waves-effect waves-light btn-small"}
                        onClick={this.handleCloseAndRestart}>
                        {"Yes"}
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default Modal;
