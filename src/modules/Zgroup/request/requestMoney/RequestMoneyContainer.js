import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActions from "../requestActions";
import * as PropTypes from "prop-types";
import Loading from "../../../../components/common/Loading";
import ButtonGroupAction from "../../../../components/common/ButtonGroupAction";
import Pagination from "../../../../components/common/Pagination";
import FormInputText from "../../../../components/common/FormInputText";
import FormInputDate from "../../../../components/common/FormInputDate";
import moment from "moment";
import * as helper from "../../../../helpers/helper";
import PayConfirmModal from "./PayConfirmModal";
import ReceiveConfirmModal from "./ReceiveConfirmModal";
import InfoRequestMoneyModal from "./InfoRequestMoneyModal";
import { Link } from "react-router";
import { Modal, Panel } from 'react-bootstrap';
import { DATETIME_FORMAT_SQL } from '../../../../constants/constants';
import ReactSelect from 'react-select';


class RequestMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showPayConfirmModal: false,
            showReceiveConfirmModal: false,
            showInfoModal: false,
            idPay: "",
            idReceive: "",
            currentRequest: {
                staff: {},
            },
            showLoadingModal: false,
            showPanel: true,
            filter: {
                start_time: "",
                end_time: "",
                company_pay_id: "",
                company_receive_id: "",
                status: null,
                staff_name: "",
                command_code: "",
                page: 1,
            },
        };
        this.openPayConfirmModal = this.openPayConfirmModal.bind(this);
        this.closePayConfirmModal = this.closePayConfirmModal.bind(this);
        this.submitPayConfirmModal = this.submitPayConfirmModal.bind(this);
        this.openReceiveConfirmModal = this.openReceiveConfirmModal.bind(this);
        this.closeReceiveConfirmModal = this.closeReceiveConfirmModal.bind(this);
        this.submitReceiveConfirmModal = this.submitReceiveConfirmModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.openLoadingModal = this.openLoadingModal.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onTextFilterChange = this.onTextFilterChange.bind(this);
        this.onDateFilterChange = this.onDateFilterChange.bind(this);
    }

    componentWillMount() {
        let { requestActions } = this.props;
        requestActions.getAllRequestMoney();
        requestActions.loadAllCompany();
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    openPayConfirmModal(obj) {
        this.setState({ showPayConfirmModal: true, idPay: obj.id, currentRequest: obj });
    }

    closePayConfirmModal() {
        this.setState({ showPayConfirmModal: false });
    }

    submitPayConfirmModal(money, company_pay_id) {
        this.closePayConfirmModal();
        this.props.requestActions.confirmPayRequest(this.state.idPay, money, company_pay_id,
            this.props.requestActions.getAllRequestMoney
        );
    }

    openReceiveConfirmModal(obj) {
        this.setState({ showReceiveConfirmModal: true, idReceive: obj.id, currentRequest: obj });
    }

    closeReceiveConfirmModal() {
        this.setState({ showReceiveConfirmModal: false });
    }

    submitReceiveConfirmModal(money, company_receive_id) {
        this.closeReceiveConfirmModal();
        let date = moment(moment.now()).format(DATETIME_FORMAT_SQL);
        this.props.requestActions.confirmReceiveRequest(this.state.idReceive, money, date, company_receive_id,
            this.props.requestActions.getAllRequestMoney);
    }

    openInfoModal(obj) {
        this.setState({ showInfoModal: true, currentRequest: obj });
    }

    closeInfoModal() {
        this.setState({ showInfoModal: false });
    }


    openLoadingModal() {
        this.setState({ showLoadingModal: true });
        this.props.requestActions.getRequestMoneyNoPaging(this.exportExcel, () => this.setState({ showLoadingModal: false }));
    }

    openPanel() {
        let { showPanel } = this.state;
        this.setState({ showPanel: !showPanel });
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
                    status = "Đã ứng";
                    break;
                }
                case 2: {
                    status = "Đã hoàn ứng";
                    break;
                }
            }
            if (!item.company_pay) data.company_pay = {};
            if (!item.company_receive) data.company_receive = {};
            let res = {
                'STT': index + 1,
                'Mã tạm ứng': item.command_code,
                'Người ứng': item.staff ? item.staff.name : "Không có",
                'Ngày tạm ứng': moment(item.created_at.date).format("D/M/YYYY"),
                'Nguồn ứng': item.company_pay.name,
                'Nguồn hoàn ứng': item.company_receive.name,
                'Ngày hoàn trả': moment(item.date_complete).isValid() ? moment(item.date_complete).format("D/M/YYYY") : "Không có",
                'Lý do': item.reason,
                'Số tiền yêu cầu': item.money_payment,
                'Số tiền thực nhận': item.money_received,
                'Số tiền đã sử dụng': item.money_used,
                'Số tiền hòan trả': item.money_received - item.money_used,
                'Hình thức': item.type == "atm" ? "Chuyển khoản" : "Tiền mặt",
                'Trạng thái': status,

            };
            /* eslint-enable */
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Danh sách ứng tiền', cols);
        //end điểm danh

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách ứng tiền Zgroup');

        this.setState({ showLoadingModal: false });
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
            this.props.requestActions.getAllRequestMoney(filter);
        }.bind(this), 500);
    }

    onDateFilterChange(e) {
        let { name, value } = e.target;
        this.onFilterChange(name, value);
    }

    onFilterChange(field, value) {
        let filter = { ...this.state.filter };
        if (filter[field] == value) return;
        filter[field] = value ? value : (value == 0 ? value : "");
        if (field != "page") filter.page = this.props.paginator.current_page;
        this.setState({ filter });
        this.props.requestActions.getAllRequestMoney(filter);
    }

    render() {
        //console.log("container", this.state.filter);
        let { isLoading, requestMoneys, paginator, companies, user } = this.props;
        let { showPayConfirmModal, showReceiveConfirmModal, showInfoModal, showPanel, currentRequest, filter } = this.state;
        return (
            <div className="content">
                <div>
                    <PayConfirmModal
                        show={showPayConfirmModal}
                        onHide={this.closePayConfirmModal}
                        submit={this.submitPayConfirmModal}
                        data={currentRequest}
                        companies={companies}
                    />
                    <ReceiveConfirmModal
                        show={showReceiveConfirmModal}
                        onHide={this.closeReceiveConfirmModal}
                        submit={this.submitReceiveConfirmModal}
                        data={currentRequest}
                        companies={companies}
                    />
                    <InfoRequestMoneyModal
                        show={showInfoModal}
                        onHide={this.closeInfoModal}
                        data={currentRequest}
                    />
                    <Modal
                        show={this.state.showLoadingModal}
                        onHide={() => { }}>
                        <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                        <Modal.Body><Loading /></Modal.Body>
                    </Modal>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">attach_money</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách xin tạm ứng</h4>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginRight: 5 }}>
                                            <Link className="btn btn-rose" to="/administration/request/money/create">
                                                <i className="material-icons">add</i>Xin tạm ứng</Link>

                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                            <button className="btn btn-rose" onClick={this.openLoadingModal} >Xuất file excel</button>
                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                            <button className="btn btn-rose" onClick={this.openPanel} >
                                                <i className="material-icons">filter_list</i>
                                                Bộ lọc</button>
                                        </div>
                                    </div>
                                    <Panel collapsible expanded={showPanel} bsStyle="primary">
                                        <div className="row">
                                        <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Nguồn ứng</label>
                                                <ReactSelect
                                                    options={companies || []}
                                                    onChange={(e) => {
                                                        return this.onFilterChange("company_pay_id", e ? e.id : "");
                                                    }}
                                                    value={filter.company_pay_id}
                                                    defaultMessage="Chọn"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label>Nguồn hoàn ứng</label>
                                                <ReactSelect
                                                    options={companies || []}
                                                    onChange={(e) => {
                                                        return this.onFilterChange("company_receive_id", e ? e.id : "");
                                                    }}
                                                    value={filter.company_receive_id}
                                                    defaultMessage="Chọn"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
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
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <FormInputText
                                                    name="command_code"
                                                    value={filter.command_code}
                                                    label="Mã ứng tiền"
                                                    updateFormData={this.onTextFilterChange}
                                                    disabled={isLoading}
                                                />
                                            </div>


                                            <div className="col-md-4">
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
                                            <div className="col-md-4">
                                                <FormInputDate
                                                    name="start_time"
                                                    id="start_time"
                                                    value={filter.start_time}
                                                    label="Từ ngày"
                                                    updateFormData={this.onDateFilterChange}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
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
                                                requestMoneys.length == 0 ?
                                                    <div>Không có yêu cầu</div>
                                                    :
                                                    <div className="table-responsive">
                                                        <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                            <thead className="text-rose">
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Mã hành chính</th>
                                                                    <th>Số tiền ứng</th>
                                                                    <th>Người ứng tiền</th>
                                                                    <th>Ngày ứng tiền</th>
                                                                    <th>Ngày hoàn trả</th>
                                                                    <th>Trạng thái</th>
                                                                    <th />
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {requestMoneys.map((obj, index) => {
                                                                    let status = "Chưa duyệt";
                                                                    switch (obj.status) {
                                                                        case 1: {
                                                                            status = "Đã ứng";
                                                                            break;
                                                                        }
                                                                        case 2: {
                                                                            status = "Đã hoàn ứng";
                                                                            break;
                                                                        }
                                                                    }
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td><a onClick={() => { return this.openInfoModal(obj); }}>{obj.command_code}</a></td>
                                                                            <td>{helper.dotNumber(obj.money_payment)}</td>

                                                                            <td>{obj.staff.name}</td>
                                                                            <td>{moment(obj.created_at.date).format("D/M/YYYY")}</td>
                                                                            <td>{moment(obj.date_complete).isValid() ? moment(obj.date_complete).format("D/M/YYYY") : "Chưa hoàn ứng"}</td>
                                                                            <td>{status}</td>
                                                                            <td><ButtonGroupAction
                                                                                editUrl={"/administration/request/money/edit/" + obj.id}
                                                                                disabledDelete={true}
                                                                                disabledEdit={obj.status > 0 || user.id != obj.staff.id}
                                                                                children={
                                                                                    [
                                                                                        (obj.status == 0 && user.role == 2) ?
                                                                                            <a key="1" data-toggle="tooltip" title="Chi Tiền" type="button" rel="tooltip"
                                                                                                onClick={() => { this.openPayConfirmModal(obj); }}>
                                                                                                <i className="material-icons">vertical_align_top</i></a>
                                                                                            : <div />
                                                                                        ,
                                                                                        (obj.status == 1 && user.role == 2) ?
                                                                                            <a key="2" data-toggle="tooltip" title="Hoàn Trả" type="button" rel="tooltip"
                                                                                                onClick={() => { this.openReceiveConfirmModal(obj); }}>
                                                                                                <i className="material-icons">vertical_align_bottom</i></a>
                                                                                            : <div />
                                                                                    ]

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
                                                            loadDataPage={(id) => { return this.onFilterChange("page", id); }}
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
            </div >

        );
    }
}

RequestMoneyContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    requestActions: PropTypes.object,
    paginator: PropTypes.object,
    user: PropTypes.object,
    companies: PropTypes.array,
    requestMoneys: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.request.isLoading,
        paginator: state.request.paginator,
        requestMoneys: state.request.requestMoneys,
        companies: state.request.companies,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestActions: bindActionCreators(requestActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestMoneyContainer);

const statusFilter = [
    { id: -1, value: -1, label: "Chưa duyệt", },
    { id: 1, value: 1, label: "Đã ứng", },
    { id: 2, value: 2, label: "Đã hoàn ứng", },
];