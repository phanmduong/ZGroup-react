/*eslint-disable */
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
import {browserHistory} from 'react-router';
import * as goodOrdersApi from '../goodOrdersApi' ;
import AddGoodOverlay from "./AddGoodOverlay";
import * as helper from '../../../helpers/helper';


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
        this.updateQuantityInReturnOrders = this.updateQuantityInReturnOrders.bind(this);
        this.openReturnOrder = this.openReturnOrder.bind(this);
        this.loadWarehouses = this.loadWarehouses.bind(this);
        this.changeWarehouse = this.changeWarehouse.bind(this);
        this.resetReturnOrders = this.resetReturnOrders.bind(this);
        this.editReturnOrders = this.editReturnOrders.bind(this);
    }

    componentWillMount() {
        this.props.goodOrderActions.loadDetailOrder(this.props.params.orderId);
        this.props.goodOrderActions.loadProvinces();
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

    updateQuantity(quantity, id) {
        const good_orders = this.props.order.order.good_orders.map((good_order, index) => {
            if (index === id) {
                return {...good_order, quantity: quantity};
            }
            return good_order;
        });
        const order = {...this.props.order.order, good_orders: good_orders};
        this.props.goodOrderActions.updateOrderFormData(order);
    }

    updateQuantityInReturnOrders(quantity, id) {
        const return_orders = this.props.order.order.return_orders.map((good_order, index) => {
            if (index === id) {
                return {...good_order, quantity: quantity};
            }
            return good_order;
        });
        const order = {...this.props.order.order, return_orders: return_orders};
        this.props.goodOrderActions.updateOrderFormData(order);
    }

    changeStatusOrder(value) {
        let statusOrder = value && value.value ? value.value : '';
        this.props.goodOrderActions.changeStatusOrder(statusOrder, this.props.params.orderId);
    }

    editOrder(e) {
        this.props.goodOrderActions.editOrder(this.props.order, this.props.params.orderId, false);
        e.preventDefault();
    }

    openReturnOrder() {
        this.props.goodOrderActions.openReturnOrder(this.props.isOpenReturnOrder);
    }

    loadWarehouses(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            goodOrdersApi.loadWareHouseDetailApi(input).then(res => {
                let warehouses = res.data.data.warehouses.map((warehouse) => {
                    return {
                        ...warehouse,
                        ...{
                            value: warehouse.id,
                            label: warehouse.name,
                        }
                    };
                });
                callback(null, {options: warehouses, complete: true});
            });
        }.bind(this), 500);
    }

    changeWarehouse(value) {
        this.props.goodOrderActions.changeWarehouse(value.value);
    }

    resetReturnOrders() {
        this.props.goodOrderActions.resetReturnOrders();
    }

    editReturnOrders(e) {
        if (this.props.warehouse === null || this.props.warehouse === undefined || this.props.warehouse === '') {
            helper.showTypeNotification("Vui lòng nhập kho hàng", 'warning');
            return;
        }
        else {
            this.props.goodOrderActions.editReturnOrders(this.props.order, this.props.params.orderId, false);
        }
        e.preventDefault();
    }


    render() {

        const ORDER_STATUS_DOWN = [
            {
                order: 0,
                label: "Xác nhận",
                value: "confirm_order"
            },
            {
                order: 1,
                label: "Giao hàng",
                value: "ship_order"
            },
            {
                order: 2,
                label: "Hoàn thành",
                value: "completed_order"
            },
            {
                order: 3,
                label: "Hủy",
                value: "cancel"
            }
        ];




        const user = JSON.parse(localStorage.getItem("user"));
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <div className="row">
                                    <div className="col-md-7"
                                    >
                                        <h4 className="card-title">Chi tiết đơn hàng đặt</h4>
                                    </div>
                                    <div className="col-md-2">

                                        <AddGoodOverlay
                                            status={this.props.order.order.status}
                                        />
                                    </div>
                                </div>
                                {this.props.isLoading ? <Loading/> :
                                    <div>
                                        <ListGood
                                            goodOrders={this.props.order.order.good_orders}
                                            updateQuantity={this.updateQuantity}
                                            paid={this.props.order.order.paid}
                                            orderId={this.props.params.orderId}
                                            isReturnOrders={false}
                                        />
                                    </div>
                                }

                            </div>
                        </div>
                        <div>
                            {(this.props.order.order.status === 'completed_order') ?
                                <button className="btn btn-md btn-info" onClick={() => {
                                    this.openReturnOrder();
                                }}>
                                    <i className="material-icons">assignment_return </i>Trả lại hàng
                                </button> :
                                <TooltipButton text="Chỉ trả hàng khi ở trạng thái hoàn thành" placement="top">
                                    <button className="btn btn-md btn-info disabled">
                                        <i className="material-icons">assignment_return </i>Trả lại hàng
                                    </button>
                                </TooltipButton>
                            }

                        </div>
                        {this.props.isOpenReturnOrder && this.props.order.order.status === 'completed_order' ?
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">assignment</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Chi tiết đơn hàng trả lại</h4>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="label-control">Chọn kho hàng trả lại</label>
                                                <ReactSelect.Async
                                                    loadOptions={this.loadWarehouses}
                                                    loadingPlaceholder="Đang tải..."
                                                    placeholder="Chọn nhà kho"
                                                    searchPromptText="Không có dữ liệu "
                                                    onChange={this.changeWarehouse}
                                                    value={this.props.warehouse}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4" style={{marginTop: 34, display: "flex"}}>
                                            <TooltipButton text="Load lại hàng trả lại" placement="top"
                                            >
                                                <button className="btn btn-md btn-info"
                                                        style={{height: 36, display: "flex"}}
                                                        onClick={() => {
                                                            this.resetReturnOrders();
                                                        }}
                                                >
                                                    <i className="material-icons">cached</i>
                                                </button>
                                            </TooltipButton>

                                            <TooltipButton text="Lưu" placement="top"
                                            >
                                                {this.props.isSavingReturnOrders ?
                                                    <button
                                                        className="btn btn-md btn-success disabled"
                                                        style={{height: 36, display: "flex"}}
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/>
                                                    </button>
                                                    :
                                                    <button className="btn btn-md btn-success"
                                                            style={{height: 36, display: "flex"}}

                                                            onClick={(e) => {
                                                                this.editReturnOrders(e);
                                                            }}
                                                    >
                                                        <i className="material-icons">save</i>
                                                    </button>
                                                }
                                            </TooltipButton>
                                        </div>
                                    </div>

                                    {this.props.isLoading ? <Loading/> :
                                        <div>
                                            <ListGood
                                                goodOrders={this.props.order.order.return_orders}
                                                updateQuantity={this.updateQuantityInReturnOrders}
                                                paid={this.props.order.order.paid}
                                                orderId={this.props.params.orderId}
                                                isReturnOrders={true}
                                            />
                                        </div>
                                    }
                                </div>
                            </div> :
                            null

                        }
                    </div>


                    <div className="col-md-4">
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
                                            {
                                                (user.role === 1) ?
                                                    <ReactSelect
                                                        name="form-field-name"
                                                        options={ORDER_STATUS}
                                                        value={this.props.order.order.status}
                                                        placeholder="Chọn trạng thái"
                                                        onChange={this.changeStatusOrder}
                                                    /> :

                                                    (
                                                        (this.props.order.order.status === "place_order" ||
                                                            this.props.order.order.status === "not_reach") ?
                                                            <ReactSelect
                                                                name="form-field-name"
                                                                options={ORDER_STATUS}
                                                                value={this.props.order.order.status}
                                                                placeholder="Chọn trạng thái"
                                                                onChange={this.changeStatusOrder}
                                                            /> :
                                                            <ReactSelect
                                                                name="form-field-name"
                                                                options={ORDER_STATUS_DOWN}
                                                                value={this.props.order.order.status}
                                                                placeholder="Chọn trạng thái"
                                                                onChange={this.changeStatusOrder}
                                                            />
                                                    )
                                            }


                                            <div className="form-group">
                                                <label className="control-label"/>Ghi chú
                                                <textarea
                                                    className="form-control"
                                                    name="note"
                                                    rows="5"
                                                    value={this.props.order.order.note}
                                                    onChange={(e) => this.updateOrderFormData(e)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h4><strong>Thông tin khách hàng </strong>
                                                {/*<TooltipButton text="Thêm khách hàng" placement="top">*/}
                                                {/*<button className="btn btn-round btn-sm btn-danger"*/}
                                                {/*style={{width: '20px', height: '20px', padding: '0'}}>*/}
                                                {/*<i className="material-icons">add</i>*/}
                                                {/*</button>*/}
                                                {/*</TooltipButton>*/}
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
                                <button className="btn btn-sm btn-danger"
                                        onClick={(e) => {
                                            browserHistory.push("/good/goods/orders");
                                            e.preventDefault();
                                        }}
                                >
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
    isLoading: PropTypes.bool,
    isLoadingStaffs: PropTypes.bool.isRequired,
    staffs: PropTypes.array.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    isSaving: PropTypes.bool,
    isOpenReturnOrder: PropTypes.bool,
    isSavingReturnOrders: PropTypes.bool,
    warehouse: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        isLoading: state.goodOrders.order.isLoading,
        isOpenReturnOrder: state.goodOrders.order.isOpenReturnOrder,
        isSaving: state.goodOrders.order.isSaving,
        isLoadingStaffs: state.goodOrders.isLoadingStaffs,
        staffs: state.goodOrders.staffs,
        order: state.goodOrders.order,
        warehouse: state.goodOrders.order.order.warehouse,
        isSavingReturnOrders: state.goodOrders.order.isSavingReturnOrders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
