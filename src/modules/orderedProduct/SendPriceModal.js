import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";

class SendPriceModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
    }

    updateFormData(index) {
        return (e) => {
            let field = e.target.name;
            let orders = [...this.props.orderSendPriceModal];
            let attach = {
                ...JSON.parse(orders[index].attach_info),
                [field]: e.target.value
            };
            orders[index] = {
                ...orders[index],
                attach_info: JSON.stringify(attach)
            };
            this.props.orderedProductAction.handleSendPriceModal(orders);
        };
    }

    render() {
        let orderSendPriceModal = this.props.orderSendPriceModal;
        return (
            <Modal show={this.props.sendPriceModal}
                   onHide={() => this.props.orderedProductAction.showSendPriceModal()}>
                <a onClick={() => this.props.orderedProductAction.showSendPriceModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Báo Giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        orderSendPriceModal && orderSendPriceModal.map((order, index) => {
                            let attach = JSON.parse(order.attach_info);
                            return (
                                <div key={index}>
                                    <div style={{marginBottom: "10px"}}>
                                        <span className="label label-success">Đơn hàng {order.code}</span>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">Kích thước</label>
                                                <input type="text"
                                                       name="size"
                                                       placeholder="Nhập kích thước"
                                                       className="form-control"
                                                       value={attach.size || ''}
                                                       onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">Link sản phẩm</label>
                                                <input type="text"
                                                       name="link"
                                                       placeholder="Link"
                                                       className="form-control"
                                                       value={attach.link || ''}
                                                       onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">Màu</label>
                                                <input type="text"
                                                       name="color"
                                                       placeholder="Màu sắc"
                                                       className="form-control"
                                                       value={attach.color || ""}
                                                       onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">Thuế</label>
                                                <select
                                                    className="form-control"
                                                    name="tax"
                                                    value={attach.tax || 0}
                                                    onChange={this.updateFormData(index)}>
                                                    <option value={true}>Có</option>
                                                    <option value={false}>Không</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                            <div className="form-group">
                                                <label className="label-control">Số lượng</label>
                                                <input type="number"
                                                       name="quantity"
                                                       placeholder="Nhập số lượng"
                                                       className="form-control"
                                                       value={attach.quantity || 0}
                                                       onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                            <div className="form-group">
                                                <label className="label-control">Giá sản phẩm</label>
                                                <input type="number"
                                                       name="price"
                                                       placeholder="Nhập giá sản phẩm"
                                                       className="form-control"
                                                       value={attach.price || 0}
                                                       onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                            <div className="form-group">
                                                <label className="label-control">Đơn vị</label>
                                                <input type="text"
                                                       name="unit"
                                                       placeholder="Nhập đơn vị"
                                                       className="form-control"
                                                       value={attach.unit || ''}
                                                       onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <label className="label-control">Mô tả</label>
                                                <textarea type="text"
                                                          name="description"
                                                          placeholder="Mô tả đơn hàng"
                                                          className="form-control"
                                                          value={attach.description || ''}
                                                          onChange={this.updateFormData(index)}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {
                        this.props.isSendingPrice ? (
                            <Loading/>
                        ) : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.sendPrice(orderSendPriceModal)}>
                                    <i className="material-icons">check</i> Xác nhận
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.orderedProductAction.showSendPriceModal()}>
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

SendPriceModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    sendPriceModal: PropTypes.bool,
    isSendingPrice: PropTypes.bool,
    orderSendPriceModal: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        sendPriceModal: state.orderedProduct.sendPriceModal,
        orderSendPriceModal: state.orderedProduct.orderSendPriceModal,
        isSendingPrice: state.orderedProduct.isSendingPrice
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPriceModal);
