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
import {Modal, Panel} from "react-bootstrap";

import {confirm, isEmptyInput, readExcel, showErrorMessage, showTypeNotification} from "../../helpers/helper";
import CreateRegisterModalContainer from "../registerStudents/CreateRegisterModalContainer";
import * as createRegisterActions from '../registerStudents/createRegisterActions';
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../constants/constants";

class LeadContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            address: '',
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

    openModalSelectedLeadsModal = () => {
        if (isEmptyInput(this.state.carer)) {
            showTypeNotification("Vui lòng chọn nhân viên", "warning");
            return;
        }
        this.setState({isOpenModalSelectedLeads: true});
    };

    closeModalSelectedLeadsModal = () => {
        this.setState({isOpenModalSelectedLeads: false});
    };

    searchChange = value => {
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
    };

    loadData = (page = 1) => {
        this.setState({page: page});
        this.props.leadActions.getLeads(page, this.state.query, this.state.filter.startTime, this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top);
    };

    updateFormFilter = event => {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;

        if (!isEmptyInput(filter.startTime) && !isEmptyInput(filter.endTime)) {
            this.props.leadActions.getLeads(1, this.state.query, filter.startTime, filter.endTime, this.state.staff, this.state.rate, this.state.top);
        }
        this.setState({filter: filter, page: 1, isAll: false});
    };

    changeStaff = value => {
        let staff;
        if (this.state.isDistribution) {
            staff = value ? value : "";
            this.setState({carer: staff});
        } else {
            staff = value && value.value ? value.value : "";
            this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime, staff, this.state.rate, this.state.top);
            this.setState({staff: staff, page: 1});
        }
    };

    changeAddress = (address) => {
        this.setState({address});
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            () => {
                if (!this.state.isDistribution) {
                    this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime, this.state.carer, this.state.rate, this.state.top, address);
                }
            }, 1500);

    };

    loadStaffs = (input, callback) => {
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
    };

    changeRate = value => {
        this.setState({page: 1, rate: value, isAll: false});
        this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime, this.state.filter.endTime, this.state.staff, value, this.state.top);
    };

    handleFile = event => {
        let leads = [];
        let fileCorrect = true;
        let fileCorrectDob = true;
        readExcel(event.target.files[0], true).then((data) => {
            data.map((row) => {
                if (isEmptyInput(row[0]) || isEmptyInput(row[1]) || isEmptyInput(row[2])
                    || isEmptyInput(row[6])) {
                    fileCorrect = false;
                }
            });
            if (fileCorrect) {
                data.map((row) => {
                    let dataUser = {
                        name: row[0].trim(),
                        email: row[1].trim(),
                        phone: row[2].trim(),
                        dob: row[3] ? moment(row[3].trim(), "DD/MM/YYYY").format(DATE_FORMAT_SQL) : "",
                        source: row[4] ? row[4].trim() : "",
                        campaign: row[5] ? row[5].trim() : "",
                        rate: row[6].trim(),
                        note: row[7] ? row[7].trim() : "",

                    };
                    if (dataUser.dob == "Invalid date") {
                        showTypeNotification("Lỗi ngày sinh của " + dataUser.name, "warning");
                        dataUser.dob = '';
                        fileCorrectDob = false;
                    }
                    leads.push(dataUser);

                });
                console.log(leads);
                if (fileCorrectDob) {
                    this.props.leadActions.uploadLeads(leads);
                } else {
                    confirm('warning', "File có lỗi ngày sinh", "Có lỗi ngày sinh. Bạn có muốn tiếp tục đăng file ?",
                        () => {
                            this.props.leadActions.uploadLeads(leads);
                        }
                    );
                }


            } else {
                showErrorMessage("Kiểm tra lại file");
            }
        }).catch((e) => {
            console.log(e);
            showErrorMessage("Kiểm tra lại file");
        });

        event.target.value = '';
    };

    changeTop = event => {
        const value = event.target.value;
        this.setState({top: value, page: 1, isAll: false});
        if (this.timeOutTop !== null) {
            clearTimeout(this.timeOutTop);
        }
        this.timeOutTop = setTimeout(function () {
            this.props.leadActions.getLeads(1, this.state.query, this.state.filter.startTime,
                this.state.filter.endTime, this.state.staff, this.state.rate, value);
        }.bind(this), 500);
    };

    onChangeAll = event => {
        this.setState({isAll: event.target.checked});
        this.changeStatusAll(event.target.checked, this.props);
    };

    changeStatusAll = (status, props) => {
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
    };

    changeStatusLead = (leadData, status) => {
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
    };

    deleteLeadSelected = leadData => {
        this.setState({selectedLeads: [...this.state.selectedLeads.filter((lead) => lead.id != leadData.id)]});
    };

    deleteAllSelected = () => {
        this.setState({selectedLeads: [], isAll: false});
    };

    removeLeadSuccess = () => {
        this.props.leadActions.getLeads(this.state.page, this.state.query, this.state.filter.startTime,
            this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top);
    };

    removeLead = (lead) => {
        confirm('error', 'Xóa', "Bạn có muốn xóa lead này không?", () => {
            this.props.leadActions.removeLead(lead.id, this.removeLeadSuccess);
        });
    };


    distributionLeads = () => {

        let leadIds = this.state.selectedLeads.map((lead) => {
            return lead.id;
        });
        this.props.leadActions.uploadDistributionLead(leadIds, this.state.carer.id, this.state.isAll, this.state.query,
            this.state.filter.startTime, this.state.filter.endTime, this.state.staff, this.state.rate, this.state.top, this.closeModalSelectedLeadsModal);
    };

    renderButtonDistribution = () => (
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

    openCreateRegisterModal = (user) => {
        this.props.createRegisterActions.showCreateRegisterModal(true);
        this.props.createRegisterActions.updateFormData(user);
    };
    openFilterPanel = () => {
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    };

    render() {
        return (
            <div>
                <CreateRegisterModalContainer/>
                {!this.props.isLoading &&
                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">
                        {this.state.isDistribution ?
                            <div className="">
                                <h5 className="card-title"><strong>Phân chia leads</strong></h5>
                                {!this.props.isLoading &&
                                <div className="lead-count margin-vertical-30">Tổng số
                                    lead {this.props.totalCount}</div>}
                            </div>
                            :
                            <div className="">
                                <h5 className="card-title">
                                    <strong>{this.props.route.type === "my-leads" ? "Danh sách leads của bạn" : "Danh sách leads"} </strong>
                                </h5>
                            </div>
                        }
                        <div style={{marginTop: '10%'}}/>

                        <div className="flex-align-items-center flex flex-wrap">
                            {this.props.route.type !== "my-leads" && !this.state.isDistribution &&
                            <Search
                                onChange={this.searchChange}
                                placeholder="Tim kiếm leads"
                                value={this.state.query}
                                className="round-white-seacrh"

                            />}
                            <button
                                onClick={this.openFilterPanel}
                                className="btn btn-white btn-round margin-right-10"
                                disabled={this.props.isLoading}
                            >
                                Lọc
                            </button>
                            {this.props.route.type !== "my-leads" && !this.state.isDistribution &&
                            <a href="/import/data" className="btn btn-white btn-round margin-right-10 ">
                                Upload
                            </a>
                            }
                            {/*{this.props.route.type !== "my-leads" && !this.state.isDistribution &&*/}
                            {/*<div className="btn btn-white btn-round margin-right-10 "*/}
                            {/*     onClick={() => $('#btn-add-leads').removeClass('open')}>*/}
                            {/*    Upload*/}
                            {/*    <input type="file"*/}
                            {/*           accept=".csv,.xls,.xlsx"*/}
                            {/*           onChange={this.handleFile}*/}
                            {/*           style={{*/}
                            {/*               cursor: 'pointer',*/}
                            {/*               opacity: "0.0",*/}
                            {/*               position: "absolute",*/}
                            {/*               top: 0,*/}
                            {/*               left: 0,*/}
                            {/*               bottom: 0,*/}
                            {/*               right: 0,*/}
                            {/*               width: "100%",*/}
                            {/*               height: "100%"*/}
                            {/*           }}*/}
                            {/*    />*/}
                            {/*</div>}*/}

                            {/*<a target="_blank" className="btn btn-white btn-round margin-right-10 "*/}
                            {/*   href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/lead-data-sample.xlsx">*/}
                            {/*    Tải file mẫu*/}
                            {/*</a>*/}
                        </div>


                    </div>


                </div>
                }
                <Panel collapsible expanded={
                    this.state.openFilterPanel
                    &&
                    !(this.props.isLoading)
                }>
                    <div className="card card-filter">
                        <div className="card-content">
                            <div className="row">


                                <div className="col-md-3">
                                    <label>Từ ngày</label>
                                    <FormInputDate
                                        label=""
                                        name="startTime"
                                        updateFormData={this.updateFormFilter}
                                        id="form-start-time"
                                        value={this.state.filter.startTime}
                                        maxDate={this.state.filter.endTime}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>Đến ngày</label>
                                    <FormInputDate
                                        label=""
                                        name="endTime"
                                        updateFormData={this.updateFormFilter}
                                        id="form-end-time"
                                        value={this.state.filter.endTime}
                                        minDate={this.state.filter.startTime}

                                    />
                                </div>
                                <div className="col-md-6"/>
                                {
                                    (this.state.isDistribution || this.props.route.type === "my-leads") ?
                                        <div/>
                                        :
                                        <div className="col-md-3" style={{zIndex: 10}}>
                                            <div className="form-group none-padding">
                                                <label>Nhân viên</label>
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
                                    <div className="form-group margin-bottom-20">
                                        <label>Chọn đánh giá</label>
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
                                {this.state.isDistribution &&
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label>Nhân viên</label>
                                        <ReactSelect.Async
                                            loadOptions={this.loadStaffs}
                                            loadingPlaceholder="Đang tải..."
                                            placeholder="Chọn nhân viên"
                                            searchPromptText="Không có dữ liệu nhân viên"
                                            onChange={this.changeStaff}
                                            value={this.state.carer}
                                            className="react-select-white"
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
                                {this.state.isDistribution &&
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Chọn tất cả</label>
                                        <Checkbox
                                            label={`${this.props.totalCount} lead`}
                                            checkBoxLeft
                                            onChange={this.onChangeAll}
                                            name="isAll"
                                            checked={this.state.isAll}

                                        /></div>
                                </div>}
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label>Tỉnh/thành phố</label>
                                        <Search
                                            onChange={this.changeAddress}
                                            value={this.state.address}
                                            placeholder="Nhập tỉnh/thành phố"
                                            disabled={this.props.isLoading}
                                        />
                                    </div>
                                </div>
                                {this.state.isDistribution &&
                                <div className="col-md-3">
                                    <label>Top</label>
                                    <FormInputText
                                        required
                                        type="number"
                                        placeholder="Nhập top"
                                        updateFormData={this.changeTop}
                                        value={this.state.top}
                                        // className="none-padding none-margin"
                                    />
                                </div>}

                                {this.state.isDistribution &&
                                <div className="col-md-3">

                                    <button className="btn btn-success btn-default"
                                            onClick={this.openModalSelectedLeadsModal}
                                    >
                                        Phân leads
                                    </button>
                                </div>

                                }


                            </div>
                        </div>

                    </div>
                </Panel>

                <ListLead
                    leads={this.props.leads}
                    isLoading={this.props.isLoading}
                    totalPages={this.props.totalPages}
                    loadData={this.loadData}
                    currentPage={this.state.page}
                    isDistribution={this.state.isDistribution}
                    selectedLeads={this.state.selectedLeads}
                    changeStatusLead={this.changeStatusLead}
                    openCreateRegisterModal={this.openCreateRegisterModal}
                    removeLead={this.props.route.type === "my-leads" ? this.removeLead : null}
                />


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
        leadActions: bindActionCreators(leadActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadContainer);