import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "../../../components/common/Search";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import PropTypes from "prop-types";
import Select from "react-select";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import SelectCommon from "../../../components/common/Select";
import { Panel } from "react-bootstrap";
import TooltipButton from '../../../components/common/TooltipButton';
import * as helper from "../../../helpers/helper";

class RoomRegisterListContainer extends React.Component {
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
            openFilterPanel: false,
            time: {
                startTime: "",
                endTime: "",
            },
            filter: {
                saler_id: null,
                base_id: 0,
                query: '',
                page: 1,
            },
        };
        this.timeOut = null;

        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.openPaymentModal = this.openPaymentModal.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    componentWillMount() {
        //this.props.registerManageMeetingRoomAction.loadAllSalers();
        this.props.registerManageMeetingRoomAction.loadAllBases();
        this.props.registerManageMeetingRoomAction.loadAllRegisters();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                base_id: 0,
                bases: this.getBaseData(nextProps.bases),
            });
        }
        if (nextProps.isLoadingSalers !== this.props.isLoadingSalers && !nextProps.isLoadingSalers) {
            this.setState({
                saler_id: 0,
                salers: this.getSalerData(nextProps.salers),
            });
        }
    }

    getBaseData(datas) {
        let selectData = datas.map(function (data) {
            return {
                key: data.id,
                value: data.name,
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả cơ sở",
            },
            ...selectData,
        ];
    }
    getSalerData(datas) {
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




    openFilterPanel() {
        let newstatus = !this.state.openFilterPanel;
        this.setState({ openFilterPanel: newstatus });
    }

    filterChange(name, value) {
        let filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({ filter });
        this.props.registerManageMeetingRoomAction.loadAllRegisters(filter);
    }


    registersSearchChange(query) {
        let filter = { ...this.state.filter, page: 1, query };
        this.setState({ filter });

        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.registerManageMeetingRoomAction.loadAllRegisters(filter);
        }.bind(this), 500, );
    }





    openPaymentModal(register) {
        this.props.registerManageMeetingRoomAction.openPaymentModal(register);
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        const TopupTooltip = <Tooltip id="tooltip">Thu tiền</Tooltip>;
        return (
            <div id="page-wrapper">
                {this.props.isLoadingBases || this.props.isLoadingSalers ? (
                    <Loading />
                ) : (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <SelectCommon
                                        defaultMessage={"Chọn cơ sở"}
                                        options={this.state.bases}
                                        value={this.state.base_id}
                                        onChange={(id) => this.filterChange('base_id', id)}
                                    />
                                </div>
                            </div>



                            <div className="card">
                                <div className="card-content">
                                    <div className="flex-row flex">
                                        <h4 className="card-title"><b>Danh sách đăng kí phòng họp</b></h4>
                                        <div>
                                            <button
                                                className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                type="button" onClick={() => { }}>
                                                <strong>+</strong>
                                            </button>
                                        </div>
                                        <div>
                                            <TooltipButton text="Lọc" placement="top">
                                                <button style={{ width: "100%" }}
                                                    className="btn btn-rose"
                                                    onClick={this.openFilterPanel}
                                                    style={{
                                                        borderRadius: 30,
                                                        padding: "0px 11px",
                                                        margin: "-1px 10px",
                                                        minWidth: 25,
                                                        height: 25,
                                                    }}
                                                >
                                                    <i className="material-icons"
                                                        style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                    >filter_list</i>
                                                </button>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div>
                                        <Panel collapsible expanded={this.state.openFilterPanel}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label className="label-control">Tìm theo saler</label>
                                                            <Select
                                                                value={this.state.saler_id}
                                                                options={this.state.salers}
                                                                onChange={(id) => this.filterChange('saler_id', id)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel>
                                        <Search
                                            onChange={this.registersSearchChange}
                                            value={this.state.query}
                                            placeholder="Nhập tên khách hàng, email hoặc số điện thoại"
                                        />
                                        <div className="table-responsive">
                                            {this.props.isLoading ? (
                                                <Loading />
                                            ) : (
                                                    <table className="table table-hover">
                                                        <thead className="text-rose">
                                                            <tr>
                                                                <th>Khách hàng</th>
                                                                <th>Số điện thoại</th>
                                                                <th>Saler</th>
                                                                <th>Tiền đã trả</th>
                                                                <th>Bắt đầu dự kiến</th>
                                                                <th>Kết thúc dự kiến</th>
                                                                <th>Bắt đầu chính thức</th>
                                                                <th>Kết thúc chính thức</th>
                                                                <th>Đăng ký</th>
                                                                <th>Thời gian còn lại</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.props.registers.map((register, ) => {
                                                                return (
                                                                    <tr key={register.id}>
                                                                        <td>
                                                                            <a className="text-name-student-register">
                                                                                {register.user && register.user.name}
                                                                            </a>
                                                                        </td>
                                                                        <td>
                                                                            <a href={"tel:" + register.phone}
                                                                                className="text-name-student-register"
                                                                            >
                                                                                {register.user && register.user.phone
                                                                                    ? helper.formatPhone(register.user.phone) : "Chưa có"}
                                                                            </a>
                                                                        </td>
                                                                        <td>
                                                                            {register.saler ? (
                                                                                <a
                                                                                    className="btn btn-xs btn-main"
                                                                                    onClick={e => {
                                                                                        this.props.filterBySaler(register.saler.id, );
                                                                                        e.preventDefault();
                                                                                    }}
                                                                                    style={{
                                                                                        backgroundColor: register.saler.color && "#" + register.saler.color,
                                                                                    }}
                                                                                >
                                                                                    {register.saler.name}
                                                                                </a>
                                                                            ) : (
                                                                                    <a className="btn btn-xs btn-main disabled">Chưa có</a>
                                                                                )}
                                                                        </td>
                                                                        <td>
                                                                            {helper.dotNumber(register.money)}đ
                                    </td>
                                                                        <td>{register.start_time}</td>
                                                                        <td>{register.end_time}</td>

                                                                        <td>
                                                                            <a className="text-name-student-register"
                                                                                onClick={() => this.openDatetimeModal(register)}
                                                                            >
                                                                                {register.official_start_time}
                                                                            </a>
                                                                        </td>
                                                                        <td>
                                                                            <a className="text-name-student-register"
                                                                                onClick={() => this.openDatetimeModal(register)}
                                                                            >
                                                                                {register.official_end_time}
                                                                            </a>

                                                                        </td>
                                                                        <td>{register.created_at}</td>
                                                                        <td>
                                                                            {
                                                                                <OverlayTrigger placement="top"
                                                                                    overlay={TopupTooltip}>
                                                                                    <a
                                                                                        onClick={() => this.openPaymentModal(register)}
                                                                                    >
                                                                                        <i className="material-icons">attach_money</i>
                                                                                    </a>
                                                                                </OverlayTrigger>

                                                                            }

                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                )}
                                        </div>
                                        <div className="row float-right">
                                            <div className="col-md-12"
                                                style={{ textAlign: "right" }}
                                            >
                                                <b style={{ marginRight: "15px" }}>Hiển thị kêt quả từ {first} -{" "}{end}/{this.props.totalCount}</b><br />
                                                <Pagination
                                                    totalPages={this.props.totalPages}
                                                    currentPage={this.props.currentPage}
                                                    loadDataPage={page => this.filterChange('page', page)}
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

RoomRegisterListContainer.propTypes = {
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
    bases: PropTypes.array.isRequired,
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
        bases: state.registerManageMeetingRoom.bases,
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
    RoomRegisterListContainer,
);
