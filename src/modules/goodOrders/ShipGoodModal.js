import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as goodOrderActions from './goodOrderActions';
import Loading from "../../components/common/Loading";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";
import FormInputDate from "../../components/common/FormInputDate";

class ShipGoodModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleShipOrder = this.handleShipOrder.bind(this);
        this.checkFreeShip = this.checkFreeShip.bind(this);
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

    render() {
        const order = this.props.shippingGood.order;
        console.log("shippingGood", this.props.shippingGood);
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
                                    <div className="form-group">
                                        <FormInputDate
                                            label="Ngày đặt đơn giao hàng"
                                            name="pick_date"
                                            updateFormData={this.handleShipOrder}
                                            id="pick_date"
                                            value={order.pick_date}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Địa chỉ khách hàng</label>
                                        <input type="text"
                                               name="address"
                                               className="form-control"
                                               value={order.address}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Tỉnh</label>
                                        <input type="text"
                                               name="province"
                                               className="form-control"
                                               value={order.province}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Quận</label>
                                        <input type="text"
                                               name="district"
                                               className="form-control"
                                               value={order.district}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>

                                    <div className="form-group">
                                        <CheckBoxMaterial
                                            name="is_freeship"
                                            checked={order.is_freeship ? (true) : (false)}
                                            onChange={this.checkFreeShip}
                                            label="Miến phí giao hàng cho khách"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Tên khách hàng</label>
                                        <input type="text"
                                               name="name"
                                               className="form-control"
                                               value={order.name}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Số điện thoại khách hàng</label>
                                        <input type="text"
                                               name="tel"
                                               className="form-control"
                                               value={order.tel}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Phí giao hàng</label>
                                        <input type="text"
                                               name="pick_money"
                                               className="form-control"
                                               value={order.pick_money}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Ghi chú</label>
                                        <input type="text"
                                               name="note"
                                               className="form-control"
                                               value={order.note}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Giá trị đơn hàng</label>
                                        <input type="text"
                                               name="value"
                                               className="form-control"
                                               value={order.value}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <label className="label-control">Địa chỉ lấy hàng</label>
                                        <input type="text"
                                               name="pick_address"
                                               className="form-control"
                                               value={order.pick_address}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Tỉnh lấy hàng</label>
                                        <input type="text"
                                               name="pick_province"
                                               className="form-control"
                                               value={order.pick_province}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control">Quận lấy hàng</label>
                                        <input type="text"
                                               name="pick_district"
                                               className="form-control"
                                               value={order.pick_district}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-control">Tên công ty lấy hàng</label>
                                        <input type="text"
                                               name="pick_name"
                                               className="form-control"
                                               value={order.pick_name}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>


                                    <div className="form-group">
                                        <label className="label-control">Số điện thoại nơi lấy hàng</label>
                                        <input type="text"
                                               name="pick_tel"
                                               className="form-control"
                                               value={order.pick_tel}
                                               onChange={this.handleShipOrder}/>
                                        <span className="material-input"/>
                                    </div>
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