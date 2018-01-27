import React from 'react';
import Search from "../../components/common/Search";
import Select from "react-select";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import InventoryOrderComponent from "./InventoryOrderComponent";
import *as inventoryOrderAction from "./inventoryOrderAction";
import FormInputDate from "../../components/common/FormInputDate";
import * as helper from '../../helpers/helper';

class InventoryOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            staff_id: null,
            user_id: null,
            time: {
                startTime: null,
                endTime: null
            },
        };
        this.timeOut = null;
        this.inventoriesOrderSearchChange = this.inventoriesOrderSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.staffsSearchChange = this.staffsSearchChange.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
    }

    componentWillMount() {
        this.props.inventoryOrderAction.getInventoriesOrder();
        this.props.inventoryOrderAction.getAllStaffs();
    }

    inventoriesOrderSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.inventoryOrderAction.getInventoriesOrder(
                1,
                value,
                this.state.staff_id,
                this.state.user_id,
                this.state.time.startTime,
                this.state.time.endTime
            );
        }.bind(this), 500);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.inventoryOrderAction.getInventoriesOrder(
            page,
            this.state.query,
            this.state.staff_id,
            this.state.user_id,
            this.state.time.startTime,
            this.state.time.endTime
        );
    }

    staffsSearchChange(value) {
        if (value) {
            this.setState({
                staff_id: value.value,
                page: 1
            });
            this.props.inventoryOrderAction.getInventoriesOrder(
                1,
                this.state.query,
                value.value,
                this.state.user_id,
                this.state.time.startTime,
                this.state.time.endTime
            );
        } else {
            this.setState({
                staff_id: null,
                page: 1
            });
            this.props.inventoryOrderAction.getInventoriesOrder(
                1,
                this.state.query,
                null,
                this.state.user_id,
                this.state.time.startTime,
                this.state.time.endTime
            );
        }
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;
        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.inventoryOrderAction.getInventoriesOrder(
                1,
                this.state.query,
                this.state.staff_id,
                this.state.user_id,
                time.startTime,
                time.endTime
            );
            this.setState({
                time: time,
                page: 1
            });
        } else {
            this.setState({
                time: time,
                page: 1
            });
        }
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-success">
                                                    <i className="material-icons">print</i> In mã vạch
                                                </button>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-info">
                                                    <i className="material-icons">save</i> Lưu về máy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            this.props.isLoading ? (
                                                <Loading/>
                                            ) : (
                                                <div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
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
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="card card-stats">
                                                            <div className="card-header" data-background-color="blue">
                                                                <i className="fa fa-twitter"/>
                                                            </div>
                                                            <div className="card-content">
                                                                <p className="category">Tổng số lượng</p>
                                                                <h3 className="card-title">{helper.dotNumber(this.props.totalQuantity)}đ</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content"><h4 className="card-title">Danh sách
                                                hàng đặt tồn kho</h4>
                                                <div className="row">
                                                    <Search
                                                        onChange={this.inventoriesOrderSearchChange}
                                                        value={this.state.query}
                                                        placeholder="Nhập tên hoặc số điện thoại người dùng để tìm"
                                                        className="col-lg-10 col-md-10 col-sm-10"
                                                    />
                                                    <div className="col-lg-2 col-md-2 col-sm-2">
                                                        <button type="button" data-toggle="collapse" data-target="#demo"
                                                                className="btn btn-info">
                                                            <i className="material-icons">filter_list</i> Lọc
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="demo" className="collapse">
                                                    <div className="row">
                                                        <div className="form-group col-lg-4 col-md-4 col-sm-4">
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
                                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                                            <FormInputDate
                                                                label="Từ ngày"
                                                                name="startTime"
                                                                updateFormData={this.updateFormDate}
                                                                id="form-start-time"
                                                                value={this.state.time.startTime}
                                                                maxDate={this.state.time.endTime}
                                                            />
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                                            <FormInputDate
                                                                label="Đến ngày"
                                                                name="endTime"
                                                                updateFormData={this.updateFormDate}
                                                                id="form-end-time"
                                                                value={this.state.time.endTime}
                                                                minDate={this.state.time.startTime}
                                                            />
                                                        </div>
                                                        <br/>
                                                    </div>
                                                </div>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <InventoryOrderComponent
                                                            inventories={this.props.inventories}/>
                                                    )
                                                }
                                            </div>
                                            <div className="row float-right">
                                                <div className="col-md-12" style={{textAlign: 'right'}}>
                                                    <b style={{marginRight: '15px'}}>
                                                        Hiển thị kêt quả từ {first}
                                                        - {end}/{this.props.totalCount}</b><br/>
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
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>

        );
    }
}

InventoryOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    inventories: PropTypes.array.isRequired,
    inventoryOrderAction: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalMoney: PropTypes.number.isRequired,
    totalQuantity: PropTypes.number.isRequired,
    staffs: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.inventoryOrder.isLoading,
        inventories: state.inventoryOrder.inventories,
        totalPages: state.inventoryOrder.totalPages,
        currentPage: state.inventoryOrder.currentPage,
        limit: state.inventoryOrder.limit,
        totalCount: state.inventoryOrder.totalCount,
        totalMoney: state.inventoryOrder.totalMoney,
        totalQuantity: state.inventoryOrder.totalQuantity,
        staffs: state.inventoryOrder.staffs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inventoryOrderAction: bindActionCreators(inventoryOrderAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryOrderContainer);
