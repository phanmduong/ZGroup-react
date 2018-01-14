/**
 * Created by Nguyen Tien Tai on 01/10/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import Search from '../../components/common/Search';
import FormInputDate from '../../components/common/FormInputDate';
import TooltipButton from '../../components/common/TooltipButton';
import ListOrder from './ListOrder';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Pagination from "../../components/common/Pagination";
import {ORDER_STATUS} from "../../constants/constants";
import Loading from "../../components/common/Loading";

class OrderedContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            user: '',
            time: {
                startTime: '',
                endTime: ''
            },
            staff: null,
            base: null,
            status: null

        };
        this.timeOut = null;
    }

    render() {
        let first = (this.props.currentPage - 1) * this.props.limit + 1;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="flex flex-row flex-space-between">
                            <div>
                                <TooltipButton text="Bán hàng" placement="top">
                                    <button className="btn btn-rose">Bán hàng</button>
                                </TooltipButton>
                                <TooltipButton text="Đặt hàng" placement="top">
                                    <button className="btn btn-rose">Đặt hàng</button>
                                </TooltipButton>
                            </div>
                            <div>
                                <TooltipButton text="In dưới dạng pdf" placement="top">
                                    <button className="btn btn-success">
                                        <i className="material-icons">print</i> In
                                    </button>
                                </TooltipButton>
                                <TooltipButton text="Lưu dưới dạng excel" placement="top">
                                    <button className="btn btn-info">
                                        <i className="material-icons">save</i> Lưu về máy
                                    </button>
                                </TooltipButton>
                                <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                        type="button" className="btn btn-info">
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
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="green">
                                                <i className="material-icons">store</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng đơn hàng</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.totalOrder)}</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">date_range</i> Last 24
                                                    Hours
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="rose">
                                                <i className="material-icons">equalizer</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng tiền</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.totalMoney)}đ</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">date_range</i> Last 24
                                                    Hours
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="blue">
                                                <i className="fa fa-twitter"/>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Tổng nợ</p>
                                                <h3 className="card-title">{helper.dotNumber(this.props.totalMoney - this.props.totalPaidMoney)}đ</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">update</i> Just Updated
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Danh sách đơn hàng</h4>
                                <div className="row">
                                    <div className="col-md-10">
                                        <Search
                                            onChange={this.ordersSearchChange}
                                            value={this.state.query}
                                            placeholder="Nhập mã đơn hoặc email khách hàng"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button type="button" data-toggle="collapse" data-target="#demo"
                                                className="btn btn-info">
                                            <i className="material-icons">filter_list</i> Lọc
                                        </button>
                                    </div>
                                </div>
                                <div id="demo" className="collapse">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <FormInputDate
                                                        label="Từ ngày"
                                                        name="startTime"
                                                        updateFormData={this.updateFormDate}
                                                        id="form-start-time"
                                                        value={this.state.time.startTime}
                                                        maxDate={this.state.time.endTime}
                                                    />
                                                </div>
                                                <div className="col-md-6">
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
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className="label-control">Tìm theo thu ngân</label>
                                                    <Select
                                                        value={this.state.staff}
                                                        options={this.props.allStaffs.map((staff) => {
                                                            return {
                                                                ...staff,
                                                                value: staff.id,
                                                                label: staff.name
                                                            };
                                                        })}
                                                        onChange={this.staffsSearchChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className="label-control">Tìm theo cửa hàng</label>
                                                    <Select
                                                        value={this.state.base}
                                                        options={[
                                                            {
                                                                value: 1,
                                                                label: "HIỂN THỊ RA WEBSITE"
                                                            },
                                                            {
                                                                value: "0",
                                                                label: "KHÔNG HIỂN THỊ RA WEBSITE"
                                                            }
                                                        ]}
                                                        onChange={this.displayStatusChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className="label-control">Tìm theo trạng thái</label>
                                                    <Select
                                                        value={this.state.status}
                                                        options={ORDER_STATUS}
                                                        onChange={this.statusesSearchChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <ListOrder
                                    changeStatusOrder={this.changeStatusOrder}
                                    orders={this.props.orders}
                                    isLoading={this.props.isLoading}
                                    showShipGoodModal={this.showShipGoodModal}
                                    showAddNoteModal={this.showAddNoteModal}
                                    user={this.props.user}
                                />
                            </div>
                            <div className="row float-right">
                                <div className="col-md-12" style={{textAlign: 'right'}}>
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
            </div>
        );
    }
}

OrderedContainer.propTypes = {
    totalMoney: PropTypes.number.isRequired,
    totalOrder: PropTypes.number.isRequired,
    totalPaidMoney: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    orders: PropTypes.array.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    allStaffs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired

};

function mapStateToProps(state) {
    return {
        isLoading: state.goodOrders.isLoading,
        totalPages: state.goodOrders.totalPages,
        orders: state.goodOrders.orders,
        totalMoney: state.goodOrders.totalMoney,
        totalOrder: state.goodOrders.totalOrder,
        totalPaidMoney: state.goodOrders.totalPaidMoney,
        limit: state.goodOrders.limit,
        totalCount: state.goodOrders.totalCount,
        allStaffs: state.goodOrders.allStaffs,
        currentPage: state.goodOrders.currentPage,
        user: state.login.user
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedContainer);
