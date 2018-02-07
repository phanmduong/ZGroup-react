/**
 * Created by TienTaiNguyen on 01/26/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../../components/common/Search';
import ListOrder from './ListOrder';
import * as registerManageAction from './registerManageAction';
//import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Pagination from "../../components/common/Pagination";
//import Loading from "../../components/common/Loading";
// import {Link} from "react-router";
import {REGISTER_STATUS} from "../../constants/constants";


// import {Modal} from 'react-bootstrap';
// import CallModal from "./CallModal";

class RegisterManageContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            staff_id: null,
            status: null,
            campaign_id: null,


        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.staffsSearchChange = this.staffsSearchChange.bind(this);
        this.filterByCampaign = this.filterByCampaign.bind(this);
        this.filterByStaff = this.filterByStaff.bind(this);
        this.statusesSearchChange = this.statusesSearchChange.bind(this);
    }

    componentWillMount() {

        this.props.registerManageAction.loadAllRegisters();
        this.props.registerManageAction.getAllStaffs();
    }


    registersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.registerManageAction.loadAllRegisters(
                1,
                value,
                this.state.staff_id,
                this.state.status,
                this.state.campaign_id,
            );
        }.bind(this), 500);
    }

    staffsSearchChange(value) {
        if (value) {
            this.setState({
                staff_id: value.value,
                page: 1
            });
            this.props.registerManageAction.loadAllRegisters(
                1,
                this.state.query,
                value.value,
                this.state.status,
                this.state.campaign_id,
            );
        } else {
            this.setState({
                staff_id: null,
                page: 1
            });
            this.props.registerManageAction.loadAllRegisters(
                1,
                this.state.query,
                null,
                this.state.status,
                this.state.campaign_id,
            );
        }
    }

    statusesSearchChange(value) {
        if (value) {
            this.setState({
                status: value.value,
                page: 1
            });
            this.props.registerManageAction.loadAllRegisters(
                1,
                this.state.query,
                this.state.staff_id,
                value.value
            );
        } else {
            this.setState({
                status: null,
                page: 1
            });
            this.props.registerManageAction.loadAllRegisters(
                1,
                this.state.query,
                this.state.staff_id,
                null
            );
        }
    }

    filterByCampaign(campaign_id) {
        this.setState({campaign_id: campaign_id});
        this.props.registerManageAction.loadAllRegisters(
            this.state.page,
            this.state.query,
            this.state.staff_id,
            this.state.status,
            campaign_id
        );
    }

    filterByStaff(staff_id) {
        this.setState({staff_id: staff_id});
        this.props.registerManageAction.loadAllRegisters(
            this.state.page,
            this.state.query,
            staff_id,
            this.state.status,
            this.state.campaign_id,
        );
    }


    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.registerManageAction.loadAllRegisters(
            page,
            this.state.query,
            this.state.staff_id,
            this.state.status,
            this.state.campaign_id,
        );
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (

            <div id="page-wrapper">
                <div className="container-fluid">
                    <button
                        onClick={this.showLoadingModal}
                        className="btn btn-info btn-rose"
                        style={{float: "right"}}
                    >
                        <i className="material-icons">file_download</i>
                        Xuất ra Excel
                    </button>
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách đơn hàng</h4>
                            <div>

                                {/*<Select*/}
                                {/*options={this.state.gens}*/}
                                {/*onChange={this.changeGens}*/}
                                {/*value={this.state.selectGenId}*/}
                                {/*defaultMessage="Chọn khóa học"*/}
                                {/*name="gens"*/}
                                {/*/>*/}


                                <div className="row">
                                    <div className="col-md-10">
                                        <Search
                                            onChange={this.registersSearchChange}
                                            value={this.state.query}
                                            placeholder="Nhập mã đăng ký hoặc tên khách hàng"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button type="button" data-toggle="collapse" data-target="#demo"
                                                className="btn btn-rose">
                                            <i className="material-icons">filter_list</i> Lọc
                                        </button>
                                    </div>
                                </div>


                                <div id="demo" className="collapse">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="form-group col-md-4">
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
                                                <div className="form-group col-md-4">
                                                    <label className="label-control">Tìm theo trạng thái</label>
                                                    <Select
                                                        value={this.state.status}
                                                        options={REGISTER_STATUS}
                                                        onChange={this.statusesSearchChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ListOrder
                                    registers={this.props.registers}
                                    isLoading={this.props.isLoading}
                                    filterByStaff = {this.filterByStaff}
                                    filterByCampaign = {this.filterByCampaign}
                                />


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


            </div>

        );
    }
}

RegisterManageContainer.propTypes = {
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    registers: PropTypes.array.isRequired,
    registerManageAction: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    staffs: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.registerManage.isLoading,
        totalPages: state.registerManage.totalPages,
        registers: state.registerManage.registers,
        limit: state.registerManage.limit,
        totalCount: state.registerManage.totalCount,
        currentPage: state.registerManage.currentPage,
        staffs: state.registerManage.staffs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageAction: bindActionCreators(registerManageAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterManageContainer);
