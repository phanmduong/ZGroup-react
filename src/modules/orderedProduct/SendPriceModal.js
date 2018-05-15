import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import Select from 'react-select';

class SendPriceModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeUnitRatio = this.changeUnitRatio.bind(this);
    }

    componentWillMount() {
        this.props.orderedProductAction.loadAllCurrencies();
    }

    updateFormData(index) {
        return (e) => {
            let field = e.target.name;
            let orders = [...this.props.orderSendPriceModal];
            let attach = {
                ...JSON.parse(orders[index].attach_info),
                [field]: e.target.value
            };
            if (attach.price && attach.sale_off && attach.quantity && attach.currency_id) {
                const ratio = this.props.currencies.filter(currency => currency.id === attach.currency_id)[0].ratio;
                let tax = attach.tax === "true" ? 1.08 : 1;
                attach = {
                    ...attach,
                    money: attach.price * (100 - attach.sale_off) / 100 * attach.quantity * ratio * tax
                };
            } else {
                attach = {
                    ...attach,
                    money: 0
                };
            }
            orders[index] = {
                ...orders[index],
                attach_info: JSON.stringify(attach)
            };
            this.props.orderedProductAction.handleSendPriceModal(orders);
        };
    }

    changeUnitRatio(index) {
        return (value) => {
            let orders = [...this.props.orderSendPriceModal];
            let attach = {
                ...JSON.parse(orders[index].attach_info),
                currency_id: value ? value.value : ''
            };
            if (attach.price && attach.sale_off && attach.quantity && attach.currency_id) {
                let tax = attach.tax === "true" ? 1.08 : 1;
                attach = {
                    ...attach,
                    money: attach.price * (100 - attach.sale_off) / 100 * attach.quantity * value.ratio * tax
                };
            } else {
                attach = {
                    ...attach,
                    money: 0
                };
            }
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <label className="label-control">Đơn vị</label>
                                            <Select
                                                value={attach.currency_id || ''}
                                                options={this.props.currencies.map((currency) => {
                                                    return {
                                                        ...currency,
                                                        value: currency.id,
                                                        label: currency.name
                                                    };
                                                })}
                                                onChange={this.changeUnitRatio(index)}
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <div className="form-group">
                                                <label className="label-control">Phần trăm giảm giá</label>
                                                <input type="number"
                                                       name="sale_off"
                                                       max="100"
                                                       min="0"
                                                       placeholder="Nhập phần trăm giảm giá"
                                                       className="form-control"
                                                       value={attach.sale_off || 0}
                                                       onChange={this.updateFormData}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <div className="form-group">
                                                <label className="label-control">Đổi ra tiền Việt</label>
                                                <input type="number"
                                                       name="money"
                                                       className="form-control"
                                                       value={attach.money || 0}
                                                       disabled={true}/>
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
    currencies: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        sendPriceModal: state.orderedProduct.sendPriceModal,
        orderSendPriceModal: state.orderedProduct.orderSendPriceModal,
        isSendingPrice: state.orderedProduct.isSendingPrice,
        currencies: state.orderedProduct.currencies
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPriceModal);
