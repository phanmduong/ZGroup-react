import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputDate from "../../components/common/FormInputDate";
import *as orderedDetailAction from "./orderedDetailAction";

class OrderedDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
    }

    updateFormData(e) {
        const field = e.target.name;
        let order = {...this.props.order};
        order[field] = e.target.value;
        this.props.orderedDetailAction.handleOrder(order);
    }

    render() {
        console.log("order", this.props.order);
        let order = this.props.order;
        let customer = this.props.customer;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon"
                             data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Chi tiết đơn hàng</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Kích thước</label>
                                        <input type="text"
                                               name="size"
                                               placeholder="Nhập kích thước"
                                               className="form-control"
                                               value={order.size}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Link sản phẩm</label>
                                        <input type="text"
                                               name="link"
                                               placeholder="Link"
                                               className="form-control"
                                               value={order.link}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Màu</label>
                                        <input type="text"
                                               name="color"
                                               placeholder="Màu sắc"
                                               className="form-control"
                                               value={order.color}
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
                                                  value={order.description}
                                                  onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Số lượng</label>
                                        <input type="number"
                                               name="quantity"
                                               placeholder="Nhập số lượng"
                                               className="form-control"
                                               value={order.quantity}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Phần trăm giảm giá</label>
                                        <input type="number"
                                               name="sale_off"
                                               placeholder="Nhập phần trăm giảm giá"
                                               className="form-control"
                                               value={order.sale_off}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Khối lượng</label>
                                        <input type="number"
                                               name="weight"
                                               placeholder="Nhập khối lượng"
                                               className="form-control"
                                               value={order.weight}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Thuế</label>
                                        <select
                                            className="form-control"
                                            name="tax"
                                            value={order.tax}
                                            onChange={this.updateFormData}>
                                            <option value={true}>Có</option>
                                            <option value={false}>Không</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Giá sản phẩm</label>
                                        <input type="number"
                                               name="price"
                                               placeholder="Nhập giá sản phẩm"
                                               className="form-control"
                                               value={order.price}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Đơn vị</label>
                                        <input type="text"
                                               name="unit"
                                               placeholder="Nhập khối lượng"
                                               className="form-control"
                                               value={order.unit}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Tỷ giá</label>
                                        <input type="number"
                                               name="ratio"
                                               placeholder="Nhập tỷ giá"
                                               className="form-control"
                                               value={order.ratio}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="label-control">Đổi ra tiền Việt</label>
                                        <input type="number"
                                               name="money"
                                               className="form-control"
                                               value={order.money}
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
                                               value={order.fee}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Mã hàng Nhật</label>
                                        <input type="text"
                                               name="code"
                                               placeholder="Nhập mã"
                                               className="form-control"
                                               value={order.code}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <FormInputDate
                                        label="Ngày về"
                                        name="endTime"
                                        updateFormData={this.updateFormData}
                                        id="form-end-time"
                                        value={order.endTime}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon"
                             data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Thông tin khách hàng</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Tên khách hàng</label>
                                        <input type="text"
                                               name="name"
                                               placeholder="Nhập tên"
                                               className="form-control"
                                               value={customer.name}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Email khách hàng</label>
                                        <input type="text"
                                               name="email"
                                               placeholder="Nhập email"
                                               className="form-control"
                                               value={customer.email}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="label-control">Số điện thoại khách hàng</label>
                                        <input type="text"
                                               name="phone"
                                               placeholder="Nhập số điện thoại"
                                               className="form-control"
                                               value={customer.phone}
                                               onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="label-control">Ghi chú</label>
                                        <textarea type="text"
                                                  name="note"
                                                  placeholder="Ghi chú đơn hàng"
                                                  className="form-control"
                                                  value={customer.note}
                                                  onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={this.saveOrder}
                        className="btn btn-rose">Lưu đơn hàng
                    </button>
                </div>
            </div>
        );
    }
}

OrderedDetailContainer.propTypes = {
    order: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    orderedDetailAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        order: state.orderedDetail.order,
        customer: state.orderedDetail.customer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedDetailAction: bindActionCreators(orderedDetailAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedDetailContainer);