/**
 * Created by Nguyen Tien Tai on 01/10/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import FormInputDate from '../../components/common/FormInputDate';
//import TooltipButton from '../../components/common/TooltipButton';
import ListOrder from './ListOrder';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Pagination from "../../components/common/Pagination";
import {ORDERED_STATUS, ORDERED_STATUS_TRANSFER} from "../../constants/constants";
import Loading from "../../components/common/Loading";
import * as orderedProductAction from "./orderedProductAction";
import {bindActionCreators} from "redux";
import {Link} from "react-router";
import AddNoteModal from "./AddNoteModal";
import AddCancelNoteModal from "./AddCancelNoteModal";
import SendPriceModal from "./SendPriceModal";
import ChooseWalletModal from "./ChooseWalletModal";
import PropertyReactSelectValue from "../createProduct/PropertyReactSelectValue";
import AddJavCodeModal from "./AddJavCodeModal";
import CameToVNModal from "./CameToVNModal";
import ImportWeightModal from "./ImportWeightModal";
import AddShipFeeModal from "./AddShipFeeModal";
import SelectButton from "../../components/common/Select";

class OrderedContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checkedPrice: {},
            isSendingPrice: false,
            checkAll: false,
            page: 1,
            searches: [],
            time: {
                startTime: '',
                endTime: ''
            },
            status: '',
            staff_id: null,
            user_id: null,
            queries: [],
            isImportingDate: false,
            statusTransfer: 'origin'
        };
        this.timeOut = null;
        this.orderedSearchChange = this.orderedSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.staffsSearchChange = this.staffsSearchChange.bind(this);
        this.statusesSearchChange = this.statusesSearchChange.bind(this);
        this.showAddNoteModal = this.showAddNoteModal.bind(this);
        this.showAddCancelNoteModal = this.showAddCancelNoteModal.bind(this);
        this.showSendPriceModal = this.showSendPriceModal.bind(this);
        this.chooseAll = this.chooseAll.bind(this);
        this.chooseItem = this.chooseItem.bind(this);
        this.showChooseWalletModal = this.showChooseWalletModal.bind(this);
        this.queriesSearchChange = this.queriesSearchChange.bind(this);
        this.showAddJavCodeModal = this.showAddJavCodeModal.bind(this);
        this.showCameToVNModal = this.showCameToVNModal.bind(this);
        this.showImportWeightModal = this.showImportWeightModal.bind(this);
        this.showAddShipFeeModal = this.showAddShipFeeModal.bind(this);
        this.statusOrdersChange = this.statusOrdersChange.bind(this);
        this.openMultiStatusesModal = this.openMultiStatusesModal.bind(this);
    }

    componentWillMount() {
        this.props.orderedProductAction.loadAllOrders();
        this.props.orderedProductAction.getAllStaffs();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSendingPrice !== this.props.isSendingPrice && !nextProps.isSendingPrice) {
            this.props.orderedProductAction.loadAllOrders();
            this.setState({
                checkedPrice: {},
                isSendingPrice: false,
                checkAll: false,
                page: 1,
                searches: [],
                time: {
                    startTime: '',
                    endTime: ''
                },
                status: '',
                staff_id: null,
                user_id: null,
                queries: [],
                isImportingDate: false,
                statusTransfer: 'origin'
            });
        }
        if (nextProps.isChangingStatus !== this.props.isChangingStatus && !nextProps.isChangingStatus) {
            this.props.orderedProductAction.loadAllOrders();
            this.setState({
                checkedPrice: {},
                isSendingPrice: false,
                checkAll: false,
                page: 1,
                searches: [],
                time: {
                    startTime: '',
                    endTime: ''
                },
                status: '',
                staff_id: null,
                user_id: null,
                queries: [],
                isImportingDate: false,
                statusTransfer: 'origin'
            });
        }
        if (nextProps.isChoosingWallet !== this.props.isChoosingWallet && !nextProps.isChoosingWallet) {
            this.props.orderedProductAction.loadAllOrders();
        }
    }

    orderedSearchChange(value) {
        const searches = value.map(search => {
            return search.value;
        });
        this.setState({
            page: 1,
            searches: value
        });
        this.props.orderedProductAction.loadAllOrders(
            1,
            searches,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.status,
            this.state.staff_id,
            this.state.user_id,
            this.state.queries
        );
    }

    queriesSearchChange(value) {
        const queries = value.map(query => {
            return query.value;
        });
        this.setState({
            page: 1,
            queries: value
        });
        this.props.orderedProductAction.loadAllOrders(
            1,
            this.state.searches,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.status,
            this.state.staff_id,
            this.state.user_id,
            queries
        );
    }

    staffsSearchChange(value) {
        if (value) {
            this.setState({
                staff_id: value.value,
                page: 1
            });
            this.props.orderedProductAction.loadAllOrders(
                1,
                this.state.searches,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.status,
                value.value,
                this.state.user_id,
                this.state.queries
            );
        } else {
            this.setState({
                staff_id: null,
                page: 1
            });
            this.props.orderedProductAction.loadAllOrders(
                1,
                this.state.searches,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.status,
                null,
                this.state.user_id,
                this.state.queries
            );
        }
    }

    statusesSearchChange(value) {
        if (value) {
            this.setState({
                status: value.value,
                isSendingPrice: (value.value === "place_order" && this.state.isSendingPrice),
                checkedPrice: {},
                page: 1
            });
            this.props.orderedProductAction.loadAllOrders(
                1,
                this.state.searches,
                this.state.time.startTime,
                this.state.time.endTime,
                value.value,
                this.state.staff_id,
                this.state.user_id,
                this.state.queries
            );
        } else {
            this.setState({
                status: null,
                statusTransfer: "",
                isSendingPrice: false,
                checkedPrice: {},
                page: 1
            });
            this.props.orderedProductAction.loadAllOrders(
                1,
                this.state.searches,
                this.state.time.startTime,
                this.state.time.endTime,
                null,
                this.state.staff_id,
                this.state.user_id,
                this.state.queries
            );
        }
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.orderedProductAction.loadAllOrders(
            page,
            this.state.searches,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.status,
            this.state.staff_id,
            this.state.user_id,
            this.state.queries
        );
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;
        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.orderedProductAction.loadAllOrders(
                1,
                this.state.searches,
                time.startTime,
                time.endTime,
                this.state.status,
                this.state.staff_id,
                this.state.user_id,
                this.state.queries
            );
            this.setState({time: time, page: 1});
        } else {
            this.setState({time: time});
        }
    }

    showAddNoteModal(order) {
        this.props.orderedProductAction.showAddNoteModal();
        this.props.orderedProductAction.handleAddNoteModal(order);
    }

    showAddCancelNoteModal(order) {
        this.props.orderedProductAction.showAddCancelNoteModal();
        this.props.orderedProductAction.handleAddCancelNoteModal(order);
    }

    showSendPriceModal(orders) {
        if (orders.length) {
            this.props.orderedProductAction.showSendPriceModal();
            this.props.orderedProductAction.handleSendPriceModal(orders);
        } else {
            helper.showErrorMessage("Xin lỗi", "Chưa có đơn hàng nào được chọn");
        }
    }

    showChooseWalletModal(order) {
        this.props.orderedProductAction.showChooseWalletModal();
        this.props.orderedProductAction.handleChooseWalletModal(order);
    }

    showAddJavCodeModal(order) {
        this.props.orderedProductAction.showAddJavCodeModal();
        this.props.orderedProductAction.handleAddJavCodeModal(order);
    }

    showCameToVNModal(order) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.setState({
            isImportingDate: true
        });
        this.props.orderedProductAction.showCameToVNModal();
        this.props.orderedProductAction.handleCameToVNModal(order);
        this.timeOut = setTimeout(function () {
            this.setState({
                isImportingDate: false
            });
        }.bind(this), 500);
    }

    showImportWeightModal(order) {
        this.props.orderedProductAction.showImportWeightModal();
        this.props.orderedProductAction.handleImportWeightModal(order);
    }

    showAddShipFeeModal(order) {
        this.props.orderedProductAction.showAddShipFeeModal();
        this.props.orderedProductAction.handleAddShipFeeModal(order);
    }

    statusOrdersChange(value) {
        if (value === "origin") {
            this.setState({
                isSendingPrice: false,
                checkedPrice: {},
                status: "",
                statusTransfer: "origin"
            });
            this.props.orderedProductAction.loadAllOrders();
        } else {
            const statusTransfer = value;
            let status;
            if (value === "cancel") {
                status = '';
            } else {
                let order = ORDERED_STATUS_TRANSFER.filter(st => st.key === value)[0].order;
                status = ORDERED_STATUS[order].value;
            }
            this.setState({
                isSendingPrice: true,
                checkedPrice: {},
                status: status,
                statusTransfer: statusTransfer
            });
            this.props.orderedProductAction.loadAllOrders(
                1,
                this.state.searches,
                this.state.time.startTime,
                this.state.time.endTime,
                status,
                this.state.staff_id,
                this.state.user_id,
                this.state.queries
            );
        }
    }

    openMultiStatusesModal() {
        const value = this.state.statusTransfer;
        const nextStatus = ORDERED_STATUS.filter(status => status.value === value)[0];
        const array = this.props.deliveryOrders.filter(order => this.state.checkedPrice[order.id]);
        if (!array.length) {
            helper.showErrorMessage("Xin lỗi", "Chưa có đơn hàng nào được chọn");
            return 0;
        }
        if (nextStatus.order === 8) {
            this.showAddCancelNoteModal({});
        } else if (nextStatus.order === 1) {
            this.showSendPriceModal(array);
        } else if (nextStatus.order === 3) {
            this.showAddJavCodeModal(array);
        } else if (nextStatus.order === 4) {
            this.showCameToVNModal(array);
        } else if (nextStatus.order === 5) {
            this.showImportWeightModal(array);
        } else if (nextStatus.order === 6) {
            this.showAddShipFeeModal(array);
        } else {
            helper.confirm("error", "Chuyển trạng thái", "Bạn có chắc muốn chuyển trạng thái", () => {
                this.props.orderedProductAction.changeStatus(value, array, null);
            });
        }
    }

    chooseAll() {
        if (this.state.checkAll) {
            this.setState({
                checkAll: false,
                checkedPrice: {}
            });
        } else {
            let checkedPrice = {};
            this.props.deliveryOrders.forEach(order => {
                checkedPrice = {
                    ...checkedPrice,
                    [order.id]: true
                };
            });
            this.setState({
                checkAll: true,
                checkedPrice: checkedPrice
            });
        }
    }

    chooseItem(id) {
        let checkedPrice = {...this.state.checkedPrice};
        if (this.state.checkedPrice[id]) {
            this.setState({
                checkAll: false,
                checkedPrice: {
                    ...checkedPrice,
                    [id]: false
                }
            });
        } else {
            this.setState({
                checkedPrice: {
                    ...checkedPrice,
                    [id]: true
                }
            });
        }
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * 10 + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * 10 : this.props.totalCount;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <Link
                                    to="/order/detail"
                                    rel="tooltip" data-placement="top" title=""
                                    data-original-title="Thêm đơn hàng đặt" type="button"
                                    className="btn btn-rose">
                                    Thêm đơn hàng đặt
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <SelectButton
                                    defaultMessage={"Chuyển trạng thái nhiều đơn sang..."}
                                    options={ORDERED_STATUS_TRANSFER}
                                    disableRound
                                    value={this.state.statusTransfer}
                                    onChange={this.statusOrdersChange}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <button
                                    onClick={() => this.openMultiStatusesModal()}
                                    rel="tooltip" data-placement="top" title=""
                                    data-original-title={this.state.isSendingPrice ? ("Chọn để chuyển") : ("Chưa chọn đơn")}
                                    type="button"
                                    className="btn btn-rose"
                                    disabled={!this.state.isSendingPrice}>
                                    Chuyển ...
                                </button>
                            </div>
                            {/*<div>*/}
                            {/*<TooltipButton text="In dưới dạng pdf" placement="top">*/}
                            {/*<button className="btn btn-success">*/}
                            {/*<i className="material-icons">print</i> In*/}
                            {/*</button>*/}
                            {/*</TooltipButton>*/}
                            {/*<TooltipButton text="Lưu dưới dạng excel" placement="top">*/}
                            {/*<button className="btn btn-info">*/}
                            {/*<i className="material-icons">save</i> Lưu về máy*/}
                            {/*</button>*/}
                            {/*</TooltipButton>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div>
                        {
                            this.props.isLoading ? (
                                <Loading/>
                            ) : (
                                <div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="orange">
                                                <i className="material-icons">weekend</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng đơn chưa chốt</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.notLocked)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="green">
                                                <i className="material-icons">store</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng đơn hàng</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.totalDeliveryOrders)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="rose">
                                                <i className="material-icons">equalizer</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng tiền</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.totalMoney)}đ</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="blue">
                                                <i className="fa fa-twitter"/>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng tiền đã trả</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.totalPaidMoney)}đ</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Danh sách đơn hàng</h4>
                                <div className="row">
                                    <div className="form-group col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                        <Select.Creatable
                                            multi={true}
                                            placeholder="Nhập tên hoặc số điện thoại khách hàng"
                                            options={[]}
                                            onChange={this.orderedSearchChange}
                                            value={this.state.searches}
                                            valueComponent={PropertyReactSelectValue}
                                        />
                                    </div>
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        <button type="button" data-toggle="collapse" data-target="#demo"
                                                className="btn btn-rose">
                                            <i className="material-icons">filter_list</i> Lọc
                                        </button>
                                    </div>
                                </div>
                                <div id="demo" className="collapse">
                                    <div className="row">
                                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <label className="label-control">Tìm theo mã hàng Nhật hoặc link sản
                                                phẩm</label>
                                            <Select.Creatable
                                                multi={true}
                                                placeholder="Nhập mã hàng Nhật hoặc link sản phẩm"
                                                options={[]}
                                                onChange={this.queriesSearchChange}
                                                value={this.state.queries}
                                                valueComponent={PropertyReactSelectValue}
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <FormInputDate
                                                        label="Từ ngày"
                                                        name="startTime"
                                                        updateFormData={this.updateFormDate}
                                                        id="form-start-time"
                                                        value={this.state.time.startTime}
                                                        maxDate={this.state.time.endTime}
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <FormInputDate
                                                        label="Đến ngày"
                                                        name="endTime"
                                                        updateFormData={this.updateFormDate}
                                                        id="form-end-time"
                                                        value={this.state.time.endTime}
                                                        minDate={this.state.time.startTime}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                            <div className="row">
                                                <div className="form-group col-md-4 col-sm-4 col-xs-4">
                                                    <label className="label-control">Tìm theo thu ngân</label>
                                                    <Select
                                                        value={this.state.staff_id}
                                                        options={this.props.staffs.map((staff) => {
                                                            return {
                                                                ...staff,
                                                                value: staff.id,
                                                                label: staff.name
                                                            };
                                                        })}
                                                        onChange={this.staffsSearchChange}
                                                    />
                                                </div>
                                                <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                    <label className="label-control">Tìm theo trạng thái</label>
                                                    <Select
                                                        value={this.state.status}
                                                        options={ORDERED_STATUS}
                                                        onChange={this.statusesSearchChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <ListOrder
                                    changeStatus={this.props.orderedProductAction.changeStatus}
                                    deliveryOrders={this.props.deliveryOrders}
                                    isLoading={this.props.isLoading}
                                    user={this.props.user}
                                    showAddNoteModal={this.showAddNoteModal}
                                    showAddCancelNoteModal={this.showAddCancelNoteModal}
                                    showSendPriceModal={this.showSendPriceModal}
                                    checkedPrice={this.state.checkedPrice}
                                    checkAll={this.state.checkAll}
                                    isSendingPrice={this.state.isSendingPrice}
                                    chooseAll={this.chooseAll}
                                    chooseItem={this.chooseItem}
                                    showChooseWalletModal={this.showChooseWalletModal}
                                    showAddJavCodeModal={this.showAddJavCodeModal}
                                    showCameToVNModal={this.showCameToVNModal}
                                    showImportWeightModal={this.showImportWeightModal}
                                    showAddShipFeeModal={this.showAddShipFeeModal}
                                />
                            </div>
                            <div className="row float-right">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right'}}>
                                    <b style={{marginRight: '15px'}}>
                                        Hiển thị kêt quả từ {first} - {end}/{this.props.totalCount}</b><br/>
                                    <Pagination
                                        totalPages={this.props.totalPages}
                                        currentPage={this.props.currentPage}
                                        loadDataPage={this.loadOrders}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddNoteModal/>
                <AddCancelNoteModal/>
                <SendPriceModal/>
                <ChooseWalletModal/>
                <AddJavCodeModal/>
                <CameToVNModal
                    isImportingDate={this.state.isImportingDate}/>
                <ImportWeightModal/>
                <AddShipFeeModal/>
            </div>
        );
    }
}

OrderedContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    totalPaidMoney: PropTypes.number.isRequired,
    totalMoney: PropTypes.number.isRequired,
    totalDeliveryOrders: PropTypes.number.isRequired,
    notLocked: PropTypes.number.isRequired,
    deliveryOrders: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    staffs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    orderedProductAction: PropTypes.object.isRequired,
    isSendingPrice: PropTypes.bool.isRequired,
    isChoosingWallet: PropTypes.bool,
    isChangingStatus: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderedProduct.isLoading,
        totalPaidMoney: state.orderedProduct.totalPaidMoney,
        totalMoney: state.orderedProduct.totalMoney,
        totalDeliveryOrders: state.orderedProduct.totalDeliveryOrders,
        notLocked: state.orderedProduct.notLocked,
        deliveryOrders: state.orderedProduct.deliveryOrders,
        currentPage: state.orderedProduct.currentPage,
        totalPages: state.orderedProduct.totalPages,
        totalCount: state.orderedProduct.totalCount,
        staffs: state.orderedProduct.staffs,
        isSendingPrice: state.orderedProduct.isSendingPrice,
        isChangingStatus: state.orderedProduct.isChangingStatus,
        isChoosingWallet: state.orderedProduct.isChoosingWallet,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedContainer);
