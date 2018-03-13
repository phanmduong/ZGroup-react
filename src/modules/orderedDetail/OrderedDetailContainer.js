import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputDate from "../../components/common/FormInputDate";
import *as orderedDetailAction from "./orderedDetailAction";
import Loading from "../../components/common/Loading";
import Select from 'react-select';
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";

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
        this.changeUnitRatio = this.changeUnitRatio.bind(this);
    }

    componentWillMount() {
        this.props.orderedDetailAction.loadAllCurrencies();
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
                tax: "true",
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
        if (order.price && order.sale_off && order.quantity && order.currency_id) {
            const ratio = this.props.currencies.filter(currency => currency.id === order.currency_id)[0].ratio;
            let tax = order.tax === "true" ? 1.08 : 1;
            order = {
                ...order,
                money: order.price * (100 - order.sale_off) / 100 * order.quantity * ratio * tax
            };
        } else {
            order = {
                ...order,
                money: 0
            };
        }
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
            isEmptyInput(customer.phone)
            || isEmptyInput(customer.email)
            || isEmptyInput(order.link)
            || isEmptyInput(order.quantity)
            || isEmptyInput(customer.name)
        ) {
            if (isEmptyInput(order.link)) showErrorNotification("Bạn cần nhập Link sản phẩm");
            if (isEmptyInput(order.quantity)) showErrorNotification("Bạn cần nhập Số lượng sản phẩm");
            if (isEmptyInput(customer.name)) showErrorNotification("Bạn cần nhập Tên khách hàng");
            if (isEmptyInput(customer.phone)) showErrorNotification("Bạn cần nhập Số điện thoại khách hàng");
            if (isEmptyInput(customer.email)) showErrorNotification("Bạn cần nhập Email khách hàng");
        } else {
            if (this.state.type === "create") this.props.orderedDetailAction.saveOrder(order, customer);
            else this.props.orderedDetailAction.editOrder(order, customer);
        }
    }

    changeUnitRatio(value) {
        let order = {
            ...this.props.order,
            currency_id: value ? value.value : ''
        };
        if (order.price && order.sale_off && order.quantity && order.currency_id) {
            let tax = order.tax === "true" ? 1.08 : 1;
            order = {
                ...order,
                money: order.price * (100 - order.sale_off) / 100 * order.quantity * value.ratio * tax
            };
        } else {
            order = {
                ...order,
                money: 0
            };
        }
        this.props.orderedDetailAction.handleOrder(order);
    }

    render() {
        let order = this.props.order;
        let customer = this.props.customer;
        return (
            <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">Số lượng</label>
                                                <input type="number"
                                                       name="quantity"
                                                       placeholder="Nhập số lượng"
                                                       className="form-control"
                                                       value={order.quantity || 0}
                                                       onChange={this.updateFormData}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">% giảm giá</label>
                                                <input type="number"
                                                       name="sale_off"
                                                       max="100"
                                                       min="0"
                                                       placeholder="Nhập phần trăm giảm giá"
                                                       className="form-control"
                                                       value={order.sale_off || 0}
                                                       onChange={this.updateFormData}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
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
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <div className="form-group">
                                                <label className="label-control">Giá sản phẩm</label>
                                                <input type="number"
                                                       name="price"
                                                       placeholder="Nhập giá sản phẩm"
                                                       className="form-control"
                                                       value={order.price || 0}
                                                       onChange={this.updateFormData}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <label className="label-control">Đơn vị</label>
                                            <Select
                                                value={order.currency_id || ''}
                                                options={this.props.currencies.map((currency) => {
                                                    return {
                                                        ...currency,
                                                        value: currency.id,
                                                        label: currency.name
                                                    };
                                                })}
                                                onChange={this.changeUnitRatio}
                                            />
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <label className="label-control">Tỷ giá</label>
                                            <Select
                                                value={order.currency_id || ''}
                                                options={this.props.currencies.map((currency) => {
                                                    return {
                                                        ...currency,
                                                        value: currency.id,
                                                        label: currency.ratio
                                                    };
                                                })}
                                                onChange={this.changeUnitRatio}
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                            <div className="form-group">
                                                <label className="label-control">Đổi ra tiền Việt</label>
                                                <input type="number"
                                                       name="money"
                                                       className="form-control"
                                                       value={order.money || 0}
                                                       disabled={true}/>
                                                <span className="material-input"/>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.props.route.type === "edit" &&
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                                <div className="form-group">
                                                    <label className="label-control">Khối lượng(kg)</label>
                                                    <input type="number"
                                                           name="weight"
                                                           placeholder="Nhập khối lượng"
                                                           className="form-control"
                                                           value={order.weight || 0}
                                                           onChange={this.updateFormData}/>
                                                    <span className="material-input"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
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
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
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
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                                <div className="form-group">
                                                    <label className="label-control">Mã giao hàng</label>
                                                    <input type="text"
                                                           name="shipCode"
                                                           placeholder="Nhập mã"
                                                           className="form-control"
                                                           value={order.shipCode || ''}
                                                           onChange={this.updateFormData}/>
                                                    <span className="material-input"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                                <FormInputDate
                                                    label="Ngày về"
                                                    name="endTime"
                                                    updateFormData={(e) => this.props.orderedDetailAction.handleDate(e.target.value)}
                                                    id="form-end-time"
                                                    value={order.endTime || ''}
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                    {
                        this.props.route.type === "edit" &&
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">announcement</i></div>
                            <div className="card-content">
                                <h4 className="card-title">Thông tin đơn hàng</h4>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                    <label className="label-control">Mã đơn hàng</label>
                                                    <input type="text"
                                                           name="code"
                                                           className="form-control"
                                                           value={this.props.delivery.code}
                                                           disabled/>
                                                    <span className="material-input"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                    <label className="label-control">Ngày tạo đơn hàng</label>
                                                    <input type="text"
                                                           name="created_at"
                                                           className="form-control"
                                                           value={this.props.delivery.created_at}
                                                           disabled/>
                                                    <span className="material-input"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                    <label className="label-control">Người bán</label>
                                                    <input type="text"
                                                           name="staff"
                                                           className="form-control"
                                                           value={this.props.delivery.staff ? this.props.delivery.staff.name : 'Không có'}
                                                           disabled/>
                                                    <span className="material-input"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                    <label className="label-control">Phương thức</label>
                                                    <input type="text"
                                                           name="payment"
                                                           className="form-control"
                                                           value={this.props.delivery.payment ? this.props.delivery.payment : ''}
                                                           disabled/>
                                                    <span className="material-input"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
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
    orderedDetailAction: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    delivery: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        order: state.orderedDetail.order,
        customer: state.orderedDetail.customer,
        isLoading: state.orderedDetail.isLoading,
        currencies: state.orderedDetail.currencies,
        delivery: state.orderedDetail.delivery
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedDetailAction: bindActionCreators(orderedDetailAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedDetailContainer);