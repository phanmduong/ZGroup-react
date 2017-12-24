/**
 * Created by phanmduong on 10/26/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../../components/common/Search';
import FormInputDate from '../../components/common/FormInputDate';
import Pagination from '../../components/common/Pagination';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import ListImported from './ListImported';
import ReactSelect from 'react-select';
import * as importGoodActions from './importGoodActions';
import * as importGoodsApi from './importGoodsApi';
import Loading from "../../components/common/Loading";
import {Link} from 'react-router';
import {STATUS_IMPORT_GOODS} from '../../constants/constants';

class ImportGoodsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            time: {
                startTime: '',
                endTime: '',
            },
            status: "",
            staff: "",
            search: "",
            page: 1
        };

        this.updateFormDate = this.updateFormDate.bind(this);
        this.loadStaffs = this.loadStaffs.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeStaff = this.changeStaff.bind(this);
        this.setTable = this.setTable.bind(this);
        this.postsImportOrders = this.postsImportOrders.bind(this);
        this.loadImportGoods = this.loadImportGoods.bind(this);
        this.deleteImportOrder = this.deleteImportOrder.bind(this);
        this.table = null;
    }

    componentWillMount() {
        this.props.importGoodActions.loadImportOrders();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading != this.props.isLoading && !nextProps.isLoading) {
            this.setState({page: nextProps.currentPage});
        }
    }

    postsImportOrders(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.importGoodActions.loadImportOrders(this.state.page, value, this.state.time.startTime,
                this.state.time.endTime, this.state.status, this.state.staff);
        }.bind(this), 500);

    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.importGoodActions.loadImportOrders(this.state.page, this.state.search, time.startTime, time.endTime,
                this.state.status, this.state.staff);
            this.setState({time: time, page: 1});
        } else {
            this.setState({time: time});
        }
    }

    changeStatus(value) {
        let status = value && value.value ? value.value : "";
        this.setState({status: status, page: 1});
        this.props.importGoodActions.loadImportOrders(1, this.state.search, this.state.time.startTime,
            this.state.time.endTime, status, this.state.staff);
    }

    changeStaff(value) {
        let staff = value && value.value ? value.value : "";
        this.setState({staff: staff, page: 1});
        this.props.importGoodActions.loadImportOrders(1, this.state.search, this.state.time.startTime,
            this.state.time.endTime, this.state.status, staff);
    }

    loadImportGoods(page) {
        this.setState({page});
        this.props.importGoodActions.loadImportOrders(page, this.state.search, this.state.time.startTime,
            this.state.time.endTime, this.state.status, this.state.staff);
    }

    loadStaffs(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            importGoodsApi.searchStaffs(input).then(res => {
                let staffs = res.data.data.staffs.map((staff) => {
                    return {
                        ...staff,
                        ...{
                            value: staff.id,
                            label: staff.name + (!helper.isEmptyInput(staff.phone) ? ` (${staff.phone})` : ""),
                        }
                    };
                });
                callback(null, {options: staffs, complete: true});
            });
        }.bind(this), 500);
    }

    setTable(table) {
        this.table = table;
    }

    deleteImportOrder(importOrder) {
        this.props.importGoodActions.deleteImportOrder(importOrder.id);
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa phiếu nhập này không ?", () => {
            this.props.importGoodActions.deleteImportOrder(importOrder.id, this.state.page, this.state.search, this.state.time.startTime,
                this.state.time.endTime, this.state.status, this.state.staff);
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Link
                            className="btn btn-rose"
                            to="/good/import-good/create"
                        >
                            Tạo phiếu nhập
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Danh sách phiếu nhập</h4>
                                <div className="row">
                                    <Search
                                        onChange={this.postsImportOrders}
                                        placeholder="Nhập mã đơn hoặc mã/họ tên/SĐT NCC"
                                        className="col-md-12"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="label-control">Tìm theo tình trạng</label>
                                            <ReactSelect
                                                name="form-field-name"
                                                value={this.state.status}
                                                options={STATUS_IMPORT_GOODS}
                                                onChange={this.changeStatus}
                                                placeholder="Chọn tình trạng"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="label-control">Tìm theo nhân viên bán hàng</label>
                                            <ReactSelect.Async
                                                loadOptions={this.loadStaffs}
                                                loadingPlaceholder="Đang tải..."
                                                placeholder="Chọn nhân viên"
                                                searchPromptText="Không có dữ liệu nhân viên"
                                                onChange={this.changeStaff}
                                                value={this.state.staff}
                                            />
                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Từ ngày"
                                            name="startTime"
                                            updateFormData={this.updateFormDate}
                                            id="form-start-time"
                                            value={this.state.time.startTime}
                                            maxDate={this.state.time.endTime}
                                        />
                                    </div>
                                    <div className="col-md-3">
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
                                <br/>

                                {this.props.isLoading ? <Loading/> :
                                    <ListImported
                                        setTable={this.setTable}
                                        importOrders={this.props.importOrders}
                                        deleteImportOrder={this.deleteImportOrder}
                                    />
                                }
                                <Pagination
                                    currentPage={this.state.page}
                                    loadDataPage={this.loadImportGoods}
                                    totalPages={this.props.totalPages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ImportGoodsContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    importOrders: PropTypes.array.isRequired,
    importGoodActions: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.importGoods.isLoading,
        importOrders: state.importGoods.importOrders,
        totalPages: state.importGoods.totalPages,
        currentPage: state.importGoods.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportGoodsContainer);
