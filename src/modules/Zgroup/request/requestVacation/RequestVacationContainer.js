import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActions from "../requestActions";
import * as PropTypes from "prop-types";
import Loading from "../../../../components/common/Loading";
import ButtonGroupAction from "../../../../components/common/ButtonGroupAction";
import Pagination from "../../../../components/common/Pagination";
import { Link } from "react-router";
import RequestVacationConfirmModal from "./RequestVacationConfirmModal";
import moment from "moment";
import { Modal, Panel } from 'react-bootstrap';
import ReactSelect from 'react-select';
import FormInputText from "../../../../components/common/FormInputText";
import FormInputDate from "../../../../components/common/FormInputDate";
import TooltipButton from "../../../../components/common/TooltipButton";
import * as helper from "../../../../helpers/helper";
//import * as helper from "../../../../helpers/helper";

class RequestVacationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showConfirmModal: false,
            showInfoModal: false,
            currentRequest: {
                staff: {},
            },
            showLoadingModal: false,
            showPanel: false,
            filter: {
                start_time: "",
                end_time: "",
                status: null,
                staff_name: "",
                command_code: "",
                page: 1,
                type: "",
            },
        };
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.submitConfirmModal = this.submitConfirmModal.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.openLoadingModal = this.openLoadingModal.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onTextFilterChange = this.onTextFilterChange.bind(this);
        this.onDateFilterChange = this.onDateFilterChange.bind(this);
    }

    componentWillMount() {
        let { requestActions } = this.props;
        requestActions.getAllRequestVacation();
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    openConfirmModal(showInfoModal, currentRequest) {
        this.setState({ showConfirmModal: true, currentRequest, showInfoModal });
    }

    closeConfirmModal() {
        this.setState({ showConfirmModal: false });
    }

    submitConfirmModal() {
        this.props.requestActions.confirmRequestVacation(this.state.currentRequest.id,
            () => {
                this.closeConfirmModal();
                this.props.requestActions.getAllRequestVacation(this.state.filter);
            }
        );

    }

    openPanel() {
        let { showPanel } = this.state;
        this.setState({ showPanel: !showPanel });
    }

    openLoadingModal() {
        this.setState({ showLoadingModal: true });
        this.props.requestActions.getRequestVacationNoPaging(this.exportExcel, () => this.setState({ showLoadingModal: false }));
    }



    exportExcel(input) {
        let wb = helper.newWorkBook();
        let data;
        let cols = [{ "wch": 5 }, { "wch": 40 }, { "wch": 25 }, { "wch": 15 }, { "wch": 20 }, { "wch": 20 }, { "wch": 15 }, { "wch": 25 }, { "wch": 15 }, { "wch": 15 }, { "wch": 15 }, { "wch": 15 }, { "wch": 15 }, { "wch": 15 },];//độ rộng cột  

        data = input.reverse().map((item, index) => {

            /* eslint-disable */
            let status = "Chưa duyệt";
            switch (item.status) {
                case 1: {
                    status = "Đã duyệt";
                    break;
                }
            }
            let res = {
                'STT': index + 1,
                'Mã nghỉ phép': item.command_code,
                'Tên nhân viên': item.staff ? item.staff.name : "Không có",
                'Ngày nộp đơn': moment(item.created_at.date).format("D/M/YYYY"),
                'Ngày bắt đầu': moment(item.start_time).format("D/M/YYYY"),
                'Ngày kết thúc': moment(item.end_time).format("D/M/YYYY"),
                'Lý do': item.reason,
                'Hình thức': item.type == "pay" ? "Có lương" : "Không lương",
                'Trạng thái': status,

            };
            /* eslint-enable */
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Danh sách nghỉ phép', cols);

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách nghỉ phép Zgroup');

        this.setState({ showLoadingModal: false });
    }


    onFilterChange(field, value) {
        let filter = { ...this.state.filter };
        if (filter[field] == value) return;
        filter[field] = value ? value : (value == 0 ? value : "");
        if (field != "page") filter.page = this.props.paginator.current_page;
        this.setState({ filter });
        this.props.requestActions.getAllRequestVacation(filter);
    }

    onTextFilterChange(e) {
        let { name, value } = e.target;
        let filter = { ...this.state.filter };
        if (filter[name] == value) return;
        filter[name] = value ? value : (value == 0 ? value : "");
        this.setState({ filter });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.requestActions.getAllRequestVacation(filter);
        }.bind(this), 500);
    }

    onDateFilterChange(e) {
        let { name, value } = e.target;
        this.onFilterChange(name, value);
    }

    render() {
        const filterClass = "col-md-3 col-sm-6 col-xs-6";
        let { isLoading, requestVacations, paginator, user } = this.props;
        let { showConfirmModal, showInfoModal, currentRequest, showLoadingModal, showPanel, filter, } = this.state;
        return (
            <div className="content">
                <RequestVacationConfirmModal
                    show={showConfirmModal}
                    onHide={this.closeConfirmModal}
                    data={currentRequest}
                    submit={this.submitConfirmModal}
                    isInfoModal={showInfoModal}
                />
                <Modal
                    show={showLoadingModal}
                    onHide={() => { }}>
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading /></Modal.Body>
                </Modal>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-content">
                                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <div className="flex-row flex">
                                            <h4 className="card-title"><strong>Danh sách xin nghỉ phép</strong></h4>
                                            <div>
                                                <Link to="/administration/request/vacation/create" className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                    <strong>+</strong>
                                                </Link>

                                            </div>
                                            <div>
                                                <TooltipButton text="Lọc" placement="top">
                                                    <button
                                                        className="btn btn-rose"
                                                        onClick={this.openPanel}
                                                        style={{
                                                            borderRadius: 30,
                                                            padding: "0px 11px",
                                                            margin: "-1px 10px",
                                                            minWidth: 25,
                                                            height: 25,
                                                            width: "55%",
                                                        }}
                                                    >
                                                        <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                        >filter_list</i>
                                                    </button>
                                                </TooltipButton>
                                            </div>
                                        </div>
                                        <div className="flex-end">
                                            <div>
                                                <TooltipButton text="Xuất thành file excel" placement="top">
                                                    <button
                                                        className="btn btn-rose"
                                                        onClick={this.openLoadingModal}
                                                        style={{
                                                            borderRadius: 30,
                                                            padding: "0px 11px",
                                                            margin: "-1px 10px",
                                                            minWidth: 25,
                                                            height: 25,
                                                            width: "55%",
                                                        }}
                                                    >
                                                        <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                        >file_download</i>
                                                    </button>
                                                </TooltipButton>
                                            </div>
                                        </div>
                                    </div>
                                    <Panel collapsible expanded={showPanel} bsStyle="primary">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className={filterClass}>
                                                        <label>Trạng thái</label>
                                                        <ReactSelect
                                                            options={statusFilter || []}
                                                            onChange={(e) => {
                                                                return this.onFilterChange("status", e ? e.id : "");
                                                            }}
                                                            value={filter.status}
                                                            defaultMessage="Chọn"
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                    <div className={filterClass}>
                                                        <label>Lương</label>
                                                        <ReactSelect
                                                            options={typesFilter || []}
                                                            onChange={(e) => {
                                                                return this.onFilterChange("type", e ? e.id : "");
                                                            }}
                                                            value={filter.type}
                                                            defaultMessage="Chọn"
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                    <div className={filterClass}>
                                                        <FormInputText
                                                            name="command_code"
                                                            value={filter.command_code}
                                                            label="Mã hành chính"
                                                            updateFormData={this.onTextFilterChange}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                    <div className={filterClass}>
                                                        <FormInputText
                                                            name="staff_name"
                                                            value={filter.staff_name}
                                                            label="Nhân viên"
                                                            updateFormData={this.onTextFilterChange}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6 col-xs-6">
                                                        <FormInputDate
                                                            name="start_time"
                                                            id="start_time"
                                                            value={filter.start_time}
                                                            label="Từ ngày"
                                                            updateFormData={this.onDateFilterChange}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                    <div className="col-md-3 col-sm-6 col-xs-6">
                                                        <FormInputDate
                                                            name="end_time"
                                                            id="end_time"
                                                            value={filter.end_time}
                                                            label="Đến ngày"
                                                            updateFormData={this.onDateFilterChange}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </Panel>
                                    {
                                        isLoading ? <Loading /> :
                                            <div className="col-md-12">
                                                {
                                                    requestVacations.length == 0 ?
                                                        <div>Chưa có yêu cầu</div>
                                                        :
                                                        <div className="table-responsive">
                                                            <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                                <thead className="text-rose">
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Mã hành chính</th>
                                                                        <th>Ngày yêu cầu</th>
                                                                        <th>Tên nhân viên</th>
                                                                        <th>Lý do xin nghỉ</th>
                                                                        <th>Hình thức</th>
                                                                        <th />
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {requestVacations.map((obj, index) => {
                                                                        let type = "Không có";
                                                                        switch (obj.type) {
                                                                            case "pay": {
                                                                                type = "Có lương";
                                                                                break;
                                                                            }
                                                                            case "nopay": {
                                                                                type = "Không lương";
                                                                                break;
                                                                            }
                                                                        }
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>
                                                                                    <b style={{ cursor: "pointer" }} onClick={() => this.openConfirmModal(true, obj)}>
                                                                                        {obj.command_code}
                                                                                    </b>
                                                                                </td>
                                                                                <td>{moment(obj.request_date).format("D/M/YYYY")}</td>
                                                                                <td>{obj.staff.name}</td>
                                                                                <td>{obj.reason}</td>
                                                                                <td>{type}</td>
                                                                                <td><ButtonGroupAction
                                                                                    editUrl={"/administration/request/vacation/edit/" + obj.id}
                                                                                    disabledDelete={true}
                                                                                    disabledEdit={obj.status > 0 || user.id != obj.staff.id}
                                                                                    children={
                                                                                        (obj.status == 0 && user.role == 2) ?
                                                                                            <a key="1" data-toggle="tooltip" title="Duyệt" type="button" rel="tooltip"
                                                                                                onClick={() => { this.openConfirmModal(false, obj); }}>
                                                                                                <i className="material-icons">done</i></a>
                                                                                            : <div />
                                                                                    }
                                                                                /></td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            <div style={{ display: "flex", flexDirection: "row-reverse" }}><Pagination
                                                                currentPage={paginator.current_page}
                                                                totalPages={paginator.total_pages}
                                                                loadDataPage={(id) => { return this.onFilterChange('page', id); }}
                                                            /></div>
                                                        </div>
                                                }
                                            </div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

RequestVacationContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    requestActions: PropTypes.object,
    paginator: PropTypes.object,
    requestVacations: PropTypes.object,
    user: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.request.isLoading,
        paginator: state.request.paginator,
        requestVacations: state.request.requestVacations,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestActions: bindActionCreators(requestActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestVacationContainer);

const statusFilter = [
    { id: -1, value: -1, label: "Chưa duyệt", },
    { id: 1, value: 1, label: "Đã duyệt", },
];

const typesFilter = [
    { id: "pay", value: "pay", label: "Có lương", },
    { id: "nopay", value: "nopay", label: "Không lương", },

];