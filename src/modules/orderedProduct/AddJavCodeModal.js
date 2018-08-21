import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";

class AddJavCodeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleJavCode = this.handleJavCode.bind(this);
    }

    handleJavCode(e) {
        let orders = this.props.orderJavCode.map(order => {
            let attach_info = {
                ...JSON.parse(order.attach_info),
                code: e.target.value
            };
            return {
                ...order,
                attach_info: JSON.stringify(attach_info)
            };
        });
        this.props.orderedProductAction.handleAddJavCodeModal(orders);
    }

    render() {
        let order = this.props.orderJavCode[0];
        return (
            <Modal show={this.props.addJavCodeModal}
                   onHide={() => this.props.orderedProductAction.showAddJavCodeModal()}>
                <a onClick={() => this.props.orderedProductAction.showAddJavCodeModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Bổ sung thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="label-control">Mã hàng Nhật</label>
                            <input type="text"
                                   name="code"
                                   placeholder="Nhập mã"
                                   className="form-control"
                                   value={order.attach_info ? JSON.parse(order.attach_info).code : ''}
                                   onChange={this.handleJavCode}/>
                            <span className="material-input"/>
                        </div>
                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.changeStatus(
                                    "ordered", this.props.orderJavCode, null
                                )}>
                            <i className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.showAddJavCodeModal()}>
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddJavCodeModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    addJavCodeModal: PropTypes.bool,
    orderJavCode: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        addJavCodeModal: state.orderedProduct.addJavCodeModal,
        orderJavCode: state.orderedProduct.orderJavCode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJavCodeModal);
