import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Search from "../../../components/common/Search";
import ListRegisters from "../component/ListRegisters";
import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import PropTypes from "prop-types";
import Select from "react-select";
import Pagination from "../../../components/common/Pagination";
// import XLSX from "xlsx";
// import {saveWorkBookToExcel} from "../../../helpers/helper";
// import {loadAllRegistersApi} from "../apis/registerManageMeetingRoomApi";
import SelectMonthBox from "../../../components/common/SelectMonthBox";
import Loading from "../../../components/common/Loading";
import SelectCommon from "../../../components/common/Select";
import {OverlayTrigger, Panel, Tooltip} from "react-bootstrap";
import DatetimeModal from "./DatetimeModal";
import PaymentModal from "./PaymentModal";
import AddRegisterModal from "./AddRegisterModal";

function getBaseData(datas) {
    let selectData = datas.map(function (data) {
        return {
            key: data.id,
            value: data.name,
        };
    });
    return [
        {
            key: 0,
            value: "Tất cả",
        },
        ...selectData,
    ];
}

function getSalerData(datas) {
    let selectData = datas.map(function (data) {
        return {
            value: data.id,
            label: data.name,
        };
    });
    return [
        {
            value: 0,
            label: "Tất cả",
        },
        ...selectData,
    ];
}

class RegisterManageRoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            saler_id: null,
            limit: 10,
            base_id: 0,
            bases: [],
            salers: [],
            isShowMonthBox: false,
            openFilterPanel: false,
            time: {
                startTime: "",
                endTime: "",
            },
            month: {year: 0, month: 0},
            disableCreateRegister : false,
        };
        this.timeOut = null;
        this.loadAllRegisters = this.loadAllRegisters.bind(this);
        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.salersSearchChange = this.salersSearchChange.bind(this);
        this.filterBySaler = this.filterBySaler.bind(this);
        // this.exportRegistersResultExcel = this.exportRegistersResultExcel.bind(
        //     this,
        // );
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDismiss = this.handleAMonthDismiss.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.openPaymentModal = this.openPaymentModal.bind(this);
    }

    componentWillMount() {
        this.props.registerManageMeetingRoomAction.loadAllSalers();
        this.props.registerManageMeetingRoomAction.loadAllBases();
        // this.props.registerManageMeetingRoomAction.loadAllRegisters(
        //     this.state.limit,
        //     this.state.page,
        //     this.state.query,
        //     this.state.saler_id,
        //     this.props.user.base_id,
        //     this.state.startTime,
        //     this.state.endTime,);
        this.props.registerManageMeetingRoomAction.loadCampaigns();
        this.props.registerManageMeetingRoomAction.loadRooms();
        this.onChangeBase(this.props.user.base_id);
        // console.log(this.props.user.base_id,"xxxxxxxxx");
    }
    componentDidMount(){
        this.onChangeBase(this.props.user.base_id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                base_id: 0,
                bases: getBaseData(nextProps.bases),
            });
        }
        if (nextProps.isLoadingSalers !== this.props.isLoadingSalers && !nextProps.isLoadingSalers) {
            this.setState({
                saler_id: 0,
                salers: getSalerData(nextProps.salers),
            });
        }
    }


    onChangeBase(value) {
        this.props.registerManageMeetingRoomAction.loadAllRegisters(
            this.state.limit,
            this.state.page,
            this.state.query,
            this.state.saler_id,
            value,
            this.state.startTime,
            this.state.endTime,
            () => {
                this.setState({base_id: value});
                this.setState({disableCreateRegister : !(
                        this.props.user.base_id == value ||
                        this.props.user.base_id <= 0
                    )});
            }
        );
    }


    salersSearchChange(value) {
        if (value) {
            this.setState({
                saler_id: value.value,
                page: 1,
            });
            this.props.registerManageMeetingRoomAction.loadAllRegisters(
                this.state.limit,
                1,
                this.state.query,
                value.value,
                this.state.base_id,
                this.state.startTime,
                this.state.endTime,
            );
        } else {
            this.setState({
                saler_id: null,
                page: 1,
            });
            this.props.registerManageMeetingRoomAction.loadAllRegisters(
                this.state.limit,
                1,
                this.state.query,
                null,
                this.state.base_id,
                this.state.startTime,
                this.state.endTime,
            );
        }
    }


    filterBySaler(saler_id) {
        this.setState({saler_id: saler_id});
        this.props.registerManageMeetingRoomAction.loadAllRegisters(
            this.state.limit,
            1,
            "",
            saler_id,
            this.state.base_id,
            this.state.startTime,
            this.state.endTime,
        );
    }


    handleClickMonthBox() {
        this.setState({isShowMonthBox: true});
    }

    handleAMonthChange(value) {
        let startTime = value.year + "-" + value.month + "-01";
        let endTime;
        if (value.month !== 12) {
            endTime = value.year + "-" + (value.month + 1) + "-01";
        } else endTime = value.year + 1 + "-01" + "-01";
        this.props.registerManageMeetingRoomAction.loadAllRegisters(
            this.state.limit,
            this.state.page,
            this.state.query,
            this.state.saler_id,
            this.state.base_id,
            startTime,
            endTime,
            () => this.setState({month: value}),
        );
        let time = {...this.state.time};
        time["startTime"] = startTime;
        time["endTime"] = endTime;
        this.setState({time: time});
        this.handleAMonthDismiss();
    }

    handleAMonthDismiss() {
        this.setState({isShowMonthBox: false});
    }

    openFilterPanel() {
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
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
            function () {
                this.props.registerManageMeetingRoomAction.loadAllRegisters(
                    this.state.limit,
                    1,
                    value,
                    this.state.saler_id,
                    this.state.base_id,
                    this.state.startTime,
                    this.state.endTime,
                );
            }.bind(this),
            500,
        );
    }


    loadAllRegisters(page = 1) {
        this.setState({page: page});
        this.props.registerManageMeetingRoomAction.loadAllRegisters(
            this.state.limit,
            page,
            this.state.query,
            this.state.saler_id,
            this.state.base_id,
            this.state.startTime,
            this.state.endTime,
        );
    }


    openPaymentModal(register) {
        this.props.registerManageMeetingRoomAction.openPaymentModal(register);
    }

    render() {
        // console.log("aaaaaaaaaa",this.state.bases,this.state.base_id);
        const Filter = <Tooltip id="tooltip">Lọc</Tooltip>;
        const Add = <Tooltip id="tooltip">Thêm đăng kí</Tooltip>;
        let first = this.props.totalCount
            ? (this.props.currentPage - 1) * this.props.limit + 1
            : 0;
        let end =
            this.props.currentPage < this.props.totalPages
                ? this.props.currentPage * this.props.limit
                : this.props.totalCount;
        return (
            <div id="page-wrapper">
                {this.props.isLoadingBases || this.props.isLoadingSalers || this.props.isLoadingRooms || this.props.isLoadingCampaigns ? (
                    <Loading/>
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
                                    value={this.state.base_id}
                                    onChange={this.onChangeBase}
                                />
                            </div>

                            {/*<div className="col-sm-4 col-xs-5">*/}
                            {/*<button*/}
                            {/*onClick={this.exportRegistersResultExcel}*/}
                            {/*className="btn btn-info btn-rose"*/}
                            {/*style={{float: "right"}}*/}
                            {/*>*/}
                            {/*<i className="material-icons">file_download</i>*/}
                            {/*Xuất ra Excel*/}
                            {/*</button>*/}
                            {/*</div>*/}
                        </div>


                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <div style={{display: "flex"}}>
                                            <h4 className="card-title">
                                                <strong>Danh sách đăng kí phòng họp</strong>
                                            </h4>
                                            <div>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={Add}
                                                >
                                                    <button
                                                        className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                        type="button" onClick={
                                                        (e) => {
                                                            e.preventDefault();
                                                            this.props.registerManageMeetingRoomAction.openAddRegisterModal(this.state.disableCreateRegister);
                                                        }}>
                                                        <strong>+</strong>
                                                    </button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={Filter}
                                                >
                                                    <button
                                                        className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                        onClick={this.openFilterPanel}
                                                    >
                                                        <i className="material-icons"
                                                           style={{margin: "0px -4px", top: 0}}
                                                        >
                                                            filter_list
                                                        </i>
                                                    </button>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        {/*<div>*/}
                                        {/*<OverlayTrigger*/}
                                        {/*placement="top"*/}
                                        {/*overlay={Export}*/}
                                        {/*>*/}
                                        {/*<button*/}
                                        {/*className="btn btn-primary btn-round btn-xs button-add none-margin "*/}
                                        {/*onClick={this.exportRegistersResultExcel}*/}
                                        {/*>*/}
                                        {/*<i className="material-icons"*/}
                                        {/*style={{margin: "0px -4px", top: 0}}*/}
                                        {/*>*/}
                                        {/*file_download*/}
                                        {/*</i>*/}
                                        {/*</button>*/}
                                        {/*</OverlayTrigger>*/}
                                        {/*</div>*/}
                                    </div>
                                    <Search
                                        onChange={this.registersSearchChange}
                                        value={this.state.query}
                                        placeholder="Nhập tên khách hàng, email hoặc số điện thoại"
                                    />
                                    <Panel
                                        collapsible
                                        expanded={this.state.openFilterPanel}
                                    >
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label className="label-control">Tìm theo saler</label>
                                                <Select
                                                    value={this.state.saler_id}
                                                    options={this.state.salers}
                                                    onChange={this.salersSearchChange}
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                    <ListRegisters
                                        disableCreateRegister = {this.state.disableCreateRegister}
                                        registers={this.props.registers}
                                        isLoading={this.props.isLoading}
                                        filterBySaler={this.filterBySaler}
                                        openPaymentModal={this.openPaymentModal}
                                    />
                                    <div className="row float-right">
                                        <div className="col-md-12"
                                             style={{textAlign: "right"}}
                                        >
                                            <b style={{marginRight: "15px"}}>
                                                Hiển thị kêt quả từ {first} -{" "}
                                                {end}/{this.props.totalCount}
                                            </b>
                                            <br/>
                                            <Pagination
                                                totalPages={this.props.totalPages}
                                                currentPage={this.props.currentPage}
                                                loadDataPage={this.loadAllRegisters}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DatetimeModal/>
                        <PaymentModal/>
                        <AddRegisterModal
                            base_id = {this.state.base_id}
                            disableCreateRegister = {this.state.disableCreateRegister}
                        />
                        {/*<ConfirmModal/>*/}
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
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    salers: PropTypes.array.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoadingSalers: PropTypes.bool.isRequired,
    isLoadingRooms: PropTypes.bool.isRequired,
    isLoadingCampaigns: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.registerManageMeetingRoom.isLoading,
        totalPages: state.registerManageMeetingRoom.totalPages,
        registers: state.registerManageMeetingRoom.registers,
        limit: state.registerManageMeetingRoom.limit,
        totalCount: state.registerManageMeetingRoom.totalCount,
        currentPage: state.registerManageMeetingRoom.currentPage,
        salers: state.registerManageMeetingRoom.salers,
        isLoadingBases: state.registerManageMeetingRoom.isLoadingBases,
        isLoadingSalers: state.registerManageMeetingRoom.isLoadingSalers,
        isLoadingRooms: state.registerManageMeetingRoom.isLoadingRooms,
        isLoadingCampaigns: state.registerManageMeetingRoom.isLoadingCampaigns,
        bases: state.registerManageMeetingRoom.bases,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageMeetingRoomAction: bindActionCreators(
            registerManageMeetingRoomAction,
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    RegisterManageRoomContainer,
);
