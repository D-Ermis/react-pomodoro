import React from "react";
import ReactModal from "react-modal";

const customStyles = {
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        bottom: "auto",
        right: "auto",
        padding: "3rem",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#eee",
    },
};
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
            <div className={"modal"}>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel={"Pomodoro Modal"}
                    style={customStyles}>
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
