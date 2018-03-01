import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";

class ChooseWalletModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.chooseWalletModal}
                   onHide={() => this.props.orderedProductAction.showChooseWalletModal()}>
                <a onClick={() => this.props.orderedProductAction.showChooseWalletModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Chọn ví</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isChoosingWallet ? <Loading/> : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.chooseWallet(this.props.orderWalletChosen, 0)}>
                                    <i className="material-icons">check</i> Ví lưu động
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.chooseWallet(this.props.orderWalletChosen, 1)}>
                                    <i className="material-icons">close</i> Ví cọc
                                </button>
                            </div>
                        )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

ChooseWalletModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    chooseWalletModal: PropTypes.bool,
    orderWalletChosen: PropTypes.object.isRequired,
    isChoosingWallet: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        chooseWalletModal: state.orderedProduct.chooseWalletModal,
        orderWalletChosen: state.orderedProduct.orderWalletChosen,
        isChoosingWallet: state.orderedProduct.isChoosingWallet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWalletModal);
