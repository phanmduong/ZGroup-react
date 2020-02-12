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
import {Modal, Panel} from "react-bootstrap";

import {confirm, isEmptyInput, readExcel, showErrorMessage, showTypeNotification} from "../../helpers/helper";
import CreateRegisterModalContainer from "../registerStudents/CreateRegisterModalContainer";
import * as createRegisterActions from '../registerStudents/createRegisterActions';
import moment from "moment";
import {DATE_FORMAT_SQL, STATUS_REFS} from "../../constants/constants";
import CreateLeadOverlay from "./overlay/CreateLeadOverlay";
import * as studentActions from "../infoStudent/studentActions";
import Checkbox from "../../components/common/Checkbox";

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
                status: '',
            },
            leadStatusId: '',
            orderBy: '',
            orderByType: '',
            orderByOptions: [
                {value: 'staff_id', label: 'Lead chưa có P.I.C', type: 'asc'},
                {value: 'created_at', label: 'Lead từ mới đến cũ', type: 'asc'},
                // {value:'oldest',label:'Lead từ cũ đến mới'},
                {value: 'rate', label: 'Số sao', type: 'asc'},
                // {value: 'donwstar', label: 'Sao giảm dần'},
            ],
            statusFilter: [],
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
        this.isAdmin = (this.props.user.role === 2);
        this.statusRef = STATUS_REFS.leads;
    }

    componentWillMount() {

        if (!this.props.isLoadedStatuses) this.props.studentActions.loadStatuses(this.statusRef);

        // if (this.props.route.type === "distribution") {
        if (this.isAdmin) {
            this.setState({staff: "", page: 1});
            this.props.leadActions.getLeads({
                ...this.state,
                page: 1,
                staffId: -2
            });
        } else {
            // if (this.props.route.type === "my-leads") {
            this.setState({staff: this.props.user.id, page: 1});
            this.props.leadActions.getLeads(
                {
                    ...this.state,
                    staffId: this.props.user.id,
                    page: 1,
                }
            );
            // } else {
            //     this.loadData();
            // }
        }

    }

    componentWillReceiveProps(nextProps) {
        // if (!nextProps.isLoading && this.props.isLoading) {
        //     if (this.state.isAll) {
        //         this.changeStatusAll(true, nextProps);
        //     }
        //     this.setState({page: nextProps.currentPage});
        // }
        if (this.props.isUploading && !nextProps.isUploading && !nextProps.errorUpload) {
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
            this.props.leadActions.getLeads({page: 1, staffId: this.isAdmin ? -2 : this.props.user.id,});
        }
        // if (this.props.isDistributing && !nextProps.isDistributing && !nextProps.errorDistribution) {
        //     this.setState({
        //         page: 1,
        //         staffId: this.isAdmin ? -2 : this.props.user.id,
        //         isAll: false,
        //         selectedLeads: []
        //     });
        //     this.props.leadActions.getLeads({
        //         ...this.state,
        //         page: 1,
        //         staffId: this.isAdmin ? -2 : this.props.user.id,
        //     });
        // }

        // if (nextProps.route.type != this.props.route.type) {
        //     if (nextProps.route.type === "my-leads") {
        //         this.setState({
        //             page: 1,
        //             query: "",
        //             filter: {
        //                 startTime: '',
        //                 endTime: '',
        //             },
        //             staff: nextProps.user.id,
        //             isDistribution: false,
        //             top: "",
        //             rate: "",
        //             carer: "",
        //             isAll: false,
        //             selectedLeads: [],
        //             isOpenModalSelectedLeads: false,
        //         });
        //         this.props.leadActions.getLeads({
        //             page: 1, search: "", startTime: "", endTime: "", staffId: nextProps.user.id, rate: "", top: ""
        //         });
        //     } else {
        //         if (nextProps.route.type === "distribution") {
        //             this.setState({
        //                 page: 1,
        //                 query: "",
        //                 filter: {
        //                     startTime: '',
        //                     endTime: '',
        //                 },
        //                 staff: -2,
        //                 isDistribution: nextProps.route.type === "distribution",
        //                 top: "",
        //                 rate: "",
        //                 carer: "",
        //                 isAll: false,
        //                 selectedLeads: [],
        //                 isOpenModalSelectedLeads: false,
        //             });
        //             this.props.leadActions.getLeads({
        //                 page: 1, search: "", startTime: "", endTime: "", staffId: -2, rate: "", top: ""
        //             });
        //         } else {
        //             this.setState({
        //                 page: 1,
        //                 query: "",
        //                 filter: {
        //                     startTime: '',
        //                     endTime: '',
        //                 },
        //                 staffs: [],
        //                 staff: "",
        //                 isDistribution: false,
        //                 top: "",
        //                 rate: "",
        //                 carer: "",
        //                 isAll: false,
        //                 selectedLeads: [],
        //                 isOpenModalSelectedLeads: false,
        //
        //             });
        //             this.props.leadActions.getLeads({page: 1});
        //         }
        //     }
        // }

        if (!nextProps.isLoadingStatuses && this.props.isLoadingStatuses) {
            this.setState({
                statusFilter: this.getStatusFilter(nextProps.statuses.leads),
            });
        }
    }

    getStatusFilter = (arr) => {
        if (!arr) return [];
        let data = arr.map(function (obj) {
            return {
                ...obj,
                value: obj.id,
                label: obj.name
            };
        });
        return [{
            value: '',
            label: 'Tất cả'
        }, ...data];
    };

    openModalSelectedLeadsModal = () => {
        if (isEmptyInput(this.state.carer)) {
            showTypeNotification("Vui lòng chọn nhân viên!", "warning");
            return;
        }
        if (!this.state.selectedLeads || !this.state.selectedLeads.length) {
            showTypeNotification("Bạn chưa chọn lead nào!", "warning");
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
            this.props.leadActions.getLeads({
                    ...this.state,
                    page: 1,
                    // staffId: this.isAdmin ? -2 : this.props.user.id,
                    search: value,
                }
            );
        }.bind(this), 500);
    };

    loadData = (page = 1) => {
        this.setState({page: page});
        this.props.leadActions.getLeads({
            ...this.state,
            page,
        });
    };

    updateFormFilter = event => {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;

        // if (!isEmptyInput(filter.startTime) && !isEmptyInput(filter.endTime)) {
        //     this.props.leadActions.getLeads({
        //         ...this.state,
        //         page: 1,
        //         startTime: filter.startTime,
        //         endTime: filter.endTime,
        //     });
        // }
        // this.setState({filter: filter, page: 1, isAll: false});
        this.onFilterChange(filter, 'filter');
    };

    changeStaff = value => {
        let staff;
        staff = value && value.value ? value.value : "";
        // this.props.leadActions.getLeads({
        //     ...this.state,
        //     page: 1,
        //     staffId: staff,
        // });
        this.onFilterChange(staff, 'staffId');
        this.onFilterChange(staff, 'staff');
        // this.setState({staff: staff, page: 1});

    };

    changeCarer = value => {
        let staff;
        staff = value ? value : "";
        this.setState({carer: staff,});

    };

    getNewState = (value, name) => {
        let newState = {...this.state};
        switch (name) {
            case 'orderBy': {
                newState.orderByType = value.type;
                newState.orderBy = value.value;
                break;
            }
            case 'leadStatusId': {
                newState.leadStatusId = value ? value.id : value;
                break;
            }
            default: {
                newState = {[name]: value};
            }
        }
        return newState;
    };

    onDirectFilterChange = (value, name) => {
        let newState = this.onFilterChange(value, name);
        this.props.leadActions.getLeads({
            ...newState,
            page: 1,
            // staffId: this.isAdmin ? -2 : this.props.user.id,
        });
    };

    onFilterChange = (value, name) => {
        let newState = this.getNewState(value, name);
        this.setState({...newState});
        return newState;
        // this.props.leadActions.getLeads({
        //     ...this.state,
        //     page: 1,
        //     staffId: this.isAdmin ? -2 : this.props.user.id,
        //     [name]: value
        // });
    };

    applyFilter = () => {
        this.props.leadActions.getLeads({
            ...this.state,
            page: 1,
            // staffId: this.isAdmin ? -2 : this.props.user.id,
        });
    };

    changeAddress = (address) => {

        this.onFilterChange(address, 'address');
        // if (this.timeOut !== null) {
        //     clearTimeout(this.timeOut);
        // }
        // this.timeOut = setTimeout(
        //     () => {
        //         // if (!this.state.isDistribution) {
        //         this.props.leadActions.getLeads({
        //             ...this.state,
        //             page: 1,
        //             staffId: this.isAdmin ? -2 : this.props.user.id,
        //             address,
        //         });
        //         // }
        //     }, 1500);

    };

    loadStaffs = (input, callback, isCarer) => {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            searchStaffs(input).then(res => {

                let staffs = [];

                if (isCarer) {
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
        // this.setState({page: 1, rate: value, isAll: false});
        this.onFilterChange(value, 'rate');
        // this.props.leadActions.getLeads({
        //     ...this.state,
        //     staffId: this.isAdmin ? -2 : this.props.user.id,
        //     page: 1,
        //     rate: value,
        // });
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
            this.props.leadActions.getLeads({
                ...this.state,
                page: 1,
                top: value,
                // staffId: this.isAdmin ? -2 : this.props.user.id,

            });
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
        this.setState({selectedLeads: [], isOpenModalSelectedLeads: false, isAll: false});
    };

    removeLeadSuccess = () => {
        this.props.leadActions.getLeads(this.state);
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
                    className="btn button-green margin-left-auto disabled"
                    type="button"
                    disabled={true}
                >
                    <i className="fa fa-spinner fa-spin"/>{" "}
                    Đang phân leads
                </button>
            ) : (
                <button
                    className="btn button-green margin-left-auto"
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
                                    {/*<strong>{this.props.route.type === "my-leads" ? "Danh sách leads của bạn" : "Danh sách leads"} </strong>*/}
                                    <strong>{this.isAdmin ? "Danh sách leads của bạn" : "Danh sách leads"} </strong>
                                </h5>
                            </div>
                        }
                        <div style={{marginTop: '10%'}}/>

                        <div className="flex-align-items-center flex flex-wrap">
                            {/*{this.props.route.type !== "my-leads" && !this.state.isDistribution &&*/}
                            {this.isAdmin &&
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
                            {/*{this.props.route.type !== "my-leads" && !this.state.isDistribution &&*/}
                            {this.isAdmin && !this.state.isDistribution &&
                            <a href="/import/data" className="btn btn-white btn-round margin-right-10 ">
                                Upload
                            </a>}
                            {/*<button*/}
                            {/*    className="btn btn-white btn-round btn-icon"*/}
                            {/*    type="button"*/}
                            {/*    onClick={this.openCreateRegisterModal}*/}
                            {/*>*/}
                            {/*    Thêm lead&nbsp;&nbsp;<i className="material-icons">*/}
                            {/*    add*/}
                            {/*</i>*/}
                            {/*</button>*/}
                            <CreateLeadOverlay
                                className="btn btn-white btn-round btn-icon"
                            />
                            {this.isAdmin && !this.state.isDistribution &&
                            <div className="btn btn-white btn-round btn-icon"
                                 onClick={() => this.setState({isDistribution: true})}>
                                Phân lead
                            </div>}
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

                            <ReactSelect
                                disabled={this.props.isLoading}
                                options={this.state.orderByOptions}
                                onChange={e => this.onDirectFilterChange(e, 'orderBy')}
                                value={this.state.orderBy}
                                placeholder="Sắp xếp theo"
                                searchable={false}
                                name="orderBy"
                                className="react-select-white margin-left-auto min-width-150-px"
                            />
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
                                {
                                    (this.isAdmin) &&
                                    <div className="col-md-3"
                                        // style={{zIndex: 10}}
                                    >
                                        <div className="form-group none-padding">
                                            <label>Nhân viên</label>
                                            <ReactSelect.Async
                                                loadOptions={(p1, p2) => this.loadStaffs(p1, p2, true)}
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

                                {/*{this.state.isDistribution &&*/}
                                {/*<div className="col-md-3">*/}
                                {/*    <div className="form-group margin-bottom-20">*/}
                                {/*        <label>Nhân viên</label>*/}
                                {/*        <ReactSelect.Async*/}
                                {/*            loadOptions={(p1, p2) => this.loadStaffs(p1, p2, true)}*/}
                                {/*            loadingPlaceholder="Đang tải..."*/}
                                {/*            placeholder="Chọn nhân viên"*/}
                                {/*            searchPromptText="Không có dữ liệu nhân viên"*/}
                                {/*            onChange={this.changeCarer}*/}
                                {/*            value={this.state.carer}*/}
                                {/*            className="react-select-white"*/}
                                {/*            optionRenderer={(option) => {*/}
                                {/*                return (*/}
                                {/*                    <ItemReactSelect label={option.label}*/}
                                {/*                                     url={option.avatar_url}/>*/}
                                {/*                );*/}
                                {/*            }}*/}
                                {/*            valueRenderer={(option) => {*/}
                                {/*                return (*/}
                                {/*                    <ItemReactSelect label={option.label}*/}
                                {/*                                     url={option.avatar_url}/>*/}
                                {/*                );*/}
                                {/*            }}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*}*/}
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label>Chọn đánh giá</label>
                                        <div className="flex flex-row-center">
                                            <Star
                                                value={this.state.rate}
                                                maxStar={5}
                                                onChange={(value) => {
                                                    this.changeRate(value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/*{this.state.isDistribution &&*/}
                                {/*<div className="col-md-3">*/}
                                {/*    <div className="form-group">*/}
                                {/*        <label>Chọn tất cả</label>*/}
                                {/*        <Checkbox*/}
                                {/*            label={`${this.props.totalCount} lead`}*/}
                                {/*            checkBoxLeft*/}
                                {/*            onChange={this.onChangeAll}*/}
                                {/*            name="isAll"*/}
                                {/*            checked={this.state.isAll}*/}

                                {/*        /></div>*/}
                                {/*</div>}*/}
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

                                <div className="col-md-3">
                                    <label className="">
                                        Theo trạng thái
                                    </label>
                                    <ReactSelect
                                        disabled={this.props.isLoading || this.props.isLoadingStatuses}
                                        options={this.state.statusFilter}
                                        onChange={e => this.onFilterChange(e, 'leadStatusId')}
                                        value={this.state.leadStatusId}
                                        placeholer="Tất cả"
                                        name="leadStatusId"
                                    />
                                </div>
                                {/*{this.state.isDistribution &&*/}
                                {/*<div className="col-md-3">*/}
                                {/*    <label>Top</label>*/}
                                {/*    <FormInputText*/}
                                {/*        required*/}
                                {/*        type="number"*/}
                                {/*        placeholder="Nhập top"*/}
                                {/*        updateFormData={this.changeTop}*/}
                                {/*        value={this.state.top}*/}
                                {/*    />*/}
                                {/*</div>}*/}

                                {/*{this.state.isDistribution &&*/}
                                {/*<div className="col-md-3">*/}
                                {/*    <button className="btn btn-success btn-default"*/}
                                {/*            onClick={this.openModalSelectedLeadsModal}*/}
                                {/*    >*/}
                                {/*        Phân leads*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                                {/*}*/}


                            </div>
                            <div className="flex-end">
                                <div className="btn button-green" onClick={this.applyFilter}>Áp dụng</div>
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
                    // removeLead={this.props.route.type === "my-leads" ? this.removeLead : null}
                    removeLead={!this.isAdmin ? null : this.removeLead}
                />
                {this.state.isDistribution &&
                <div className="import-data-container" mask="white">
                    <div className="import-footer">
                        <div>
                            <table className="table">
                                <tbody>
                                <tr>

                                    <td style={{width: 20}}>
                                        <Checkbox
                                            checked={this.state.selectedLeads ? this.state.selectedLeads.length > 0 : false}
                                            onChange={() => this.deleteAllSelected()}

                                        />
                                    </td>


                                    <td style={{minWidth: 200}} className="text-align-left"><b>
                                        Đã chọn: {this.state.selectedLeads ? this.state.selectedLeads.length : 0} lead
                                    </b></td>


                                    <td style={{width: 'calc(100%-625px)', minWidth: 150}} className="text-align-right">
                                        <b>Phân các Lead này cho </b></td>
                                    <td style={{width: 200}}>
                                        <ReactSelect.Async
                                            loadOptions={this.loadStaffs}
                                            loadingPlaceholder="Đang tải..."
                                            placeholder="Chọn nhân viên"
                                            searchPromptText="Không có dữ liệu nhân viên"
                                            onChange={this.changeCarer}
                                            value={this.state.carer}
                                            className="react-select-white"
                                            // menuPosition="top"
                                            // menuPlacement="top"
                                            menuContainerStyle={{top: 'auto', bottom: '100%'}}
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

                                    </td>
                                    <td style={{width: 135}}>

                                        <div onClick={this.openModalSelectedLeadsModal}
                                             className="btn button-green">
                                            Phân lead
                                        </div>

                                    </td>
                                    <td style={{width: 70}}>
                                        <div className="btn btn-white" style={{borderRadius: 5}}
                                             onClick={() => this.setState({isDistribution: false})}>
                                            Hủy
                                        </div>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                        {/*<div className="flex flex-align-items-center flex-space-between padding-horizontal-20px">*/}
                        {/*    <Checkbox*/}
                        {/*        checked={this.state.selectedLeads ? this.state.selectedLeads.length > 0 : false}*/}
                        {/*    />*/}
                        {/*    <b>*/}
                        {/*        Đã chọn: {this.state.selectedLeads ? this.state.selectedLeads.length : 0} lead*/}
                        {/*    </b>*/}
                        {/*    <div className="flex flex-row flex-space-between flex-justify-content-center">*/}
                        {/*        <div onClick={() => {*/}
                        {/*        }} className="button-green">*/}
                        {/*            Hoàn tất*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>
                </div>}

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

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="flex flex-align-items-center flex-space-between">
                            <h5><b>Tổng số leads: {this.state.selectedLeads ? this.state.selectedLeads.length : 0}</b>
                            </h5>
                            {this.state.selectedLeads && this.state.selectedLeads.length > 0 && this.renderButtonDistribution()}
                        </div>

                        <ListLead
                            showSelectedLead
                            leads={this.state.selectedLeads}
                            deleteLeadSelected={this.deleteLeadSelected}
                            deleteAllSelected={this.deleteAllSelected}
                            openCreateRegisterModal={this.openCreateRegisterModal}

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
    isLoadedStatuses: PropTypes.bool.isRequired,
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
        statuses: state.infoStudent.statuses,
        isLoadedStatuses: state.infoStudent.isLoadedStatuses,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        leadActions: bindActionCreators(leadActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadContainer);