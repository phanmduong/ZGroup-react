import React, { Component } from "react";
import { store } from "./contractStore";
import { observer } from "mobx-react";
import { dotNumber } from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
import { Link } from "react-router";
import TooltipButton from '../../../components/common/TooltipButton';
import Pagination from "../../../components/common/Pagination";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL, CONTRACT_TYPES } from "../../../constants/constants";
import moment from "moment";
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Modal, Panel } from 'react-bootstrap';
import CreateContractContainer from './CreateContractContainer';
import ReactSelect from 'react-select';
import FormInputText from "../../../components/common/FormInputText";
import FormInputDate from "../../../components/common/FormInputDate";

@observer
class ContractContainer extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadAllContract();
    }

    openInfoModal = (data) => {

        store.openInfoModal(data);
    }

    closeInfoModal = () => {
        store.isInfoModal = false;
    }

    onFilterChange = (field, value) => {
        let filter = { ...store.filter };
        if (filter[field] == value) return;
        filter[field] = value ? value : (value == 0 ? value : "");
        if (field != "page") filter.page = store.paginator.current_page;
        store.filter = filter;
        store.loadAllContract();
    }

    onTextFilterChange = (e) => {
        let { name, value } = e.target;
        let filter = { ...store.filter };
        if (filter[name] == value) return;
        filter[name] = value ? value : (value == 0 ? value : "");
        store.filter = filter;
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            store.loadAllContract();
        }.bind(this), 500);
    }

    onDateFilterChange = (e) => {
        let { name, value } = e.target;
        this.onFilterChange(name, value);
    }

    render() {
        let { isLoading, isInfoModal, paginator, contracts, loadAllContract, filter, showPanel } = store;
        let { user } = this.props;
        const filterClass = "col-md-3 col-sm-6 col-xs-6";
        return (
            <div>
                <Modal
                    show={isInfoModal} bsSize="large"
                    onHide={this.closeInfoModal}>
                    <Modal.Body><CreateContractContainer /></Modal.Body>
                </Modal>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">

                                <div className="flex-row flex">
                                    <h4 className="card-title"><strong>Hợp đồng</strong></h4>
                                    <div>
                                        <Link to="/administration/contract/create" className="btn btn-rose btn-round btn-xs button-add none-margin">
                                            <strong>+</strong>
                                        </Link>

                                    </div>
                                    <div>
                                        <TooltipButton text="Lọc" placement="top">
                                            <button
                                                className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                onClick={() => { store.showPanel = !store.showPanel; }}
                                                disabled={isLoading}

                                            >
                                                <i className="material-icons" style={{
                                                    width: 14,
                                                    marginLeft: -4,
                                                    paddingTop: 2,
                                                }}>filter_list</i>
                                            </button>

                                        </TooltipButton>
                                    </div>
                                </div>
                                <Panel collapsible expanded={showPanel} bsStyle="primary">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className={filterClass}>
                                                    <label>Trạng thái</label>
                                                    <ReactSelect
                                                        options={[]}
                                                        onChange={(e) => {
                                                            return this.onFilterChange("status", e ? e.id : "");
                                                        }}
                                                        value={filter.status}
                                                        defaultMessage="Chọn"
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
                                                <div className={filterClass}>
                                                    <FormInputDate
                                                        name="start_time"
                                                        id="start_time"
                                                        value={filter.start_time}
                                                        label="Từ ngày"
                                                        updateFormData={this.onDateFilterChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                                <div className={filterClass}>
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
                                <br />
                                {
                                    isLoading ? <Loading /> :
                                        <div className="col-md-12">
                                            {
                                                contracts.length == 0 ?
                                                    <h3>Chưa có hợp đồng</h3>
                                                    :
                                                    <div className="table-responsive">
                                                        <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                            <thead className="text-rose">
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Số hợp đồng</th>
                                                                    <th>Bên A</th>
                                                                    <th>Bên B</th>
                                                                    <th>Người kí</th>
                                                                    <th>Giá trị</th>
                                                                    <th>Ngày hết hạn</th>
                                                                    <th />
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {contracts.map((obj, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>
                                                                                <b style={{ cursor: "pointer" }} onClick={() => { this.openInfoModal(obj); }}>
                                                                                    {obj.contract_number}
                                                                                </b>
                                                                            </td>

                                                                            <td>{obj.company_a.name}</td>
                                                                            <td>{obj.company_b.name}</td>
                                                                            <td>{obj.sign_staff.name}</td>
                                                                            <td>{dotNumber(obj.value)}</td>
                                                                            {/* <td>{obj.sign_staff.name}</td> */}

                                                                            <td>{moment(obj.due_date).format("D/M/YYYY")}</td>
                                                                            <td><ButtonGroupAction
                                                                                editUrl={"/administration/contract/edit/" + obj.id}
                                                                                disabledDelete={true}
                                                                                disabledEdit={obj.status > 0 || user.id != obj.staff.id}
                                                                                children={
                                                                                    (obj.status == 0 && user.role == 2) ?
                                                                                        <a key="1" data-toggle="tooltip" title="Duyệt" type="button" rel="tooltip"
                                                                                            onClick={() => { }}>
                                                                                            <i className="material-icons">done</i></a>
                                                                                        : <div />
                                                                                }
                                                                            /></td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                                            <Pagination
                                                                currentPage={paginator.current_page}
                                                                totalPages={paginator.total_pages}
                                                                loadDataPage={(page) => { }} />
                                                        </div>
                                                    </div>
                                            }
                                        </div>

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ContractContainer.propTypes = {
    user: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(ContractContainer);