import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputDate from "../../components/common/FormInputDate";
import *as orderedDetailAction from "./orderedDetailAction";
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';

class OrderedDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.orderId = this.props.params.orderId;
        this.state = {
            type: "create",
            link: `/order/detail`
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.handleCustomer = this.handleCustomer.bind(this);
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.props.orderedDetailAction.loadOrder(this.props.params.orderId);
            this.setState({
                type: this.props.params.type,
                link: `/order/${this.productId}/edit`
            });
        } else {
            this.props.orderedDetailAction.handleOrder({
                size: '',
                link: '',
                color: '',
                description: '',
                quantity: 0,
                sale_off: 0,
                weight: 0,
                tax: true,
                price: 0,
                unit: '',
                ratio: 1,
                money: 0,
                fee: 0,
                code: '',
                endTime: ''
            });
            this.props.orderedDetailAction.handleCustomer({
                name: '',
                phone: '',
                email: '',
                note: ''
            });
        }
    }

    updateFormData(e) {
        const field = e.target.name;
        let order = {
            ...this.props.order,
            [field]: e.target.value
        };
        this.props.orderedDetailAction.handleOrder(order);
    }

    handleCustomer(e) {
        const field = e.target.name;
        let customer = {
            ...this.props.customer,
            [field]: e.target.value
        };
        this.props.orderedDetailAction.handleCustomer(customer);
    }

    saveOrder() {
        const order = {...this.props.order};
        const customer = {...this.props.customer};
        if (
            helper.isEmptyInput(customer.phone)
            || helper.isEmptyInput(customer.email)
            || helper.isEmptyInput(order.link)
            || helper.isEmptyInput(order.quantity)
            || helper.isEmptyInput(customer.name)
        ) {
            if (helper.isEmptyInput(order.link)) helper.showErrorNotification("Bạn cần nhập Link sản phẩm");
            if (helper.isEmptyInput(order.quantity)) helper.showErrorNotification("Bạn cần nhập Số lượng sản phẩm");
            if (helper.isEmptyInput(customer.name)) helper.showErrorNotification("Bạn cần nhập Tên khách hàng");
            if (helper.isEmptyInput(customer.phone)) helper.showErrorNotification("Bạn cần nhập Số điện thoại khách hàng");
            if (helper.isEmptyInput(customer.email)) helper.showErrorNotification("Bạn cần nhập Email khách hàng");
        } else {
            if (this.state.type === "create") this.props.orderedDetailAction.saveOrder(order, customer);
            else this.props.orderedDetailAction.editOrder(order, customer);
        }
    }

    render() {
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
                        {
                            this.props.isLoading ? (
                                <Loading/>
                            ) : (
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
                                                       value={order.size || ''}
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
                                                       value={order.link || ''}
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
                                                       value={order.color || ""}
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
                                                          value={order.description || ''}
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
                                                       value={customer.quantity || 0}
                                                       onChange={this.handleCustomer}/>
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
                                                       value={order.sale_off || 0}
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
                                                       value={order.weight || 0}
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
                                                    value={order.tax || 0}
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
                                                       value={customer.price || 0}
                                                       onChange={this.handleCustomer}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label className="label-control">Đơn vị</label>
                                                <input type="text"
                                                       name="unit"
                                                       placeholder="Nhập đơn vị"
                                                       className="form-control"
                                                       value={order.unit || ''}
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
                                                       value={order.ratio || 1}
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
                                                       value={order.money || 0}
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
                                                       value={order.fee || 0}
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
                                                       value={order.code || ''}
                                                       onChange={this.updateFormData}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <FormInputDate
                                                label="Ngày về"
                                                name="endTime"
                                                updateFormData={(e) => this.props.orderedDetailAction.handleDate(e.target.value)}
                                                id="form-end-time"
                                                value={order.endTime || ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon"
                             data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        {
                            this.props.isLoading ? (
                                <Loading/>
                            ) : (
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
                                                       value={customer.name || ''}
                                                       onChange={this.handleCustomer}/>
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
                                                       value={customer.email || ''}
                                                       onChange={this.handleCustomer}/>
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
                                                       value={customer.phone || ''}
                                                       onChange={this.handleCustomer}/>
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
                                                          value={customer.note || ''}
                                                          onChange={this.handleCustomer}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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

OrderedDetailContainer.contextTypes = {
    router: PropTypes.object,
};

OrderedDetailContainer.propTypes = {
    children: PropTypes.element,
    pathname: PropTypes.string,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    orderedDetailAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        order: state.orderedDetail.order,
        customer: state.orderedDetail.customer,
        isLoading: state.orderedDetail.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedDetailAction: bindActionCreators(orderedDetailAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedDetailContainer);