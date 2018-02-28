import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
// import Loading from "../../../components/common/Loading";

class ChooseSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        console.log(this.props.baseId);
    }

    handleClose() {
        this.props.chooseSeatActions.toggleShowChooseSeatModal(false);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn chỗ ngồi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-content">
                        <ul className="nav nav-pills nav-pills-rose">
                            <li className="active">
                                <a
                                    href="#pill1"
                                    data-toggle="tab"
                                    aria-expanded="true"
                                >
                                    Profile
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" style={{ marginTop: 20 }}>
                            <div className="tab-pane active" id="pill1">
                                Collaboratively administrate empowered markets
                                via plug-and-play networks. Dynamically
                                procrastinate B2C users after installed base
                                benefits.
                                <br />
                                <br /> Dramatically visualize customer directed
                                convergence without revolutionary ROI.
                                Collaboratively administrate empowered markets
                                via plug-and-play networks. Dynamically
                                procrastinate B2C users after installed base
                                benefits.
                                <br />
                                <br /> This is very nice.
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ChooseSeatModalContainer.propTypes = {
    chooseSeatActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    baseId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        from: state.chooseSeat.from,
        to: state.chooseSeat.to,
        showModal: state.chooseSeat.showModal,
        baseId: state.chooseSeat.baseId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSeatActions: bindActionCreators(chooseSeatActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ChooseSeatModalContainer,
);
