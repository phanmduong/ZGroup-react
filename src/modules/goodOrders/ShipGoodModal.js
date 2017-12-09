import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as goodOrderActions from './goodOrderActions';
import Loading from "../../components/common/Loading";

class ShipGoodModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleShipOrder = this.handleShipOrder.bind(this);
    }

    handleShipOrder(e) {
        console.log("e", e);
        let order = {...this.props.shippingGood.order};
        const field = e.target.name;
        order[field] = e.target.value;
        this.props.goodOrderActions.handleShipOrder(order);
    }

    render() {
        const order = this.props.shippingGood.order;
        console.log("order", this.props.shippingGood);
        return (
            <Modal show={this.props.shipGoodModal}
                   onHide={() => this.props.goodOrderActions.showShipGoodModal()}>
                <a onClick={() => this.props.goodOrderActions.showShipGoodModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thông tin đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="control-label">Tên khách hàng</label>
                                <input type="text"
                                       name="name"
                                       className="form-control"
                                       value={order.name}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Số điện thoại khách hàng</label>
                                <input type="text"
                                       name="tel"
                                       className="form-control"
                                       value={order.tel}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Địa chỉ khách hàng</label>
                                <input type="text"
                                       name="address"
                                       className="form-control"
                                       value={order.address}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Tỉnh</label>
                                <input type="text"
                                       name="province"
                                       className="form-control"
                                       value={order.province}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Quận</label>
                                <input type="text"
                                       name="district"
                                       className="form-control"
                                       value={order.district}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Ngày giao hàng</label>
                                <input type="text"
                                       name="pick_date"
                                       className="form-control"
                                       value={order.pick_date}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Phí giao hàng</label>
                                <input type="text"
                                       name="pick_money"
                                       className="form-control"
                                       value={order.pick_money}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Ghi chú</label>
                                <input type="text"
                                       name="note"
                                       className="form-control"
                                       value={order.note}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Giá trị đơn hàng</label>
                                <input type="text"
                                       name="value"
                                       className="form-control"
                                       value={order.value}
                                       onChange={this.handleShipOrder}/>
                                <span className="material-input"/>
                            </div>
                            <br/>
                            <div>
                                {
                                    this.props.isSendingShipOrder ? (
                                        <Loading/>
                                    ) : (
                                        <div>
                                            <button rel="tooltip" data-placement="top" title=""
                                                    data-original-title="Remove item" type="button"
                                                    className="btn btn-success btn-round" data-dismiss="modal"
                                                    onClick={() => this.props.goodOrderActions.sendShipOrder(this.props.shippingGood)}>
                                                <i className="material-icons">check</i> Xác nhận
                                            </button>
                                            <button rel="tooltip" data-placement="top" title=""
                                                    data-original-title="Remove item" type="button"
                                                    className="btn btn-danger btn-round" data-dismiss="modal"
                                                    onClick={() => this.props.goodOrderActions.showShipGoodModal()}>
                                                <i className="material-icons">close</i> Huỷ
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ShipGoodModal.propTypes = {
    shipGoodModal: PropTypes.bool.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
    shippingGood: PropTypes.object.isRequired,
    isSendingShipOrder: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        shipGoodModal: state.goodOrders.shipGoodModal,
        shippingGood: state.goodOrders.shippingGood,
        isSendingShipOrder: state.goodOrders.isSendingShipOrder
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipGoodModal);