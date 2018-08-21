import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as goodOrderActions from "./goodOrderActions";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";

//import {dotNumber} from "../../helpers/helper";

class PayOrderMoneyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            money: '',
            note: ''
        };
        //this.handleWallet = this.handleWallet.bind(this);
    }

    // handleWallet(e) {
    //     let delivery = {
    //         ...this.props.orderWalletChosen,
    //         money: e.target.value
    //     };
    //     this.props.orderedProductAction.handleChooseWalletModal(delivery);
    // }

    render() {
        return (
            <Modal show={this.props.payOrderMoneyModal}
                   onHide={() => this.props.goodOrderActions.showPayOrderMoneyModal()}>
                <a onClick={() => this.props.goodOrderActions.showPayOrderMoneyModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Thanh toán đơn hàng sẵn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="label-control">Số tiền thanh toán</label>
                        <input type="number"
                               name="money"
                               className="form-control"
                               placeholder="Nhập số tiền thanh toán"
                               value={this.state.money}
                               onChange={(e) => this.setState({
                                   money: e.target.value
                               })}/>
                        <span className="material-input"/>
                    </div>
                    <div className="form-group">
                        <label className="label-control">Ghi chú</label>
                        <input type="text"
                               name="note"
                               className="form-control"
                               placeholder="Nhập ghi chú"
                               value={this.state.note}
                               onChange={(e) => this.setState({
                                   note: e.target.value
                               })}/>
                        <span className="material-input"/>
                    </div>
                    {
                        this.props.isPayingOrderMoney ? <Loading/> : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.goodOrderActions.payOrderMoney(this.props.orderPayMoney, this.state)}
                                >
                                    <i className="material-icons">check</i> Xác nhận
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.goodOrderActions.showPayOrderMoneyModal()}>
                                    <i className="material-icons">close</i> Huỷ
                                </button>
                            </div>
                        )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

PayOrderMoneyModal.propTypes = {
    goodOrderActions: PropTypes.object.isRequired,
    payOrderMoneyModal: PropTypes.bool,
    orderPayMoney: PropTypes.object.isRequired,
    isPayingOrderMoney: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        payOrderMoneyModal: state.goodOrders.payOrderMoneyModal,
        orderPayMoney: state.goodOrders.orderPayMoney,
        isPayingOrderMoney: state.goodOrders.isPayingOrderMoney
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PayOrderMoneyModal);
