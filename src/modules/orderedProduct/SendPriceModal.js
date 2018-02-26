import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";

class SendPriceModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let attach = {
            ...JSON.parse(this.props.orderSendPriceModal.attach_info),
            [field]: event.target.value
        };
        let order = {
            ...this.props.orderSendPriceModal,
            attach_info: JSON.stringify(attach)
        };
        this.props.orderedProductAction.handleSendPriceModal(order);
    }

    render() {
        let orderSendPriceModal = this.props.orderSendPriceModal;
        let attach = orderSendPriceModal.attach_info ? JSON.parse(orderSendPriceModal.attach_info) : {};
        return (
            <Modal show={this.props.sendPriceModal}
                   onHide={() => this.props.orderedProductAction.showSendPriceModal()}>
                <a onClick={() => this.props.orderedProductAction.showSendPriceModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Lý do hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="label-control">Kích thước</label>
                                <input type="text"
                                       name="size"
                                       placeholder="Nhập kích thước"
                                       className="form-control"
                                       value={attach.size || ''}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="label-control">Link sản phẩm</label>
                                <input type="text"
                                       name="link"
                                       placeholder="Link"
                                       className="form-control"
                                       value={attach.link || ''}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="label-control">Màu</label>
                                <input type="text"
                                       name="color"
                                       placeholder="Màu sắc"
                                       className="form-control"
                                       value={attach.color || ""}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="label-control">Mã hàng Nhật</label>
                                <input type="text"
                                       name="code"
                                       placeholder="Nhập mã"
                                       className="form-control"
                                       value={attach.code || ''}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="label-control">Mô tả</label>
                                <textarea type="text"
                                          name="description"
                                          placeholder="Mô tả đơn hàng"
                                          className="form-control"
                                          value={attach.description || ''}
                                          onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Số lượng</label>
                                <input type="number"
                                       name="quantity"
                                       placeholder="Nhập số lượng"
                                       className="form-control"
                                       value={attach.quantity || 0}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Phần trăm giảm giá</label>
                                <input type="number"
                                       name="sale_off"
                                       placeholder="Nhập phần trăm giảm giá"
                                       className="form-control"
                                       value={attach.sale_off || 0}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Khối lượng</label>
                                <input type="number"
                                       name="weight"
                                       placeholder="Nhập khối lượng"
                                       className="form-control"
                                       value={attach.weight || 0}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Thuế</label>
                                <select
                                    className="form-control"
                                    name="tax"
                                    value={attach.tax || 0}
                                    onChange={this.updateFormData}>
                                    <option value={true}>Có</option>
                                    <option value={false}>Không</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Giá sản phẩm</label>
                                <input type="number"
                                       name="price"
                                       placeholder="Nhập giá sản phẩm"
                                       className="form-control"
                                       value={attach.price || 0}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Đơn vị</label>
                                <input type="text"
                                       name="unit"
                                       placeholder="Nhập đơn vị"
                                       className="form-control"
                                       value={attach.unit || ''}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Tỷ giá</label>
                                <input type="number"
                                       name="ratio"
                                       placeholder="Nhập tỷ giá"
                                       className="form-control"
                                       value={attach.ratio || 1}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Đổi ra tiền Việt</label>
                                <input type="number"
                                       name="money"
                                       className="form-control"
                                       value={attach.money || 0}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="label-control">Phí ship</label>
                                <input type="number"
                                       name="fee"
                                       placeholder="Nhập kích thước"
                                       className="form-control"
                                       value={attach.fee || 0}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() =>
                                    this.props.orderedProductAction.changeStatus(
                                        "sent_price",
                                        orderSendPriceModal.id,
                                        null,
                                        orderSendPriceModal.attach_info
                                    )}>
                            <i className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.showSendPriceModal()}>
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

SendPriceModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    sendPriceModal: PropTypes.bool,
    orderSendPriceModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        sendPriceModal: state.orderedProduct.sendPriceModal,
        orderSendPriceModal: state.orderedProduct.orderSendPriceModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPriceModal);
