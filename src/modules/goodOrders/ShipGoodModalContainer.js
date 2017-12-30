import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as goodOrderActions from './goodOrderActions';
import Loading from "../../components/common/Loading";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";
import FormInputText from "../../components/common/FormInputText";

class ShipGoodModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleShipOrder = this.handleShipOrder.bind(this);
        this.checkFreeShip = this.checkFreeShip.bind(this);
        this.sendShipOrder = this.sendShipOrder.bind(this);
    }

    handleShipOrder(e) {
        let order = {...this.props.shippingGood.order};
        const field = e.target.name;
        order[field] = e.target.value;
        this.props.goodOrderActions.handleShipOrder(order);
    }

    checkFreeShip(e) {
        const field = e.target.name;
        let order = {...this.props.shippingGood.order};
        e.target.checked ? (
            order[field] = 1
        ) : (
            order[field] = 0
        );
        this.props.goodOrderActions.handleShipOrder(order);
    }

    sendShipOrder() {
        const order = this.props.shippingGood.order;
        if (
            isEmptyInput(order.address) || isEmptyInput(order.province) ||
            isEmptyInput(order.district) || isEmptyInput(order.name) ||
            isEmptyInput(order.tel) || isEmptyInput(order.pick_money) || isEmptyInput(order.value) ||
            isEmptyInput(order.pick_address) || isEmptyInput(order.pick_province) ||
            isEmptyInput(order.pick_district) || isEmptyInput(order.pick_name) ||
            isEmptyInput(order.pick_tel)
        ) {
            showErrorNotification("Bạn cần nhập đủ tất cả các trường bắt buộc (*)");
        } else {
            this.props.goodOrderActions.sendShipOrder(this.props.shippingGood, this.props.orderId, this.props.labelId);
        }
    }

    render() {
        const {order} = this.props.shippingGood;
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
                            <div className="row">
                                <div className="col-md-6">
                                    <FormInputText
                                        required={true}
                                        label="Địa chỉ khách hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.address}
                                        name="address"/>
                                    <FormInputText
                                        required={true}
                                        label="Tỉnh"
                                        updateFormData={this.handleShipOrder}
                                        value={order.province}
                                        name="province"/>
                                    <FormInputText
                                        required={true}
                                        label="Quận"
                                        updateFormData={this.handleShipOrder}
                                        value={order.district}
                                        name="district"/>
                                    <div className="form-group">
                                        <CheckBoxMaterial
                                            name="is_freeship"
                                            checked={order.is_freeship ? (true) : (false)}
                                            onChange={this.checkFreeShip}
                                            label="Miến phí giao hàng cho khách"/>
                                    </div>
                                    <FormInputText
                                        required={true}
                                        label="Tên khách hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.name}
                                        name="name"/>
                                    <FormInputText
                                        required={true}
                                        label="Số điện thoại khách hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.tel}
                                        name="tel"/>
                                    <FormInputText
                                        required={true}
                                        label="Phí thu hộ"
                                        updateFormData={this.handleShipOrder}
                                        value={order.pick_money}
                                        name="pick_money"/>
                                    <FormInputText
                                        label="Ghi chú"
                                        updateFormData={this.handleShipOrder}
                                        value={order.note}
                                        name="note"/>

                                    <FormInputText
                                        label="Giá trị đơn hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.value}
                                        name="value"/>
                                </div>
                                <div className="col-md-6">
                                    <FormInputText
                                        required={true}
                                        label="Địa chỉ lấy hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.pick_address}
                                        name="pick_address"/>
                                    <FormInputText
                                        required={true}
                                        label="Tỉnh lấy hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.pick_province}
                                        name="pick_province"/>
                                    <FormInputText
                                        required={true}
                                        label="Quận lấy hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.pick_district}
                                        name="pick_district"/>
                                    <FormInputText
                                        required={true}
                                        label="Tên công ty lấy hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.pick_name}
                                        name="pick_name"/>
                                    <FormInputText
                                        required={true}
                                        label="Số điện thoại nơi lấy hàng"
                                        updateFormData={this.handleShipOrder}
                                        value={order.pick_tel}
                                        name="pick_tel"/>
                                </div>
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
                                                    onClick={this.sendShipOrder}>
                                                <i className="material-icons">check</i>
                                                {
                                                    this.props.isUpdate ? "Lưu" : "Xác nhận"
                                                }

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

ShipGoodModalContainer.propTypes = {
    shipGoodModal: PropTypes.bool.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
    shippingGood: PropTypes.object.isRequired,
    isSendingShipOrder: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    orderId: PropTypes.number.isRequired,
    labelId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        shipGoodModal: state.goodOrders.shipGoodModal,
        isUpdate: state.goodOrders.isUpdate,
        shippingGood: state.goodOrders.shippingGood,
        isSendingShipOrder: state.goodOrders.isSendingShipOrder,
        orderId: state.goodOrders.orderId,
        labelId: state.goodOrders.labelId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipGoodModalContainer);