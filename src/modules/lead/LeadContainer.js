import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Search from "../../components/common/Search";
import * as leadActions from "./leadActions";
import ListLead from "./ListLead";
import FormInputDate from "../../components/common/FormInputDate";
import ReactSelect from 'react-select';
import ItemReactSelect from "../../components/common/ItemReactSelect";
import {searchStaffs} from "./leadApi";
import Star from "../../components/common/Star";
import {NO_AVATAR} from "../../constants/env";
import FormInputText from "../../components/common/FormInputText";
import Checkbox from "../../components/common/Checkbox";
import {Modal} from "react-bootstrap";
import {confirm,isEmptyInput, readExcel, showErrorMessage, showTypeNotification} from "../../helpers/helper";


class LeadContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            filter: {
                startTime: '',
                endTime: '',
            },
            staffs: [],
            staff: "",
            isDistribution: false,
            top: "",
            rate: "",
            carer: "",
            isAll: false,
            selectedLeads: [],
            isOpenModalSelectedLeads: false,

        };
        this.loadData = this.loadData.bind(this);
        this.updateFormFilter = this.updateFormFilter.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.changeStaff = this.changeStaff.bind(this);
        this.loadStaffs = this.loadStaffs.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.changeTop = this.changeTop.bind(this);
        this.onChangeAll = this.onChangeAll.bind(this);
        this.changeStatusLead = this.changeStatusLead.bind(this);
        this.openModalSelectedLeadsModal = this.openModalSelectedLeadsModal.bind(this);
        this.closeModalSelectedLeadsModal = this.closeModalSelectedLeadsModal.bind(this);
        this.deleteLeadSelected = this.deleteLeadSelected.bind(this);
        this.deleteAllSelected = this.deleteAllSelected.bind(this);
        this.distributionLeads = this.distributionLeads.bind(this);
    }

    componentWillMount() {
        if (this.props.route.type === "distribution") {
            this.setState({isDistribution: true, staff: "-2", page: 1});
            this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime,
                -2, this.state.rate, this.state.top);
        } else {

            if (this.props.route.type === "my-leads") {
                this.setState({staff: this.props.user.id, page: 1});
                this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime,
                    this.props.user.id, this.state.rate, this.state.top);
            } else {
                this.loadData();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading != this.props.isLoading && !nextProps.isLoading) {
            if (this.state.isAll) {
                this.changeStatusAll(true, nextProps);
            }
            this.setState({page: nextProps.currentPage});
        }
        if (nextProps.isUploading != this.props.isUploading && !nextProps.isUploading && !nextProps.errorUpload) {
            this.setState({
                page: 1,
                query: "",
                filter: {
                    startTime: '',
                    endTime: '',
                },
                staff: "",
                rate: 0
            });
            this.props.leadActions.getLeads(1);
        }
        if (nextProps.isDistributing != this.props.isDistributing && !nextProps.isDistributing && !nextProps.errorDistribution) {
            this.setState({
                page: 1,
                staff: "-2",
                isAll: false,
                selectedLeads: []
            });
            this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime,
                -2, this.state.rate, this.state.top);
        }
        if (nextProps.route.type != this.props.route.type) {
            if (nextProps.route.type === "my-leads") {
                this.setState({
                    page: 1,
                    query: "",
                    filter: {
                        startTime: '',
                        endTime: '',
                    },
                    staff: nextProps.user.id,
                    isDistribution: false,
                    top: "",
                    rate: "",
                    carer: "",
                    isAll: false,
                    selectedLeads: [],
                    isOpenModalSelectedLeads: false,
                });
                this.props.leadActions.getLeads(1, "", "", "", nextProps.user.id, "", "");
            } else {
                if (nextProps.route.type === "distribution") {
                    this.setState({
                        page: 1,
                        query: "",
                        filter: {
                            startTime: '',
                            endTime: '',
                        },
                        staff: -2,
                        isDistribution: nextProps.route.type === "distribution",
                        top: "",
                        rate: "",
                        carer: "",
                        isAll: false,
                        selectedLeads: [],
                        isOpenModalSelectedLeads: false,
                    });
                    this.props.leadActions.getLeads(1, "", "", "", -2, "", "");
                } else {
                    this.setState({
                        page: 1,
                        query: "",
                        filter: {
                            startTime: '',
                            endTime: '',
                        },
                        staffs: [],
                        staff: "",
                        isDistribution: false,
                        top: "",
                        rate: "",
                        carer: "",
                        isAll: false,
                        selectedLeads: [],
                        isOpenModalSelectedLeads: false,

                    });
                    this.props.leadActions.getLeads(1);
                }
            }
        }
    }

    openModalSelectedLeadsModal() {
        if (isEmptyInput(this.state.carer)) {
            showTypeNotification("Vui lòng chọn nhân viên", "warning");
            return;
        }
        this.setState({isOpenModalSelectedLeads: true});
    }

    closeModalSelectedLeadsModal() {
        this.setState({isOpenModalSelectedLeads: false});
    }

    searchChange(value) {
        this.setState({
            page: 1,
            query: value,
            isAll: false
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.leadActions.getLeads(1, value, this.state.filter.startTime, this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top);
        }.bind(this), 500);
    }

    loadData(page = 1) {
        this.setState({page: page});
        this.props.leadActions.getLeads(page, this.state.query, this.state.filter.startTime, this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top);
    }

    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;

        if (!isEmptyInput(filter.startTime) && !isEmptyInput(filter.endTime)) {
            this.props.leadActions.getLeads(1, this.state.query, filter.startTime, filter.endTime, this.state.staff, this.state.rate, this.state.top);
        }
        this.setState({filter: filter, page: 1, isAll: false});
    }

    changeStaff(value) {
        let staff;
        if (this.state.isDistribution) {
            staff = value ? value : "";
            this.setState({carer: staff});
        } else {
            staff = value && value.value ? value.value : "";
            this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime, staff, this.state.rate, this.state.top);
            this.setState({staff: staff, page: 1});
        }
    }

    loadStaffs(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            searchStaffs(input).then(res => {

                let staffs = [];

                if (!this.state.isDistribution) {
                    staffs = [{
                        avatar_url: NO_AVATAR,
                        value: "",
                        label: "Tất cả"
                    }, {
                        avatar_url: NO_AVATAR,
                        value: "-2",
                        label: "Không có nhân viên",
                    }, {
                        avatar_url: NO_AVATAR,
                        value: "-1",
                        label: "Có nhân viên",
                    }];
                }
                res.data.staffs.map((staff) => {
                    staffs.push({
                        ...staff,
                        ...{
                            value: staff.id,
                            label: staff.name
                        }
                    });
                });
                this.setState({staffs: staffs});
                callback(null, {options: staffs, complete: true});
            });
        }.bind(this), 500);
    }

    changeRate(value) {
        this.setState({page: 1, rate: value, isAll: false});
        this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime, this.state.staff, value, this.state.top);
    }

    handleFile(event) {
        let leads = [];
        let fileCorrect = true;
        readExcel(event.target.files[0], true).then((data) => {
            data.map((row) => {
                if (isEmptyInput(row[0]) || isEmptyInput(row[1]) || isEmptyInput(row[2])
                    || isEmptyInput(row[4])) {
                    fileCorrect = false;
                }
            });
            if (fileCorrect) {
                data.map((row) => {
                    leads.push({
                        name: row[0].trim(),
                        email: row[1].trim(),
                        phone: row[2].trim(),
                        how_know: row[3] ? row[3].trim() : "",
                        rate: row[4].trim(),

                    });
                });
                this.props.leadActions.uploadLeads(leads);
            } else {
                showErrorMessage("Kiểm tra lại file");
            }
        }).catch(() => {
            showErrorMessage("Kiểm tra lại file");
        });
    }

    changeTop(event) {
        const value = event.target.value;
        this.setState({top: value, page: 1, isAll: false});
        if (this.timeOutTop !== null) {
            clearTimeout(this.timeOutTop);
        }
        this.timeOutTop = setTimeout(function () {
            this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime,
                this.state.filter.endTime, this.state.staff, this.state.rate, value);
        }.bind(this), 500);
    }

    onChangeAll(event) {
        this.setState({isAll: event.target.checked});
        this.changeStatusAll(event.target.checked, this.props);
    }

    changeStatusAll(status, props) {
        let leads = props.leads.map((lead) => {
            return {
                ...lead,
                checked: status
            };
        });
        let selectedLeads = this.state.selectedLeads.map((lead) => {
            return {
                ...lead,
                checked: status
            };
        });
        leads.map((lead) => {
            let leadData = selectedLeads.filter((leadItem) => leadItem.id == lead.id);
            if (leadData === undefined || leadData == null || leadData.length <= 0) {
                selectedLeads.push(lead);
            }
        });
        this.setState({selectedLeads: [...selectedLeads.filter((lead) => lead.checked)]});
    }

    changeStatusLead(leadData, status) {
        let isExist = false;
        let leads = this.state.selectedLeads.map((lead) => {
            if (lead.id == leadData.id) {
                isExist = true;
                return {
                    ...lead,
                    checked: status
                };
            }
            return {
                ...lead,
            };
        });
        if (!isExist) {
            leads = [...leads, {...leadData, checked: status}];
        }
        this.setState({selectedLeads: [...leads.filter((lead) => lead.checked)], isAll: false});
    }

    deleteLeadSelected(leadData) {
        this.setState({selectedLeads: [...this.state.selectedLeads.filter((lead) => lead.id != leadData.id)]});
    }

    deleteAllSelected() {
        this.setState({selectedLeads: [], isAll: false});
    }

    removeLeadSuccess = () => {
        this.props.leadActions.getLeads(this.state.page, this.state.query, this.state.filter.startTime,
            this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top);
    }

    removeLead = (lead) => {
        confirm('error', 'Xóa', "Bạn có muốn xóa lead này không?", () => {
            this.props.leadActions.removeLead(lead.id, this.removeLeadSuccess);
        });
    };


    distributionLeads() {

        let leadIds = this.state.selectedLeads.map((lead) => {
            return lead.id;
        });
        this.props.leadActions.uploadDistributionLead(leadIds, this.state.carer.id, this.state.isAll, this.state.query,
            this.state.filter.startTime, this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top, this.closeModalSelectedLeadsModal);
    }

    renderButtonDistribution() {

        return (
            <div>
                {this.props.isDistributing ? (
                    <button
                        className="btn btn-fill btn-rose disabled"
                        type="button"
                        disabled={true}
                    >
                        <i className="fa fa-spinner fa-spin"/>{" "}
                        Đang phân leads
                    </button>
                ) : (
                    <button
                        className="btn btn-fill btn-rose"
                        type="button"

                        onClick={this.distributionLeads}
                    >
                        Phân leads
                    </button>
                )}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        {this.state.isDistribution ?
                            <div className="flex flex-row flex-space-between">
                                <h5 className="card-title"><strong>Phân chia leads</strong></h5>
                                {!this.props.isLoading && <div>Tổng số lead {this.props.totalCount}</div>}
                            </div>
                            :
                            <div className="flex flex-row">
                                <h5 className="card-title">
                                    <strong>{this.props.route.type === "my-leads" ? "Danh sách leads của bạn" : "Danh sách leads"} </strong>
                                </h5>
                                {this.props.route.type === "my-leads" ?
                                    <div/>
                                    :
                                    <div>
                                        {this.props.isUploading ?
                                            <button
                                                className="btn btn-primary btn-round btn-xs none-margin button-add">
                                                <i className="fa fa-spinner fa-spin"
                                                   style={{fontSize: '16px'}}/>
                                            </button>
                                            :
                                            <div className={"dropdown"} id="btn-add-leads">
                                                <button
                                                    className="btn btn-primary btn-round btn-xs dropdown-toggle none-margin button-add"
                                                    type="button"
                                                    data-toggle="dropdown">
                                                    <strong>+</strong>
                                                </button>
                                                <ul className="dropdown-menu dropdown-primary">
                                                    <li><a
                                                        onClick={() => $('#btn-add-leads').removeClass('open')}>
                                                        Upload
                                                        <input type="file"
                                                               accept=".csv,.xls,.xlsx"
                                                               onChange={this.handleFile}
                                                               style={{
                                                                   cursor: 'pointer',
                                                                   opacity: "0.0",
                                                                   position: "absolute",
                                                                   top: 0,
                                                                   left: 0,
                                                                   bottom: 0,
                                                                   right: 0,
                                                                   width: "100%",
                                                                   height: "100%"
                                                               }}
                                                        />
                                                    </a>
                                                    </li>
                                                    <li>
                                                        <a target="_blank"
                                                           href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/lead-data-sample.xlsx">
                                                            Tải file mẫu
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }

                        <div className="row">
                            <div className="col-md-12">
                                <Search
                                    onChange={this.searchChange}
                                    placeholder="Tim kiếm leads"
                                    value={this.state.query}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <FormInputDate
                                    label="Từ ngày"
                                    name="startTime"
                                    updateFormData={this.updateFormFilter}
                                    id="form-start-time"
                                    value={this.state.filter.startTime}
                                    maxDate={this.state.filter.endTime}
                                />
                            </div>
                            <div className="col-md-3">
                                <FormInputDate
                                    label="Đến ngày"
                                    name="endTime"
                                    updateFormData={this.updateFormFilter}
                                    id="form-end-time"
                                    value={this.state.filter.endTime}
                                    minDate={this.state.filter.startTime}

                                />
                            </div>
                            {
                                (this.state.isDistribution || this.props.route.type === "my-leads") ?
                                    <div/>
                                    :
                                    <div className="col-md-3" style={{zIndex: 10}}>
                                        <div className="form-group none-padding">
                                            <label className="label-control"/>
                                            <ReactSelect.Async
                                                loadOptions={this.loadStaffs}
                                                loadingPlaceholder="Đang tải..."
                                                placeholder="Chọn nhân viên"
                                                searchPromptText="Không có dữ liệu nhân viên"
                                                onChange={this.changeStaff}
                                                value={this.state.staff}
                                                optionRenderer={(option) => {
                                                    return (
                                                        <ItemReactSelect label={option.label}
                                                                         url={option.avatar_url}/>
                                                    );
                                                }}
                                                valueRenderer={(option) => {
                                                    return (
                                                        <ItemReactSelect label={option.label}
                                                                         url={option.avatar_url}/>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                            }
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="label-control">Chọn đánh giá</label>
                                    <div className="flex flex-row-center">
                                        <Star
                                            value={0}
                                            maxStar={5}
                                            onChange={(value) => {
                                                this.changeRate(value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.isDistribution &&
                            <div className="row">
                                <div className="col-md-3">
                                    <Checkbox
                                        label={`Chọn tất cả (${this.props.totalCount})`}
                                        checkBoxLeft
                                        onChange={this.onChangeAll}
                                        name="isAll"
                                        checked={this.state.isAll}

                                    />
                                </div>
                                <div className="col-md-3">
                                    <FormInputText
                                        required
                                        type="number"
                                        placeholder="Nhập top"
                                        updateFormData={this.changeTop}
                                        value={this.state.top}
                                        className="none-padding none-margin"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group none-margin none-padding">
                                        <ReactSelect.Async
                                            loadOptions={this.loadStaffs}
                                            loadingPlaceholder="Đang tải..."
                                            placeholder="Chọn nhân viên"
                                            searchPromptText="Không có dữ liệu nhân viên"
                                            onChange={this.changeStaff}
                                            value={this.state.carer}
                                            optionRenderer={(option) => {
                                                return (
                                                    <ItemReactSelect label={option.label}
                                                                     url={option.avatar_url}/>
                                                );
                                            }}
                                            valueRenderer={(option) => {
                                                return (
                                                    <ItemReactSelect label={option.label}
                                                                     url={option.avatar_url}/>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-success width-100"
                                            style={{margin: '0', height: '35px'}}
                                            onClick={this.openModalSelectedLeadsModal}
                                    >
                                        Phân leads
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <ListLead
                                    leads={this.props.leads}
                                    isLoading={this.props.isLoading}
                                    totalPages={this.props.totalPages}
                                    loadData={this.loadData}
                                    currentPage={this.state.page}
                                    isDistribution={this.state.isDistribution}
                                    selectedLeads={this.state.selectedLeads}
                                    changeStatusLead={this.changeStatusLead}
                                    removeLead={this.props.route.type === "my-leads" ? this.removeLead : null}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    bsSize="lg"
                    show={this.state.isOpenModalSelectedLeads}
                    onHide={this.closeModalSelectedLeadsModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className="card-title">Danh sách leads đã chọn phân
                                cho {this.state.carer ? this.state.carer.name : ""}
                            </h4>
                            <div>Tổng số leads: {this.state.selectedLeads ? this.state.selectedLeads.length : 0}</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.selectedLeads && this.state.selectedLeads.length > 0 && this.renderButtonDistribution()}
                        <ListLead
                            showSelectedLead
                            leads={this.state.selectedLeads}
                            deleteLeadSelected={this.deleteLeadSelected}
                            deleteAllSelected={this.deleteAllSelected}
                        />
                        {this.renderButtonDistribution()}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

LeadContainer.propTypes = {
    route: PropTypes.object.isRequired,
    leadActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    leads: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUploading: PropTypes.bool.isRequired,
    errorDistribution: PropTypes.bool.isRequired,
    errorUpload: PropTypes.bool.isRequired,
    isDistributing: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        leads: state.lead.leads,
        isLoading: state.lead.isLoading,
        totalPages: state.lead.totalPages,
        currentPage: state.lead.currentPage,
        isUploading: state.lead.isUploading,
        errorUpload: state.lead.errorUpload,
        totalCount: state.lead.totalCount,
        isDistributing: state.lead.isDistributing,
        errorDistribution: state.lead.errorDistribution,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        leadActions: bindActionCreators(leadActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadContainer);