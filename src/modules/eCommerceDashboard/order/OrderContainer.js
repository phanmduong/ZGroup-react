/**
 * Created by phanmduong on 10/23/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../../components/common/FormInputText';
import ListGood from './ListGood';
import TooltipButton from '../../../components/common/TooltipButton';
import Loading from '../../../components/common/Loading';
import * as goodOrderActions from '../goodOrderActions';
import PropTypes from 'prop-types';
import {ORDER_STATUS} from "../../../constants/constants";
import ReactSelect from 'react-select';

class OrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            infoOrder: {},
            optionsSelectStaff: []
        };
        this.changeStatusOrder = this.changeStatusOrder.bind(this);
        this.updateOrderFormData = this.updateOrderFormData.bind(this);
        // this.loadDetailOrder = this.loadDetailOrder.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);

    }

    componentWillMount() {
        this.props.goodOrderActions.loadDetailOrder(this.props.params.orderId);
        // this.props.goodOrderActions.loadStaffs();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingStaffs !== this.props.isLoadingStaffs && !nextProps.isLoadingStaffs) {
            let dataStaffs = [];
            nextProps.staffs.forEach(staff => {
                dataStaffs.push({
                    ...staff, ...{
                        value: staff.id,
                        label: staff.name
                    }
                });
            });
            this.setState({
                optionsSelectStaff: dataStaffs,
            });
        }
    }

    updateOrderFormData(event) {
        const field = event.target.name;
        let order = {...this.props.order.order};
        order[field] = event.target.value;
        this.props.goodOrderActions.updateOrderFormData(order);
    }

    updateQuantity(event, id) {
        const field = event.target.name;
        const good_orders = this.props.order.order.good_orders.map((good_order, index) => {
            if (index === id) {
                return {...good_order, [field]: event.target.value};
            }
            return good_order;
        });
        const order = {...this.props.order.order, good_orders: good_orders};
        this.props.goodOrderActions.updateOrderFormData(order);
    }

    changeStatusOrder(value) {
        let statusOrder = value && value.value ? value.value : '';
        this.props.goodOrderActions.changeStatusOrder(statusOrder, this.props.params.orderId);
    }

    editOrder(e) {
        this.props.goodOrderActions.editOrder(this.props.order, this.props.params.orderId);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Chi tiết đơn hàng</h4>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <h4><strong>Chọn sản phẩm</strong></h4>
                                        <ListGood
                                            goodOrders={this.props.order.order.good_orders}
                                            updateQuantity={this.updateQuantity}
                                            updateOrderFormData={this.updateOrderFormData}
                                            paid={this.props.order.order.paid}
                                            orderId = {this.props.params.orderId}
                                        />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">announcement</i></div>
                            <div className="card-content">
                                <h4 className="card-title">Thông tin</h4>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <div>
                                            <h4><strong>Thông tin đơn hàng</strong></h4>
                                            <FormInputText label="Mã đơn hàng" name="code"
                                                           value={this.props.order.order.code} disabled/>
                                            <FormInputText
                                                label="Ngày tạo"
                                                name="created_at"
                                                value={this.props.order.order.created_at}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Người bán"
                                                name="staff"
                                                value={this.props.order.order.staff ? this.props.order.order.staff.name : 'Không có'}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Phương thức"
                                                name="payment"
                                                value={this.props.order.order.payment ? this.props.order.order.payment : ''}
                                                disabled
                                            />
                                            <ReactSelect
                                                name="form-field-name"
                                                options={ORDER_STATUS}
                                                value={this.props.order.order.status}
                                                placeholder="Chọn trạng thái"
                                                onChange={this.changeStatusOrder}
                                            />
                                            <div className="form-group">
                                                <label className="control-label"/>Ghi chú
                                            <textarea
                                                className="form-control"
                                                name="note"
                                                rows = "5"
                                                value={this.props.order.order.note}
                                                onChange={(e) => this.updateOrderFormData(e)}
                                            />
                                            </div>
                                        </div>
                                        <div>
                                            <h4><strong>Thông tin khách hàng </strong>
                                                <TooltipButton text="Thêm khách hàng" placement="top">
                                                    <button className="btn btn-round btn-sm btn-danger"
                                                            style={{width: '20px', height: '20px', padding: '0'}}>
                                                        <i className="material-icons">add</i>
                                                    </button>
                                                </TooltipButton>
                                            </h4>
                                            <FormInputText
                                                label="Tên khách hàng"
                                                name="name"
                                                value={this.props.order.order.customer ? this.props.order.order.customer.name : ''}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Email"
                                                name="email"
                                                value={this.props.order.order.customer ? this.props.order.order.customer.email : ''}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Số điện thoại"
                                                name="phone"
                                                value={this.props.order.order.customer ? this.props.order.order.customer.phone : ''}
                                                disabled
                                            />
                                            <FormInputText
                                                label="Địa chỉ"
                                                name="address"
                                                value={this.props.order.order.customer ? this.props.order.order.customer.address : ''}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <h4><strong>Thông tin giao hàng</strong></h4>
                                            <FormInputText label="Ngày giao" name="ae3qsd"/>
                                            <FormInputText label="Người giao" name="dsadasd"/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        {!this.props.isLoading &&
                        <div className="card-footer">
                            <div className="float-right" style={{marginBottom: '20px'}}>
                                {this.props.isSaving ?
                                    <button
                                        className="btn btn-sm btn-success disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        Đang cập nhật
                                    </button>
                                    :

                                    <button className="btn btn-sm btn-success"
                                            onClick={(e) => {
                                                this.editOrder(e);
                                            }}
                                    >
                                        <i className="material-icons">save</i> Lưu
                                    </button>
                                }
                                <button className="btn btn-sm btn-danger">
                                    <i className="material-icons">cancel</i> Huỷ
                                </button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

OrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool.isRequired,
    staffs: PropTypes.array.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    isSaving: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoading: state.goodOrders.order.isLoading,
        isSaving: state.goodOrders.order.isSaving,
        isLoadingStaffs: state.goodOrders.isLoadingStaffs,
        staffs: state.goodOrders.staffs,
        order: state.goodOrders.order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
