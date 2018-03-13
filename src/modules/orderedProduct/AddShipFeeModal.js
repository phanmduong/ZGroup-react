import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";

class AddShipFeeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleShipFee = this.handleShipFee.bind(this);
    }

    handleShipFee(e) {
        let attach_info = {
            ...JSON.parse(this.props.orderAddShipFee.attach_info),
            shipCode: e.target.value
        };
        let order = {
            ...this.props.orderAddShipFee,
            attach_info: JSON.stringify(attach_info)
        };
        this.props.orderedProductAction.handleAddShipFeeModal(order);
    }

    render() {
        let order = this.props.orderAddShipFee;
        return (
            <Modal show={this.props.addShipFeeModal}
                   onHide={() => this.props.orderedProductAction.showAddShipFeeModal()}>
                <a onClick={() => this.props.orderedProductAction.showAddShipFeeModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Bổ sung thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="label-control">Mã giao hàng</label>
                            <input type="text"
                                   name="shipCode"
                                   placeholder="Nhập mã"
                                   className="form-control"
                                   value={order.attach_info ? JSON.parse(order.attach_info).shipCode : ''}
                                   onChange={this.handleShipFee}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.changeStatus(
                                    "ship", order.id, null, order.attach_info
                                )}>
                            <i className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.showAddShipFeeModal()}>
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddShipFeeModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    addShipFeeModal: PropTypes.bool,
    orderAddShipFee: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        addShipFeeModal: state.orderedProduct.addShipFeeModal,
        orderAddShipFee: state.orderedProduct.orderAddShipFee,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShipFeeModal);
