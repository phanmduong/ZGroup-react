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
import {loadLeads, searchStaffs} from "./leadApi";
import {NO_AVATAR} from "../../constants/env";
import {Modal, Panel} from "react-bootstrap";

import {
    appendJsonToWorkBook,
    confirm,
    isEmptyInput,
    newWorkBook,
    readExcel,
    saveWorkBookToExcel,
    setClipboard,
    showErrorMessage,
    showErrorNotification,
    showTypeNotification
} from "../../helpers/helper";
import CreateRegisterModalContainer from "../registerStudents/CreateRegisterModalContainer";
import * as createRegisterActions from '../registerStudents/createRegisterActions';
import moment from "moment";
import {
    CALL_STATUSES_TO_TEXT,
    DATE_FORMAT_SQL,
    GENDER,
    LEAD_EXPORT_FIELDS_ARRAY,
    LEAD_EXPORT_FIELDS_OBJECT,
    REGISTER_STATUS,
    STATUS_REFS
} from "../../constants/constants";
import CreateLeadOverlay from "./overlay/CreateLeadOverlay";
import * as studentActions from "../infoStudent/studentActions";
import Checkbox from "../../components/common/Checkbox";
import Loading from "../../components/common/Loading";
import * as baseActions from "../../actions/baseActions";
import {getValueFromKey} from "../../helpers/entity/object";

const TAGS = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "First lead",
        value: "first_lead"
    },
    {
        label: "Old lead",
        value: "old_lead"
    },
    {
        label: "New lead",
        value: "new_lead"
    },
];

class LeadContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.picFilters = [
            // {text:'Tất cả', operator: ()=>true},
            // {text:'Đã phân P.I.C', operator: (lead)=>!isEmptyInput(lead.staff_id)},
            // {text:'Chưa phân P.I.C', operator: (lead)=>isEmptyInput(lead.staff_id)},
            {
                text: 'Tất cả Lead',
                avatar_url: NO_AVATAR,
                value: "",
                label: "Tất cả Lead"
            },
            {
                avatar_url: NO_AVATAR,
                value: "-1",
                label: "Lead đã phân P.I.C",
                text: "Lead đã phân P.I.C",
            },
            {
                avatar_url: NO_AVATAR,
                value: "-2",
                label: "Lead chưa phân P.I.C",
                text: "Lead chưa phân P.I.C",
            },
        ];
        this.state = {
            page: 1,
            search: "",
            address: '',
            lead_tag: '',
            filter: {
                startTime: '',
                endTime: '',
                imported_at: '',
                call_back_time: '',
                mock_exam_time: '',
                appointment_time: '',
            },
            leadStatusId: '',
            source_id: '',
            orderBy: '',
            orderByType: '',
            orderByOptions: [
                {value: 'staff_id', label: 'Lead chưa có P.I.C', type: 'asc'},
                {value: 'created_at', label: 'Lead từ mới đến cũ', type: 'desc'},
                {value: 'imported_at', label: 'Ngày nhập mới đến cũ', type: 'desc'},
                {value: 'rate', label: 'Số sao', type: 'asc'},
                {value: 'last_time_interact', label: 'Tương tác gần đây', type: 'desc'},
                // {value: 'donwstar', label: 'Sao giảm dần'},
            ],
            statusFilter: [],
            sourceFilter: [],
            campaignFilter: [],

            staffs: [],
            staff: {},
            staffId: "",
            isDistribution: false,
            top: "",
            rate: "",
            carer: "",
            province_id: '',
            selectedBaseId: 0,
            isAll: false,
            selectedLeads: [],
            isOpenModalSelectedLeads: false,
            showLoadingAllLeadsModal: false,
            showExportFieldsModal: false,
            selectedExportFields: LEAD_EXPORT_FIELDS_OBJECT,

        };
        this.starFilter = [
            {value: '', label: 'Tất cả sao'},
            {value: '0', label: '0 sao'},
            {value: 1, label: '1 sao'},
            {value: 2, label: '2 sao'},
            {value: 3, label: '3 sao'},
            {value: 4, label: '4 sao'},
            {value: 5, label: '5 sao'},
        ];
        this.duplicateFilter = [
            {value: '', label: 'Tất cả'},
            {value: 'email', label: 'Trùng email'},
            {value: 'phone', label: 'Trùng số điện thoại'},
        ];
        this.isAdmin = (this.props.user.role === 2 || window.location.hostname.includes('colorme'));
        this.statusRef = STATUS_REFS.leads;
    }

    componentWillMount() {

        if (!this.props.isLoadedSources) this.props.createRegisterActions.loadSources();
        if (!this.props.isLoadedCampaigns) this.props.createRegisterActions.loadCampaigns();
        if (!this.props.isLoadedStatuses[this.statusRef]) this.props.studentActions.loadStatuses(this.statusRef);

        let willMountState = this.state;

        if (this.props.location.query) {
            console.log(this.props.location.query);
            let {query} = this.props.location;
            willMountState = {
                ...query,
                staff: JSON.parse(query.staff || '{}'),
                filter: {
                    startTime: query.startTime,
                    endTime: query.endTime,
                    call_back_time: query.call_back_time,
                    mock_exam_time: query.mock_exam_time,
                    appointment_time: query.appointment_time,
                },

            };
        }

        if (this.isAdmin) {
            willMountState = {...willMountState, page: 1};
        } else {
            willMountState = {...willMountState, staff: this.props.user, staffId: this.props.user.id, page: 1};
        }
        console.log('urlState', willMountState);

        this.setState(willMountState);
        this.props.leadActions.getLeads({
            ...willMountState,
            ...willMountState.filter,
            staffId: this.isAdmin ? willMountState.staffId : this.props.user.id,
        });

    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.isLoading && this.props.isLoading) {
            this.setState({page: nextProps.currentPage});
        }
        // if (this.props.isUploading && !nextProps.isUploading && !nextProps.errorUpload) {
        //     this.setState({
        //         page: 1,
        //         search: "",
        //         filter: {
        //             startTime: '',
        //             endTime: '',
        //         },
        //         staff: "",
        //         rate: 0
        //     });
        //     this.props.leadActions.getLeads({page: 1, staffId: this.isAdmin ? '' : this.props.user.id,});
        // }
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
        //             search: "",
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
        //                 search: "",
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
        //                 search: "",
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
        if (!nextProps.isLoadingSources && this.props.isLoadingSources) {
            this.setState({
                sourceFilter: this.getStatusFilter(nextProps.sources),
            });
        }
        if (!nextProps.isLoadingCampaigns && this.props.isLoadingCampaigns) {
            this.setState({
                campaignFilter: this.getStatusFilter(nextProps.campaigns),
            });
        }
        if (nextProps.selectedBaseId !== this.props.selectedBaseId) {
            this.state.selectedBaseId = nextProps.selectedBaseId;
            this.setState({selectedBaseId: nextProps.selectedBaseId});
            this.applyFilter();
        }
    }


    copyShareUrl = () => {
        let url = this.getFilterUrlWithParams(this.state);
        setClipboard(url, true);
    };

    getFilterUrlWithParams = (newFilter = {}) => {
        let current_link = window.location.href.split('?')[0];
        let {
            filter, search, leadStatusId, source_id, orderByType, orderBy, rate, staffId, address, campaign_id, staff
        } = {...this.state, ...newFilter};
        current_link += `?address=${address || ''}` +
            `&campaign_id=${campaign_id || ''}` +
            `&rate=${rate || ''}` +
            `&source_id=${source_id || ''}` +
            `&staffId=${staffId || ''}` +
            `&orderByType=${orderByType}&orderBy=${orderBy || ''}` +
            `&leadStatusId=${leadStatusId || ''}` +
            `&search=${search || ''}` +
            `&staff=${JSON.stringify(staff)}` +
            `&startTime=${filter.startTime || ''}` +
            `&endTime=${filter.endTime || ''}` +
            `&mock_exam_time=${filter.mock_exam_time || ''}` +
            `&appointment_time=${filter.appointment_time || ''}` +
            `&call_back_time=${filter.call_back_time || ''}`;
        return current_link;
    };

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
            search: value,
            isAll: false
        });
    };

    onSearchLead = () => {
        this.props.leadActions.getLeads({
                ...this.state,
                ...this.state.filter,

            }
        );
    };

    loadData = (page = 1) => {
        this.setState({page, isAll: false});
        this.props.leadActions.getLeads({
            ...this.state,
            ...this.state.filter,
            page,
        });
    };

    updateFormFilter = event => {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;
        console.log(event);
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
    getProvinces = () => {
        return [
            {id: '', value: '', label: "T.cả t.phố"},
            ...(this.props.provinces ? this.props.provinces.map((province) => {
                return {id: province.id, value: province.id, label: province.name};
            }) : [])
        ];
    }
    changeStaff = value => {
        // let staff;
        // staff = value && value.value ? value.value : "";
        // this.props.leadActions.getLeads({
        //     ...this.state,
        //     page: 1,
        //     staffId: staff,
        // });
        // this.onFilterChange(staff, 'staffId');
        console.log('changeStaff', value);
        this.onFilterChange(value, 'staff');
        // this.setState({staff: staff, page: 1});

    };

    changePicFilter = (tab) => {
        this.changeStaff(tab);
        this.onDirectFilterChange(tab.value, 'staffId');
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
            case 'staff': {
                newState.staff = isEmptyInput(value) ? '' : value;
                newState.staffId = value ? (isEmptyInput(value.id) ? '' : value.id) : value;
                break;
            }
            case 'leadStatusId': {
                newState.leadStatusId = value ? value.id : value;
                break;
            }
            case 'source_id': {
                newState.source_id = value ? value.id : value;
                break;
            }
            case 'campaign_id': {
                newState.campaign_id = value ? value.id : value;
                break;
            }
            case 'province_id': {
                newState.province_id = value ? value.id : value;
                newState.address = value && value.id ? value.label : '';
                break;
            }
            default: {
                newState[name] = value;
            }
        }
        console.log('getNewState', value, name, newState);

        return newState;
    };

    onDirectFilterChange = (value, name) => {
        console.log(value, name);
        let newState = this.onFilterChange(value, name);
        this.props.leadActions.getLeads({
            ...newState,
            ...newState.filter,
            page: 1,
            staffId: this.isAdmin ? newState.staffId : this.props.user.id,

        });
    };

    onFilterChange = (value, name) => {

        let newState = this.getNewState(value, name);
        console.log('onFilterChange', value, name, newState);
        this.setState({...newState});
        return newState;
        // this.props.leadActions.getLeads({
        //     ...this.state,
        //     page: 1,
        //     staffId: this.isAdmin ? -2 : this.props.user.id,
        //     [name]: value
        // });
    };

    getBases = () => {

        return this.props.bases.map((item) => {
            return {
                value: item.id,
                label: item.name,
            };
        });

    };

    applyFilter = () => {
        console.log('applyFilter', this.state);
        this.props.leadActions.getLeads({
            ...this.state,
            ...this.state.filter,
            page: 1,
            search: this.state.search,
            base_id: this.state.selectedBaseId,
            staffId: this.isAdmin ? this.state.staffId : this.props.user.id,
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
                    //     staffs = [{
                    //         avatar_url: NO_AVATAR,
                    //         value: "",
                    //         label: "Tất cả"
                    //     }, {
                    //         avatar_url: NO_AVATAR,
                    //         value: "-2",
                    //         label: "Không có nhân viên",
                    //     }, {
                    //         avatar_url: NO_AVATAR,
                    //         value: "-1",
                    //         label: "Có nhân viên",
                    //     }];
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
                ...this.state.filter,
                page: 1,
                top: value,
                // staffId: this.isAdmin ? -2 : this.props.user.id,

            });
        }.bind(this), 500);
    };

    changeStatusAll = (status, props) => {
        let leads = props.leads.map((lead) => {
            return {
                ...lead,
                checked: status
            };
        });
        let selectedLeads = this.state.selectedLeads.map((lead) => {
            let checked = (leads.filter(l => l.id == lead.id)[0]) ? status : lead.status;
            return {
                ...lead,
                checked,
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
        if (this.state.isAll) {
            this.setState({selectedLeads: [], isOpenModalSelectedLeads: false, isAll: false});
        } else {
            this.setState({isAll: true});
            this.changeStatusAll(true, this.props);
        }

    };

    removeLeadSuccess = () => {
        this.props.leadActions.getLeads({
            ...this.state,
            ...this.state.filter,
            staffId: this.isAdmin ? this.state.staffId : this.props.user.id,
        });
    };

    removeLead = (lead) => {
        confirm('error', 'Xóa', "Bạn có muốn xóa lead này không?", () => {
            this.props.leadActions.removeLead(lead.id, this.removeLeadSuccess);
        });
    };

    resetLoad = () => {
        this.setState({staff: {}, page: 1, isDistribution: false, selectedLeads: [],filter: {
                startTime: '',
                endTime: '',
                imported_at: '',
                call_back_time: '',
                mock_exam_time: '',
                appointment_time: '',
            }});
        this.props.leadActions.getLeads({
            ...this.state,
            ...this.state.filter,
            page: 1,
            staffId: '',
        });
    };

    distributionLeads = () => {

        let leadIds = this.state.selectedLeads.map((lead) => {
            return lead.id;
        });
        this.props.leadActions.uploadDistributionLead(
            leadIds,
            this.state.carer.id,
            this.state.isAll,
            this.state.search,
            this.state.filter.startTime,
            this.state.filter.endTime,
            this.state.staff ? this.state.staff.id : '',
            this.state.rate,
            this.state.top,
            () => {
                this.closeModalSelectedLeadsModal();
                this.resetLoad();
            });
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

    showExportFieldsModal = () => {
        this.setState({
            showExportFieldsModal: true,
            selectedExportFields: LEAD_EXPORT_FIELDS_OBJECT,
        });
        setTimeout(() => {
            $.material.init();
        }, 800);

    };

    showLoadingAllLeadsModal = () => {
        this.setState({showLoadingAllLeadsModal: true, showExportFieldsModal: false});
        let {page, search, filter, staffId, rate, top, address, leadStatusId, orderBy, orderByType, source_id, campaign_id, duplicate} = this.state;
        let {startTime, endTime,} = filter;
        console.log(this.state.selectedExportFields);
        loadLeads(-1, page, search, startTime, endTime, staffId, rate, top, address, leadStatusId, orderBy, orderByType, source_id, campaign_id, duplicate)
            .then((res) => {
                console.log(res.data.data.leads);
                if (res.data.status == 1) {
                    let leads = res.data.data.leads;
                    this.exportAllLeadsToExcel(leads);
                } else {
                    showErrorMessage("Dữ liệu quá lớn, vui lòng giới hạn bằng bộ lọc!");
                }

            })
            .catch((e) => {
                showErrorMessage("Dữ liệu quá lớn, vui lòng giới hạn bằng bộ lọc!");
                console.log(e);
            })
            .finally(() => this.setState({showLoadingAllLeadsModal: false}));
    };

    exportAllLeadsToExcel = (leads) => {
        if (!leads || leads.length == 0) {
            showErrorNotification("Không có dữ liệu");
            return;
        }
        let {selectedExportFields} = this.state;
        const tele_call_keys = [];

        selectedExportFields.tele_calls.children.forEach(child => {
            if (child.checked) tele_call_keys.push(child.id);
        });
        let json = leads.map((item, index) => {
            if (item) {
                /* eslint-disable */
                // let courses = '';
                // if (!isEmptyInput(item.courses) && item.courses.length > 0) {
                //     item.courses.forEach(c => courses += `, ${c.name}`);
                // }
                let mock_exams_text = '';
                if (item.mock_exams) {
                    item.mock_exams.forEach((ex, ex_index) => {
                        if (ex_index > 0) mock_exams_text += '\n';
                        if (ex.type) mock_exams_text += 'Loại: ' + ex.type;
                        if (ex.score) mock_exams_text += ' - Điểm: ' + ex.score;
                        if (ex.time) mock_exams_text += ' - Giờ: ' + ex.time;
                        if (ex.date) mock_exams_text += ' - Ngày: ' + ex.date;
                        if (ex.note) mock_exams_text += ' - Ghi chú: ' + ex.note;
                        if (ex.course) mock_exams_text += ' - Môn: ' + ex.course.name;

                    });
                }
                // let last_call_result;
                // switch (item.last_call_result) {
                //     case 'success':
                //         last_call_result = 'Gọi thành công';
                //         break;
                //     case 'calling':
                //         last_call_result = 'Đang gọi';
                //         break;
                //     case 'failed':
                //         last_call_result = 'Gọi thất bại';
                //         break;
                //     default:
                //         last_call_result = 'Chưa gọi';
                // }
                let last_deal_status = REGISTER_STATUS.filter(s => s.register == item.last_deal_status)[0];

                let all_tele_call_notes = 'Không có';
                if (item.notes && item.notes.length > 0) {
                    all_tele_call_notes = '';
                    item.notes.forEach((note, note_index) => {
                        all_tele_call_notes += `${note_index > 0 ? '\n' : ''}${note}`;
                    });
                }
                // let gender = GENDER.filter((g) => g.id == item.gender)[0];
                let tele_calls = '';
                if (item.tele_calls instanceof Array) {

                    if (tele_call_keys.length > 0)
                        item.tele_calls.forEach((call, call_index) => {
                            // tele_calls += `${note_index > 0 ? '\n' : ''}${note}`;
                            let current_call = call_index > 0 ? '\n' : '';
                            call.call_status_text = CALL_STATUSES_TO_TEXT[call.call_status_text] || 'Chưa gọi';
                            tele_call_keys.forEach((field, field_index) => {
                                current_call += `${field_index > 0 ? ' - ' : ''}${getValueFromKey(call, field)}`;
                            });
                            tele_calls += current_call;

                        });

                }
                item = {
                    ...item,
                    stt: index + 1,
                    courses: isEmptyInput(item.courses) ? '' : item.courses.reduce((tmp, c) => tmp += `, ${c.name}`, ''),
                    mock_exams_text,
                    last_call_result: CALL_STATUSES_TO_TEXT[item.last_call_result] || 'Chưa gọi',
                    last_deal_status_text: last_deal_status ? last_deal_status.label : 'Không có',
                    all_tele_call_notes,
                    gender: GENDER.filter((g) => g.id == item.gender)[0],
                    lead_status: item.lead_status.name ? item.lead_status.name : "Không có",
                    city: !isEmptyInput(item.city) ? item.city : 'Không có',
                    campaign: item.campaign ? item.campaign.name : "Không có",
                    source: !isEmptyInput(item.source) ? item.source : "Không có",
                    how_know: item.how_know ? item.how_know : "Không có",
                    interest: item.interest ? item.interest : "Không có",
                    rate: item.rate || 0,
                    note: item.note || '',
                    district: item.district ? item.district : 'Không có',
                    dob: item.dob ? item.dob : 'Không có',
                    imported_by: item.imported_by ? item.importer.name : 'Không có',
                    pic: item.staff_id ? item.carer.name : 'Không có',
                    last_call_time: item.last_call_time ? item.last_call_time : 'Không có',
                    all_class_names: item.all_class_names ? item.all_class_names : 'Không có',
                    identity_code: item.identity_code || '',
                    work: item.work || '',
                    university: item.university || '',
                    father_name: item.father_name || '',
                    mother_name: item.mother_name || '',
                    image_urls: item.image_urls ? JSON.parse(item.image_urls).join('\n') : '',
                    nationality: item.nationality || '',
                    address: item.address || '',
                    image1: item.image1 || '',
                    image2: item.image2 || '',
                    tele_calls,
                };


                let res = {
                    // 'STT': index + 1,
                    // 'Họ tên': item.name,
                    // 'Email': item.email,
                    // 'Phone': item.phone,
                    // 'Các môn đã học': item.courses,
                    // 'Thành phố': item.city,
                    // 'Trạng thái': item.lead_status,
                    // 'Chiến dịch': item.campaign,
                    // 'Nguồn': item.source,
                    // 'Cách tiếp cận': item.how_know,
                    // 'Quan tâm': item.interest,
                    // 'Ngày tạo': item.created_at,
                    // 'Ngày nhập': item.imported_at,
                    // 'Đánh giá': item.rate,
                    // 'Ghi chú': item.note,
                    // 'Nội dung tất cả cuộc gọi': item.all_tele_call_notes,
                    // 'Thi thử': item.mock_exams_text,
                    // 'Import person': item.imported_by,
                    // 'Person in charge': item.pic,
                    // 'Các cuộc gọi': item.tele_calls,
                    // 'Latest Call': item.last_call_time,
                    // 'Latest Status': item.last_call_result,
                    // 'Classes Enrolled': item.all_class_names,
                    // 'Lastest  Deal status': item.last_deal_status_text,
                    // 'Giới tính': item.gender,
                    // 'CMND': item.identity_code,
                    // 'Công việc': item.work,
                    // 'Trường học': item.university,
                    // 'Tên phụ huynh 1': item.father_name,
                    // 'Tên phụ huynh 2': item.mother_name,
                    // 'Link Ảnh': item.image_urls,
                    // 'Quốc tịch': item.nationality,
                    // 'Địa chỉ': item.address,
                    // 'Ảnh CMND 1': item.image1,
                    // 'Ảnh CMND 2': item.image2,
                };
                LEAD_EXPORT_FIELDS_ARRAY.forEach(field => {
                    let target = selectedExportFields[field.id];
                    if (target.checked) {
                        res[target.name] = item[field.id];
                    }
                });
                /* eslint-enable */
                return res;
            }
        });
        let wb = newWorkBook();
        appendJsonToWorkBook(json, wb, 'Danh sách lead', [], []);

        saveWorkBookToExcel(wb, 'Danh sách lead');
    };

    onChangeFieldExport = (father_id, field_id) => {
        let {selectedExportFields} = this.state;
        if (father_id) {
            selectedExportFields[father_id].children = selectedExportFields[father_id].children.map(c => {
                if (c.id == field_id) c.checked = !c.checked;
                return c;
            });
            let anyChildChecked = selectedExportFields[father_id].children.filter(c => c.checked).length > 0;
            selectedExportFields[father_id].checked = anyChildChecked;
        } else {
            let checked = !selectedExportFields[field_id].checked;
            selectedExportFields[field_id].checked = checked;
            if (selectedExportFields[field_id].children) {
                selectedExportFields[field_id].children = selectedExportFields[field_id].children.map(c => {
                    c.checked = checked;
                    return c;
                });
            }
        }
        this.setState({selectedExportFields});
    };


    renderFieldExport = (field, father) => {
        let hasChildrens = field.children ? true : false;

        return (
            <div style={{marginLeft: father ? 30 : ''}}>
                <div className="panel panel-default">
                    <div className="panel-heading flex flex-space-between" role="tab"
                         id={'heading-tab' + field.id}>
                        <div className="checkbox none-margin" color="success">
                            <label type="normal">
                                <input type="checkbox" color="primary" checked={field.checked ? true : false}
                                       onChange={() => this.onChangeFieldExport(father ? father.id : null, field.id)}/>
                                <span>&nbsp;&nbsp;&nbsp;{field.name}</span>
                            </label>
                        </div>
                        {hasChildrens &&
                        <a role="button" data-toggle="collapse" data-parent="#accordion"
                           aria-expanded="false"
                           aria-controls={'tab-role' + field.id}
                           href={'#tab-role' + field.id}
                           style={{marginTop: 12}}
                        >
                            <div className="panel-title" style={{width: '100%'}}>
                                <i className="material-icons">keyboard_arrow_down</i>
                            </div>
                        </a>}
                    </div>
                    {hasChildrens &&
                    <div id={"tab-role" + field.id} className="panel-collapse collapse"
                         role="tabpanel"
                         aria-labelledby={'heading-tab' + field.id}>
                        <div className="panel-body">
                            {field.children.map(field2 => this.renderFieldExport(field2, field))}
                        </div>
                    </div>}
                </div>
            </div>);
    };

    render() {
        // console.log('render', this.props);
        let selectedLeadsCount = 0;
        if (this.state.isAll) {
            selectedLeadsCount = this.props.totalCount;
        } else if (this.state.selectedLeads) {
            selectedLeadsCount = this.state.selectedLeads.length;
        }
        return (
            <div className="margin-top-10">
                <CreateRegisterModalContainer/>

                {!this.props.isLoading && <div>

                    <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                        {this.picFilters.map((tab, key) => {
                            let className = tab.value == this.state.staffId ? 'active' : '';
                            return (<li className={className} key={key} onClick={() => this.changePicFilter(tab)}
                            ><a style={{
                                borderRadius: 5, textTransform: 'none', margin: 0, padding: '10px 20px'
                            }}>{tab.text}</a>
                            </li>);
                        })}
                        <li style={{float: 'right'}}>

                        </li>
                    </ul>

                    <div className="flex flex-space-between">
                        <div className="flex  flex-wrap tool-bar-actions width-100">
                            {!this.state.isDistribution && <CreateLeadOverlay
                                className="btn button-green btn-icon"
                                styleBtn={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                                onSuccess={() => {
                                    this.setState({staff: "", page: 1});
                                    this.resetLoad();
                                }}
                            />}
                            {this.isAdmin && !this.state.isDistribution &&
                            <button className="btn button-green btn-icon"
                                    style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                                    onClick={() => this.setState({isDistribution: true})}>
                                <i className="material-icons">supervisor_account</i>&nbsp;&nbsp;&nbsp;&nbsp;Phân P.I.C
                            </button>}
                            <Search
                                onChange={this.searchChange}
                                placeholder="Tim kiếm leads"
                                value={this.state.search}
                                className="white-seacrh margin-right-10 min-width-200-px form-group-none-padding"
                                onSearch={this.onSearchLead}
                            />
                            <button
                                onClick={this.openFilterPanel}
                                disabled={this.props.isLoading}
                                className="btn btn-white btn-icon"
                                style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                            ><span className="material-icons">filter_alt</span>&nbsp;&nbsp;&nbsp;&nbsp;Lọc
                            </button>
                            {this.isAdmin && !this.state.isDistribution &&
                            <a href="/import/data" className="btn btn-white btn-icon"
                               style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}>
                                <span className="material-icons">publish</span>&nbsp;&nbsp;&nbsp;&nbsp;Tải lên
                            </a>}
                            {!this.state.isDistribution && <a
                                onClick={this.showExportFieldsModal}
                                className="btn btn-white btn-icon"
                                style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                                disabled={this.props.isLoading}
                            ><span className="material-icons">get_app</span>&nbsp;&nbsp;&nbsp;&nbsp;Tải xuống
                            </a>}
                            <div style={{height: 42, margin: '10px 0 0 auto',}}>
                                <ReactSelect
                                    disabled={this.props.isLoading}
                                    options={this.state.orderByOptions}
                                    onChange={e => this.onDirectFilterChange(e, 'orderBy')}
                                    value={this.state.orderBy}
                                    placeholder="Sắp xếp theo"
                                    searchable={false}
                                    name="orderBy"
                                    className="react-select-white-round margin-left-auto min-width-150-px"
                                />
                            </div>

                        </div>
                    </div>

                </div>}
                <Panel collapsible className="none-margin"
                       expanded={this.state.openFilterPanel && !(this.props.isLoading)}>
                    <div className="card card-filter margin-top-0">
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

                                <div className="col-md-3">
                                    <label>Ngày nhập</label>
                                    <FormInputDate
                                        label=""
                                        name="imported_at"
                                        updateFormData={this.updateFormFilter}
                                        id="form-imported_at"
                                        value={this.state.filter.imported_at}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>Hẹn gọi lại</label>
                                    <FormInputDate
                                        label=""
                                        name="call_back_time"
                                        updateFormData={this.updateFormFilter}
                                        id="form-call_back_time"
                                        value={this.state.filter.call_back_time}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>Ngày thi xếp lớp</label>
                                    <FormInputDate
                                        label=""
                                        name="mock_exam_time"
                                        updateFormData={this.updateFormFilter}
                                        id="form-mock_exam_time"
                                        value={this.state.filter.mock_exam_time}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>Hẹn gặp mặt</label>
                                    <FormInputDate
                                        label=""
                                        name="appointment_time"
                                        updateFormData={this.updateFormFilter}
                                        id="form-appointment_time"
                                        value={this.state.filter.appointment_time}
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
                                {/*            className="react-select-white-round"*/}
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
                                            <ReactSelect
                                                disabled={this.props.isLoading}
                                                options={this.starFilter}
                                                onChange={e => this.changeRate(e.value)}
                                                value={this.state.rate}
                                                placeholer="Tất cả"
                                                className="width-100"
                                                name="rate"
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
                                {/*<div className="col-md-3">*/}
                                {/*    <div className="form-group margin-bottom-10">*/}
                                {/*        <label>Tỉnh/thành phố</label>*/}
                                {/*        <FormInputText name="address"*/}
                                {/*                       value={this.state.address}*/}
                                {/*                       placeholder="Nhập tỉnh/thành phố"*/}
                                {/*                       disabled={this.props.isLoading}*/}
                                {/*                       updateFormData={e => this.changeAddress(e.target.value)}*/}

                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
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
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label className="">
                                            Theo nguồn
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading || this.props.isLoadingSources}
                                            options={this.state.sourceFilter}
                                            onChange={e => this.onFilterChange(e, 'source_id')}
                                            value={this.state.source_id}
                                            placeholer="Tất cả"
                                            name="source_id"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label className="">
                                            Theo chiến dịch
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading || this.props.isLoadingCampaigns}
                                            options={this.state.campaignFilter}
                                            onChange={e => this.onFilterChange(e, 'campaign_id')}
                                            value={this.state.campaign_id}
                                            placeholer="Tất cả"
                                            name="campaign_id"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label>Lead trùng lặp</label>
                                        <div className="flex flex-row-center">
                                            <ReactSelect
                                                disabled={this.props.isLoading}
                                                options={this.duplicateFilter}
                                                onChange={e => this.onFilterChange(e ? e.value : e, 'duplicate')}
                                                value={this.state.duplicate}
                                                placeholer="Tất cả"
                                                className="width-100"
                                                name="duplicate"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label>Lead tag</label>
                                        <div className="flex flex-row-center">
                                            <ReactSelect
                                                disabled={this.props.isLoading}
                                                options={TAGS}
                                                onChange={e => this.onFilterChange(e ? e.value : e, 'lead_tag')}
                                                value={this.state.lead_tag}
                                                placeholer="Tất cả"
                                                className="width-100"
                                                name="lead_tag"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label>Tỉnh/thành phố</label>
                                    <ReactSelect
                                        defaultMessage="Chọn thành phố"
                                        options={this.getProvinces()}
                                        value={this.state.province_id}
                                        onChange={val => this.onFilterChange(val, 'province_id')}
                                        name="province_id"
                                        menuContainerStyle={{zIndex: 11}}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group margin-bottom-20">
                                        <label className="">
                                            Theo cơ sở
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading}
                                            options={this.getBases()}
                                            onChange={e => {
                                                this.onFilterChange(e ? e.value : 0, 'selectedBaseId');
                                                this.props.baseActions.selectedBase(e ? e.value : 0);
                                            }}
                                            value={this.state.selectedBaseId}
                                            placeholer="Tất cả"
                                        />
                                    </div>
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
                                <div className="btn button-green" onClick={this.copyShareUrl}>Sao chép đường dẫn</div>
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
                    currentPage={this.props.currentPage}
                    isDistribution={this.state.isDistribution}
                    selectedLeads={this.state.selectedLeads}
                    isAll={this.state.isAll}
                    changeStatusLead={this.changeStatusLead}
                    openCreateRegisterModal={this.openCreateRegisterModal}
                    // removeLead={this.props.route.type === "my-leads" ? this.removeLead : null}
                    removeLead={!this.isAdmin ? null : this.removeLead}
                />
                {!this.props.isLoading && this.nani &&
                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">
                        {this.state.isDistribution ?
                            <div className="">
                                <h5 className="card-title"><strong>Phân chia leads</strong></h5>
                                {/*{!this.props.isLoading &&*/}
                                {/*<div className="lead-count margin-vertical-30">Tổng số*/}
                                {/*    lead {this.props.totalCount}</div>}*/}
                            </div>
                            :
                            <div className="">
                                <h5 className="card-title">
                                    {/*<strong>{this.props.route.type === "my-leads" ? "Danh sách leads của bạn" : "Danh sách leads"} </strong>*/}
                                    <strong>{this.isAdmin ? "Danh sách leads của bạn" : "Danh sách leads"} </strong>
                                </h5>
                            </div>
                        }
                        <div>
                            <a
                                onClick={this.showExportFieldsModal}
                                className="text-white"
                                disabled={this.props.isLoading}
                            >Tải xuống
                            </a>
                        </div>
                        <div style={{marginTop: '10%'}}/>

                        <div className="flex-align-items-center flex flex-wrap">
                            {/*{this.props.route.type !== "my-leads" && !this.state.isDistribution &&*/}

                            <Search
                                onChange={this.searchChange}
                                placeholder="Tim kiếm leads"
                                value={this.state.search}
                                className="round-white-seacrh"
                                onSearch={this.onSearchLead}
                            />

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
                                onSuccess={() => {
                                    this.setState({staff: "", page: 1});
                                    this.resetLoad();
                                }}
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


                        </div>


                    </div>


                </div>
                }


                {this.state.isDistribution && !this.props.isLoading &&
                <div className="import-data-container" mask="leadContainer">
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
                                        Đã chọn: {selectedLeadsCount} lead
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
                                            className="react-select-white-round"
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
                                            Phân P.I.C
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
                            <h5><b>Tổng số leads: {selectedLeadsCount}</b>
                            </h5>
                            {this.state.selectedLeads && this.state.selectedLeads.length > 0 && this.renderButtonDistribution()}
                        </div>

                        <ListLead
                            showSelectedLead
                            leads={this.state.selectedLeads}
                            isAll={this.state.isAll}
                            deleteLeadSelected={this.deleteLeadSelected}
                            deleteAllSelected={this.deleteAllSelected}
                            selectedLeadsCount={selectedLeadsCount}
                            openCreateRegisterModal={this.openCreateRegisterModal}

                        />
                        {this.renderButtonDistribution()}
                    </Modal.Body>
                </Modal>

                <Modal
                    show={this.state.showLoadingAllLeadsModal}
                    // onHide={this.}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className="card-title">
                                Đang tải dữ liệu
                            </h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{minHeight: 100}}>
                            <Loading/>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showExportFieldsModal}
                    onHide={() => this.setState({showExportFieldsModal: false})}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="card-title">
                            Xuất dữ liệu (Export)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-grey">
                            {LEAD_EXPORT_FIELDS_ARRAY.map(field => {
                                // console.log(field);
                                return this.renderFieldExport(this.state.selectedExportFields[field.id]);
                            })}
                            <div className="flex flex-end">
                                <button type="button"
                                        disabled={this.props.isLoading}
                                        className="btn btn-white text-center"
                                        data-dismiss="modal"
                                        onClick={() => this.setState({showExportFieldsModal: false})}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success text-center btn-icon"
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={() => this.showLoadingAllLeadsModal()}>
                                    <span className="material-icons margin-right-5">vertical_align_bottom</span> Tải
                                    xuống

                                </button>
                            </div>
                        </form>
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
    // isUploading: PropTypes.bool.isRequired,
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
        provinces: state.global.provinces,
        leads: state.lead.leads,
        isLoading: state.lead.isLoading,
        totalPages: state.lead.totalPages,
        currentPage: state.lead.currentPage,
        // isUploading: state.lead.isUploading,
        errorUpload: state.lead.errorUpload,
        totalCount: state.lead.totalCount,
        isDistributing: state.lead.isDistributing,
        errorDistribution: state.lead.errorDistribution,
        user: state.login.user,
        statuses: state.infoStudent.statuses,
        isLoadedStatuses: state.infoStudent.isLoadedStatuses,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,
        isLoadedSources: state.createRegister.isLoadedSources,
        isLoadedCampaigns: state.createRegister.isLoadedCampaigns,
        isLoadingSources: state.createRegister.isLoadingSources,
        isLoadingCampaigns: state.createRegister.isLoadingCampaigns,
        sources: state.createRegister.sources,
        campaigns: state.createRegister.campaigns,
        bases: state.global.bases,
        selectedBaseId: state.global.selectedBaseId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch),
        leadActions: bindActionCreators(leadActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadContainer);
