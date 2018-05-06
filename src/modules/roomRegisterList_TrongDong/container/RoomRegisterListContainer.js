import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "../../../components/common/Search";
//import { Tooltip, OverlayTrigger } from "react-bootstrap";
import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import PropTypes from "prop-types";
import Select from "react-select";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import SelectCommon from "../../../components/common/Select";
import { Panel } from "react-bootstrap";
import TooltipButton from '../../../components/common/TooltipButton';
//import * as helper from "../../../helpers/helper";
import ListRegisters from './ListRegisters';
import AddBookingModal from './AddBookingModal';

class RoomRegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
            showAddBookingModal: false,
        };
        this.timeOut = null;

        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.openPaymentModal = this.openPaymentModal.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.openBookingModal = this.openBookingModal.bind(this);
        this.closeBookingModal = this.closeBookingModal.bind(this);
    }

    componentWillMount() {

        this.props.registerManageMeetingRoomAction.loadRooms();
        this.props.registerManageMeetingRoomAction.loadAllSalers();
        this.props.registerManageMeetingRoomAction.loadAllBases();
        this.props.registerManageMeetingRoomAction.loadAllCampaigns();
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
                key: -1,
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
                value: -1,
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

    openBookingModal() {
        this.setState({ showAddBookingModal: true });
    }

    closeBookingModal() {
        this.setState({ showAddBookingModal: false });
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;

        return (
            <div id="page-wrapper">
                <AddBookingModal
                    show={this.state.showAddBookingModal}
                    onHide={this.closeBookingModal}
                    reload={() => this.props.registerManageMeetingRoomAction.loadAllRegisters(this.state.filter)}
                />
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
                                                type="button" onClick={this.openBookingModal}>
                                                <strong>+</strong>
                                            </button>
                                        </div>
                                        <div>
                                            <TooltipButton text="Lọc" placement="top">
                                                <button
                                                    className="btn btn-rose"
                                                    onClick={this.openFilterPanel}
                                                    style={{
                                                        borderRadius: 30,
                                                        padding: "0px 11px",
                                                        margin: "-1px 10px",
                                                        minWidth: 25,
                                                        height: 25,
                                                        width: "100%",
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
                                        <ListRegisters
                                            registers={this.props.registers}
                                            isLoading={this.props.isLoading}
                                            filterBySaler={() => { }}
                                            openPaymentModal={this.openPaymentModal}
                                        />
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
    isLoadingCampaignFilter: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    registers: PropTypes.array.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    salers: PropTypes.array.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoadingSalers: PropTypes.bool.isRequired,
    campaigns: PropTypes.array.isRequired,
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
        isLoadingCampaignFilter: state.registerManageMeetingRoom.isLoadingSalers,
        bases: state.registerManageMeetingRoom.bases,
        campaigns: state.registerListManage.campaigns,
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
