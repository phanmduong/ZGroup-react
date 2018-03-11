import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "../../components/common/Search";
import ListOrder from "./ListOrder";
import * as registerManageRoomAction from "./registerManageRoomAction";
import PropTypes from "prop-types";
import Select from "react-select";
import Pagination from "../../components/common/Pagination";
import { REGISTER_STATUS } from "../../constants/constants";
import XLSX from "xlsx";
import { saveWorkBookToExcel } from "../../helpers/helper";
import { loadAllRegistersApi } from "./registerManageRoomApi";
import SelectMonthBox from "../../components/common/SelectMonthBox";
import Loading from "../../components/common/Loading";
import SelectCommon from "../../components/common/Select";
import { Panel } from "react-bootstrap";
// import * as chooseSeatActions from "./chooseSeat/chooseSeatActions";

class RegisterManageRoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            saler_id: null,
            status: null,
            campaign_id: null,
            limit: 10,

            selectBaseId: 0,
            bases: [],
            isShowMonthBox: false,
            openFilterPanel: false,
            time: {
                startTime: "",
                endTime: "",
            },
            month: { year: 0, month: 0 },
        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.salersSearchChange = this.salersSearchChange.bind(this);
        this.filterByCampaign = this.filterByCampaign.bind(this);
        this.filterBySaler = this.filterBySaler.bind(this);
        this.exportRegistersResultExcel = this.exportRegistersResultExcel.bind(
            this,
        );
        this.filterByStatus = this.filterByStatus.bind(this);

        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDismiss = this.handleAMonthDismiss.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.openChooseSeatModal = this.openChooseSeatModal.bind(this);
    }

    componentWillMount() {
        this.props.registerManageRoomAction.loadAllRegisters();
        // this.props.registerManageRoomAction.getAllStaffs();
        this.props.registerManageRoomAction.getAllSalers();
        this.props.registerManageRoomAction.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.isLoadingBases !== this.props.isLoadingBases &&
            !nextProps.isLoadingBases
        ) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
        }
    }

    openChooseSeatModal(base, register) {
        this.props.chooseSeatActions.toggleShowChooseSeatModal(true, base, register);
    }

    handleClickMonthBox() {
        this.setState({ isShowMonthBox: true });
    }

    handleAMonthChange(value) {
        let startTime = value.year + "-" + value.month + "-01";
        let endTime;
        if (value.month !== 12) {
            endTime = value.year + "-" + (value.month + 1) + "-01";
        } else endTime = value.year + 1 + "-01" + "-01";
        this.props.registerManageRoomAction.loadAllRegisters(
            this.state.limit,
            this.state.page,
            this.state.query,
            this.state.saler_id,
            this.state.status,
            this.state.campaign_id,
            this.state.selectBaseId,
            startTime,
            endTime,
            () => this.setState({ month: value }),
        );
        let time = { ...this.state.time };
        time["startTime"] = startTime;
        time["endTime"] = endTime;
        this.setState({time: time});
        this.handleAMonthDismiss();
    }

    handleAMonthDismiss() {
        this.setState({isShowMonthBox: false});
    }

    getBases(bases) {
        let baseData = bases.map(function(base) {
            return {
                key: base.id,
                value: base.name,
            };
        });
        this.setState({ selectBaseId: 0 });
        return [
            {
                key: 0,
                value: "Tất cả",
            },
            ...baseData,
        ];
    }

    onChangeBase(value) {
        this.setState({ selectBaseId: value });
        this.props.registerManageRoomAction.loadAllRegisters(
            this.state.limit,
            this.state.page,
            this.state.query,
            this.state.saler_id,
            this.state.status,
            this.state.campaign_id,
            value,
            this.state.startTime,
            this.state.endTime,
        );
    }

    openFilterPanel() {
        let newstatus = !this.state.openFilterPanel;
        this.setState({ openFilterPanel: newstatus });
    }

    async exportRegistersResultExcel() {
        this.props.registerManageRoomAction.showGlobalLoading();
        const res = await loadAllRegistersApi(
            -1,
            this.state.page,
            this.state.query,
            this.state.saler_id,
            this.state.status,
            this.state.campaign_id,
            this.state.selectBaseId,
            this.state.startTime,
            this.state.endTime,
        );
        this.props.registerManageRoomAction.hideGlobalLoading();
        const wsData = res.data.data.room_service_registers;
        const field = [];
        field[0] = "Tên";
        field[1] = "Email";
        field[2] = "Số điện thoại";
        field[3] = "Ngày đăng kí";
        field[4] = "Saler";
        field[5] = "Chiến dịch";
        const datas = wsData.map(data => {
            let tmp = [];
            tmp[0] = data.user.name;
            tmp[1] = data.user.email || "Chưa có";
            tmp[2] = data.user.phone || "Chưa có";
            tmp[3] = data.created_at || "Chưa có";
            tmp[4] = (data.saler && data.saler.name) || "Không có";
            tmp[5] = (data.campaign && data.campaign.name) || "Không có";
            return tmp;
        });
        const tmpWsData = [field, ...datas];
        const ws = XLSX.utils.aoa_to_sheet(tmpWsData);
        const sheetName = "Danh sách đăng kí đặt phòng";
        let workbook = {
            SheetNames: [],
            Sheets: {},
        };
        workbook.SheetNames.push(sheetName);
        workbook.Sheets[sheetName] = ws;
        saveWorkBookToExcel(workbook, "Danh sách đăng kí đặt phòng");
    }

    registersSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function() {
                this.props.registerManageRoomAction.loadAllRegisters(
                    this.state.limit,
                    1,
                    value,
                    this.state.saler_id,
                    this.state.status,
                    this.state.campaign_id,
                    this.state.selectBaseId,
                    this.state.startTime,
                    this.state.endTime,
                );
            }.bind(this),
            500,
        );
    }

    salersSearchChange(value) {
        if (value) {
            this.setState({
                saler_id: value.value,
                page: 1,
            });
            this.props.registerManageRoomAction.loadAllRegisters(
                this.state.limit,
                1,
                this.state.query,
                value.value,
                this.state.status,
                this.state.campaign_id,
                this.state.selectBaseId,
                this.state.startTime,
                this.state.endTime,
            );
        } else {
            this.setState({
                saler_id: null,
                page: 1,
            });
            this.props.registerManageRoomAction.loadAllRegisters(
                this.state.limit,
                1,
                this.state.query,
                null,
                this.state.status,
                this.state.campaign_id,
                this.state.selectBaseId,
                this.state.startTime,
                this.state.endTime,
            );
        }
    }

    filterByStatus(value) {
        if (value) {
            this.setState({
                status: value.value,
                page: 1,
            });
            this.props.registerManageRoomAction.loadAllRegisters(
                this.state.limit,
                1,
                this.state.query,
                this.state.saler_id,
                value.value,
            );
        } else {
            this.setState({
                status: null,
                page: 1,
            });
            this.props.registerManageRoomAction.loadAllRegisters(
                this.state.limit,
                1,
                this.state.query,
                this.state.saler_id,
                null,
            );
        }
    }

    filterByCampaign(campaign_id) {
        this.setState({ campaign_id: campaign_id });
        this.props.registerManageRoomAction.loadAllRegisters(
            this.state.limit,
            this.state.page,
            this.state.query,
            this.state.saler_id,
            this.state.status,
            campaign_id,
            this.state.selectBaseId,
            this.state.startTime,
            this.state.endTime,
        );
    }

    filterBySaler(saler_id) {
        this.setState({ saler_id: saler_id });
        this.props.registerManageRoomAction.loadAllRegisters(
            this.state.limit,
            1,
            "",
            saler_id,
            this.state.status,
            this.state.campaign_id,
            this.state.selectBaseId,
            this.state.startTime,
            this.state.endTime,
        );
    }

    loadOrders(page = 1) {
        this.setState({ page: page });
        this.props.registerManageRoomAction.loadAllRegisters(
            this.state.limit,
            page,
            this.state.query,
            this.state.saler_id,
            this.state.status,
            this.state.campaign_id,
            this.state.selectBaseId,
            this.state.startTime,
            this.state.endTime,
        );
    }

    closeModal() {
        this.setState({
            showModal: false,
        });
    }

    render() {
        let SALER  = this.props.salers.map(
            saler => {
                return {
                    ...saler, value: saler.id,
                    label: saler.name,};
            },
        );
        SALER = [{value : 0, label : "Tất cả"},...SALER];
        let first = this.props.totalCount
            ? (this.props.currentPage - 1) * this.props.limit + 1
            : 0;
        let end =
            this.props.currentPage < this.props.totalPages
                ? this.props.currentPage * this.props.limit
                : this.props.totalCount;
        return (
            <div id="page-wrapper">
                {this.props.isLoadingBases ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-sm-3 col-xs-5">
                                <SelectMonthBox
                                    theme="light"
                                    isHide={false}
                                    value={this.state.month}
                                    onChange={this.handleAMonthChange}
                                    isAuto={false}
                                    isShowMonthBox={this.state.isShowMonthBox}
                                    openBox={this.handleClickMonthBox}
                                    closeBox={this.handleAMonthDismiss}
                                />
                            </div>
                            <div className="col-sm-3 col-xs-5">
                                <SelectCommon
                                    defaultMessage={"Chọn cơ sở"}
                                    options={this.state.bases}
                                    disableRound
                                    value={this.state.selectBaseId}
                                    onChange={this.onChangeBase}
                                />
                            </div>
                            <div className="col-sm-2 col-xs-5">
                                <button
                                    style={{ width: "100%" }}
                                    onClick={this.openFilterPanel}
                                    className="btn btn-info btn-rose "
                                >
                                    <i className="material-icons">
                                        filter_list
                                    </i>
                                    Lọc
                                </button>
                            </div>
                            <div className="col-sm-4 col-xs-5">
                                <button
                                    onClick={this.exportRegistersResultExcel}
                                    className="btn btn-info btn-rose"
                                    style={{ float: "right" }}
                                >
                                    <i className="material-icons">
                                        file_download
                                    </i>
                                    Xuất ra Excel
                                </button>
                            </div>
                        </div>

                        <Panel
                            collapsible
                            expanded={this.state.openFilterPanel}
                        >

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div
                                            className="card-header card-header-icon"
                                            data-background-color="rose"
                                        >
                                            <i className="material-icons">
                                                filter_list
                                            </i>
                                        </div>
                                        <div className="card-content">
                                            <h4 className="card-title">
                                                Bộ lọc
                                            </h4>
                                            <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">
                                                                Tìm theo saler
                                                            </label>
                                                            <Select
                                                                value={this.state.saler_id}
                                                                options={SALER}
                                                                onChange={this.salersSearchChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">
                                                                Tìm theo trạng
                                                                thái
                                                            </label>
                                                            <Select
                                                                value={this.state.status}
                                                                options={REGISTER_STATUS}
                                                                onChange={this.filterByStatus}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"
                                style={{ zIndex: 0 }}>
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Danh sách đơn hàng</h4>
                                <div>
                                    <Search
                                        onChange={this.registersSearchChange}
                                        value={this.state.query}
                                        placeholder="Nhập mã đăng ký hoặc tên khách hàng"
                                    />
                                    <ListOrder
                                        openChooseSeatModal={this.openChooseSeatModal}
                                        registers={this.props.registers}
                                        isLoading={this.props.isLoading}
                                        filterBySaler={this.filterBySaler}
                                        filterByCampaign={this.filterByCampaign}
                                    />
                                    <div className="row float-right">
                                        <div className="col-md-12" style={{ textAlign: "right" }}>
                                            <b style={{ marginRight: "15px" }}>
                                                Hiển thị kêt quả từ {first} -{" "}
                                                {end}/{this.props.totalCount}
                                            </b>
                                            <br />
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
                )}
            </div>
        );
    }
}

RegisterManageRoomContainer.propTypes = {
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    registers: PropTypes.array.isRequired,
    registerManageRoomAction: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    salers: PropTypes.array.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    chooseSeatActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.registerManageRoom.isLoading,
        totalPages: state.registerManageRoom.totalPages,
        registers: state.registerManageRoom.registers,
        limit: state.registerManageRoom.limit,
        totalCount: state.registerManageRoom.totalCount,
        currentPage: state.registerManageRoom.currentPage,
        salers: state.registerManageRoom.salers,
        isLoadingBases: state.registerManageRoom.isLoadingBases,
        bases: state.registerManageRoom.bases,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // chooseSeatActions: bindActionCreators(chooseSeatActions, dispatch),
        registerManageRoomAction: bindActionCreators(
            registerManageRoomAction,
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    RegisterManageRoomContainer,
);
