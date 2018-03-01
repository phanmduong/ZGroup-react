import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';

class ChooseWalletModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let delivery = this.props.orderWalletChosen;
        let sum = delivery.paid_history.reduce((sum, history) => sum + history.money, 0);
        return (
            <Modal show={this.props.chooseWalletModal}
                   onHide={() => this.props.orderedProductAction.showChooseWalletModal()}>
                <a onClick={() => this.props.orderedProductAction.showChooseWalletModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Chọn ví</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr className="text-rose">
                                <th>STT</th>
                                <th>Ngày thanh toán</th>
                                <th>Số tiền thanh toán</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                delivery.paid_history && delivery.paid_history.map((history, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{history.created_at}</td>
                                            <td>
                                                {helper.dotNumber(history.money)}đ
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            <tr>
                                <td><b>Tổng</b></td>
                                <td/>
                                <td>
                                    {helper.dotNumber(sum)}đ
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    {
                        this.props.isChoosingWallet ? <Loading/> : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.chooseWallet(delivery, 0)}
                                        disabled={!(delivery.debt)}>
                                    <i className="material-icons">check</i> Ví lưu động
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.chooseWallet(delivery, 1)}
                                        disabled={!(delivery.debt)}>
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
