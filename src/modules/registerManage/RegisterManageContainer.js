/**
 * Created by TienTaiNguyen on 01/26/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../../components/common/Search';
import FormInputDate from '../../components/common/FormInputDate';
import TooltipButton from '../../components/common/TooltipButton';
import ListOrder from './ListOrder';
import * as registerManageAction from './registerManageAction';
//import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Pagination from "../../components/common/Pagination";
//import Loading from "../../components/common/Loading";
import {Link} from "react-router";

class RegisterManageContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            user_id: null,
            staff_id: null,
            status: null
        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.registersSearchChange = this.registersSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.registerManageAction.loadAllRegisters();
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
                this.state.user_id,
                this.state.staff_id,
                this.state.status
            );
        }.bind(this), 500);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.registerManageAction.loadAllRegisters(
            page,
            this.state.query,
            this.state.user_id,
            this.state.staff_id,
            this.state.status
        );
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="flex flex-row flex-space-between">
                            <div>
                                <Link to="/good/goods/add-sale-good">
                                    <TooltipButton text="Bán hàng" placement="top">
                                        <button className="btn btn-rose">Bán hàng</button>
                                    </TooltipButton>
                                </Link>


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
                                            onChange={this.registersSearchChange}
                                            value={this.state.query}
                                            placeholder="Nhập mã đơn hoặc email khách hàng"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button type="button" data-toggle="collapse" data-target="#demo"
                                                className="btn btn-info btn-rose">
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
                                                        value={this.state.staff}
                                                        options={[]}
                                                        onChange={this.staffsSearchChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className="label-control">Tìm theo cửa hàng</label>
                                                    <Select
                                                        value={this.state.base}
                                                        options={[]}
                                                        onChange={this.displayStatusChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className="label-control">Tìm theo trạng thái</label>
                                                    <Select
                                                        value={this.state.status}
                                                        options={[]}
                                                        onChange={this.statusesSearchChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <ListOrder
                                    registers={this.props.registers}
                                    isLoading={this.props.isLoading}
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

RegisterManageContainer.propTypes = {
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    registers: PropTypes.array.isRequired,
    registerManageAction: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.registerManage.isLoading,
        totalPages: state.registerManage.totalPages,
        registers: state.registerManage.registers,
        limit: state.registerManage.limit,
        totalCount: state.registerManage.totalCount,
        currentPage: state.registerManage.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageAction: bindActionCreators(registerManageAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterManageContainer);
