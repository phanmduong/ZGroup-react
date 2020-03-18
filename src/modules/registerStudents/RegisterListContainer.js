import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ListRegister from "./ListRegister";
import ListClass from "./ListClass";
import * as registerActions from './registerActions';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import Select from './SelectGen';
import ReactSelect from 'react-select';
import {Modal, Panel} from 'react-bootstrap';
import * as helper from '../../helpers/helper';
import FormInputDate from '../../components/common/FormInputDate';
import moment from "moment";
import {
    DATE_FORMAT_SQL,
    DATETIME_FILE_NAME_FORMAT,
    DATETIME_FORMAT_SQL,
    TYPE_CLASSES_OBJECT
} from '../../constants/constants';
import ChangeInfoStudentModal from "./ChangeInfoStudentModal";
import * as createRegisterActions from './createRegisterActions';
import CreateRegisterModalContainer from './CreateRegisterModalContainer';
import Pagination from "../../components/common/Pagination";
import {openModalRegisterDetail} from "../globalModal/globalModalActions";
import CreateRegisterOverlay from "../infoStudent/overlays/CreateRegisterOverlay";
import * as studentActions from "../infoStudent/studentActions";
import EmptyData from "../../components/common/EmptyData";
import {isEmptyInput} from "../../helpers/helper";
import {setClipboard} from "../../helpers/helper";

class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit: 20,
            query: "",
            gens: [],
            selectGenId: '',
            showModal: false,
            showModalChangeClass: false,
            showChangeInfoStudent: false,
            showModalRegisterDetail: false,
            register: {},
            note: '',
            campaignId: '',
            selectRegisterId: 0,
            openFilterPanel: false,
            selectedClassId: '',
            selectedSalerId: '',
            registerSourceId: '',
            registerStatusId: '',
            selectedMoneyFilter: '',
            selectedClassStatus: '',
            selectedBookmarkStatus: '',
            selectedTeleCallStatus: '',
            selectedStudentId: '',
            classFilter: [],
            salerFilter: [],
            campaignFilter: [],
            baseFilter: [],
            cardTitle: 'Danh sách đăng kí học',
            moneyFilter: [
                {value: '', label: 'Tất cả',},
                {value: '1', label: 'Đã nộp',},
                {value: '0', label: 'Chưa nộp',},
            ],
            classStatusFilter: [
                {value: '', label: 'Tất cả',},
                {value: 'active', label: 'Hoạt động',},
                {value: 'waiting', label: 'Chờ',},
            ],
            bookmarkFilter: [
                {value: '', label: 'Tất cả',},
                {value: '1', label: 'Đã đánh dấu',},
                {value: '0', label: 'Chưa đánh dấu',},
            ],
            teleCallStatus: [
                {value: '', label: 'Tất cả̉',},
                {value: '0', label: 'Chưa gọi',},
                {value: '1', label: 'Thành công',},
                {value: '2', label: 'Thất bại',},
            ],
            time: {
                startTime: moment().subtract(30, 'days').format(DATE_FORMAT_SQL),
                endTime: moment().format(DATE_FORMAT_SQL),
                appointmentPayment: ''
            },
            allClassFilter: [],
            sourceFilter: [],
            statusFilter: [],
            selectedStudent: {},
            query_coupon: "",
            query_note: "",
            dateTest: ""
        };

        this.isWaitListPage = false;
        this.timeOut = null;
        this.tabViews = [
            {
                text: 'TẤT CẢ',
                value: '',
                label: "TẤT CẢ"
            },
            {
                value: this.props.user.id,
                label: "CỦA BẠN",
                text: 'CỦA BẠN',
            },
        ];
    }

    componentWillMount() {
        this.props.registerActions.loadGensData();
        this.props.registerActions.loadSalerFilter();
        this.props.registerActions.loadCampaignFilter();
        this.props.registerActions.loadBaseFilter();
        this.props.createRegisterActions.loadSources();
        this.props.studentActions.loadStatuses('registers');

        if (this.props.location.query) {
            const filter = {
                selectedClassId: this.props.location.query.class_id ? this.props.location.query.class_id : '',
                selectedSalerId: this.props.location.query.saler_id ? this.props.location.query.saler_id : '',
                registerSourceId: this.props.location.query.source_id ? this.props.location.query.source_id : '',
                registerStatusId: this.props.location.query.status_id ? this.props.location.query.status_id : '',
                selectedMoneyFilter: this.props.location.query.money_filter ? this.props.location.query.money_filter : '',
                selectedClassStatus: this.props.location.query.class_status ? this.props.location.query.class_status : '',
                selectedBookmarkStatus: this.props.location.query.bookmark_status ? this.props.location.query.bookmark_status : '',
                selectedTeleCallStatus: this.props.location.query.call_status ? this.props.location.query.call_status : '',
                selectedStudentId: this.props.location.query.student_id ? this.props.location.query.student_id : '',
                campaignId: this.props.location.query.campaign_id ? this.props.location.query.campaign_id : '',
                selectGenId: this.props.location.query.gen_id ? this.props.location.query.gen_id : '',
                selectedBaseId: this.props.location.query.base_id ? this.props.location.query.base_id : '',
                query: this.props.location.query.query ? this.props.location.query.query : '',
                query_coupon: this.props.location.query.query_coupon ? this.props.location.query.query_coupon : '',
                query_note: this.props.location.query.query_note ? this.props.location.query.query_note : '',
                page: 1,
                appointmentPayment: this.props.location.query.appointmentPayment ? this.props.location.query.appointmentPayment : '',
                startTime: this.props.location.query.start_time ? this.props.location.query.start_time : this.state.time.startTime,
                endTime: this.props.location.query.end_time ? this.props.location.query.end_time : this.state.time.endTime
            };
            this.setState(filter);
        }
        if (this.props.route.path === '/sales/waitlist') {
            this.isWaitListPage = true;
            this.setState({selectedClassStatus: 'waiting', cardTitle: 'Danh sách chờ', query: ''});
        }
        if (this.state.selectGenId) {
            this.props.registerActions.loadRegisterStudent(
                this.state
            );
        }
        // if (this.props.params.salerId) {
        //     this.props.registerActions.loadRegisterStudent({
        //         page: 1,
        //         query: '',
        //         campaignId: '',
        //         selectGenId: '',
        //         selectedSalerId: Number(this.props.params.salerId),
        //     });
        //     this.setState({
        //         page: 1,
        //         query: '',
        //         campaignId: '',
        //         selectGenId: '',
        //         selectedSalerId: Number(this.props.params.salerId),
        //     });
        //
        // } else {
        //     if (this.props.params.genId && this.props.params.campaignId) {
        //         this.props.registerActions.loadRegisterStudent({
        //             page: 1,
        //             query: '',
        //             campaignId: Number(this.props.params.campaignId),
        //             selectGenId: Number(this.props.params.genId),
        //         });
        //         this.setState({
        //             page: 1,
        //             query: '',
        //             campaignId: Number(this.props.params.campaignId),
        //             selectGenId: Number(this.props.params.genId),
        //         });
        //
        //     } else {
        //         if (this.props.route.path === '/sales/waitlist') {
        //             // this.onClassStatusFilterChange({value: 'waiting'});
        //         }
        //     }
        // }

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingClassFilter && this.props.isLoadingClassFilter) {
            this.setState({
                classFilter: this.getFilter(nextProps.classFilter),
                allClassFilter: this.getFilter(nextProps.classFilter),
            });
            this.onClassStatusFilterChange({value: this.state.selectedClassStatus}, nextProps.classFilter);

        }
        if (!nextProps.isLoadingSalerFilter && this.props.isLoadingSalerFilter) {
            let filter = this.getSalerFilter(nextProps.salerFilter);
            this.setState({
                salerFilter: filter
            });
        }
        if (!nextProps.isLoadingCampaignFilter && this.props.isLoadingCampaignFilter) {
            this.setState({
                campaignFilter: this.getSalerFilter(nextProps.campaignFilter),
            });
        }

        if (!nextProps.isLoadingBaseFilter && this.props.isLoadingBaseFilter) {

            this.setState({
                baseFilter: this.getBaseFilter(nextProps.baseFilter),
            });
        }
        if (!nextProps.isLoadingSources && this.props.isLoadingSources) {
            this.setState({
                sourceFilter: this.getSourceFilter(nextProps.sources),
            });
        }
        if (!nextProps.isLoadingStatuses && this.props.isLoadingStatuses) {
            this.setState({
                statusFilter: this.getStatusFilter(nextProps.statuses.registers),
            });
        }
        if (!nextProps.isLoadingGens && this.props.isLoadingGens) {

            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens).map(g => {
                return {
                    ...g,
                    start_time: moment(g.start_time).format(DATE_FORMAT_SQL),
                    end_time: moment(g.end_time).format(DATE_FORMAT_SQL),
                };
            });
            gens = [{id: '', name: 'Tất cả', start_time: '', end_time: '',}, {
                id: 0, name: '30 ngày qua',
                start_time: moment().subtract(30, 'days'),
                end_time: moment(),
            }, ...gens];
            // const genId = this.state.selectGenId;
            let currentGen = gens.filter(g => g.id == this.state.selectGenId)[0] || {};
            let newState = {
                ...this.state,
                gens,
                // selectGenId: genId,
                startTime: currentGen.start_time,
                endTime: currentGen.end_time,
            };
            if ((currentGen.id === '' || isEmptyInput(currentGen.id)) && currentGen.name !== 'Tất cả') {
                newState.startTime = this.state.startTime;
                newState.endTime = this.state.endTime;
            }
            this.setState(newState);
            this.props.registerActions.loadClassFilter(this.state.selectGenId);
            this.props.registerActions.loadRegisterStudent(
                {...newState, page: 1,},
            );
        }

        if (!nextProps.isLoadingRegisters && this.props.isLoadingRegisters) {
            this.setState({
                selectGenId: nextProps.genId
            });
        }

        if (nextProps.selectedBaseId !== this.props.selectedBaseId) {
            this.props.registerActions.loadRegisterStudent(
                {
                    ...this.state,
                    page: 1,
                    selectedBaseId: this.state.selectedBaseId ? this.state.selectedBaseId : nextProps.selectedBaseId,
                },
            );
            this.setState({
                page: 1,
                // selectedClassId: '',
                selectedBaseId: this.state.selectedBaseId ? this.state.selectedBaseId : nextProps.selectedBaseId,
                classFilter: this.getFilter(this.props.classFilter, nextProps.selectedBaseId)
            });
            // this.loadDashboard(this.state.selectGenId, nextProps.selectedBaseId);
        }

        if (nextProps.route.path != this.props.route.path) {
            location.reload();
        }

        // if (nextProps.params.salerId && nextProps.params.salerId !== this.props.params.salerId) {
        //     this.props.registerActions.loadRegisterStudent(
        //         {...this.state, page: 1, selectedSalerId: Number(nextProps.params.salerId),},
        //         1,//page
        //         this.state.limit,
        //         this.state.selectGenId,
        //         this.state.query,
        //         Number(nextProps.params.salerId),
        //         this.state.campaignId,
        //         this.state.selectedClassId,
        //         this.state.selectedMoneyFilter,
        //         this.state.selectedClassStatus,
        //         this.state.time.startTime,
        //         this.state.time.endTime,
        //         this.props.selectedBaseId,
        //         this.state.time.appointmentPayment,
        //         this.state.query_coupon,
        //         this.state.selectedTeleCallStatus,
        //         this.state.selectedBookmarkStatus
        //     );
        //     this.setState({
        //         page: 1,
        //         selectedSalerId: Number(nextProps.params.salerId),
        //     });
        // } else if (nextProps.location.pathname != this.props.location.pathname) {
        //     this.setState({
        //         query: '',
        //         showModal: false,
        //         showModalChangeClass: false,
        //         campaignId: '',
        //         selectRegisterId: 0,
        //         selectedClassId: '',
        //         selectedSalerId: '',
        //         selectedMoneyFilter: '',
        //         time: {
        //             startTime: '',
        //             endTime: '',
        //             appointmentPayment: ''
        //         },
        //     });
        //     if (nextProps.route.path == '/sales/waitlist') {
        //         this.isWaitListPage = true;
        //         this.props.registerActions.loadRegisterStudent({
        //             page: 1,
        //             selectedClassStatus: 'waiting',
        //         });
        //         this.changeClassStatusFilter({value: 'waiting'});
        //         this.setState({
        //             page: 1,
        //             selectedClassStatus: 'waiting',
        //             cardTitle: 'Danh sách chờ',
        //         });
        //     } else {
        //         this.changeClassStatusFilter({value: ''});
        //         this.isWaitListPage = false;
        //         this.setState({
        //             page: 1,
        //             selectedClassStatus: '',
        //             cardTitle: 'Danh sách đăng kí học'
        //         });
        //         if (nextProps.params.salerId) {//1
        //             this.props.registerActions.loadRegisterStudent({
        //                 page: 1,
        //                 campaignId: '',
        //                 selectGenId: '',
        //                 selectedClassStatus: '',
        //                 selectedSalerId: nextProps.params.salerId,
        //             });
        //             this.setState({
        //                 page: 1,
        //                 campaignId: '',
        //                 selectGenId: '',
        //                 selectedClassStatus: '',
        //                 selectedSalerId: nextProps.params.salerId,
        //             });
        //         } else {//2
        //             if (nextProps.params.genId && nextProps.params.campaignId) {
        //                 this.props.registerActions.loadRegisterStudent({
        //                     page: 1,
        //                     campaignId: Number(nextProps.params.campaignId),
        //                     selectGenId: Number(nextProps.params.genId)
        //                 });
        //                 this.setState({
        //                     page: 1,
        //                     campaignId: Number(nextProps.params.campaignId),
        //                     selectGenId: Number(nextProps.params.genId)
        //                 });
        //             } else {//3
        //                 this.props.registerActions.loadRegisterStudent({
        //                     page: 1,
        //                 });
        //                 this.setState({
        //                     page: 1,
        //                 });
        //             }
        //         }
        //     }
        // }
    }


    copyShareUrl = () => {
        let url = this.getFilterUrlWithParams(this.state);
        setClipboard(url, true);
    };

    getFilterUrlWithParams = (newFilter = {}) => {
        let current_link = window.location.href.split('?')[0];
        let {
            selectedClassId, selectedSalerId, registerSourceId, registerStatusId, selectedMoneyFilter, selectedClassStatus, selectedBookmarkStatus,
            selectedTeleCallStatus, selectedStudentId, campaignId, selectGenId, selectedBaseId, query, query_note, query_coupon, appointmentPayment, endTime, startTime,date_test
        } = this.state;
        current_link += `?class_id=${selectedClassId}&saler_id=${(newFilter.saler_id || newFilter.saler_id === '') ? newFilter.saler_id : selectedSalerId}&source_id=${registerSourceId}` +
            `&status_id=${registerStatusId}&money_filter=${selectedMoneyFilter}&class_status=${selectedClassStatus}&bookmark_status=${selectedBookmarkStatus}` +
            `&call_status=${selectedTeleCallStatus}&student_id=${selectedStudentId}&campaign_id=${campaignId}&gen_id=${selectGenId}` +
            `&base_id=${selectedBaseId}&query=${query}&start_time=${startTime}&end_time=${endTime}&query_note=${query_note}&date_test=${date_test}&appointmentPayment=${appointmentPayment}&query_coupon=${query_coupon}`;
        return current_link;
    };

    openLinkWithFilter = (newFilter = {}) => {
        let current_link = this.getFilterUrlWithParams(newFilter);
        window.open(current_link, "_self");
    };

    onClassFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        }
        // if (res != this.state.selectedClassId)
        //     this.props.registerActions.loadRegisterStudent(
        //         {...this.state, page: 1, selectedClassId: obj ? obj.value : ''},
        //     );
        this.setState({selectedClassId: res, page: 1});
    };

    changeStatusPause = (register) => {
        helper.confirm('warning', 'Bảo lưu', `Bạn có muốn cho học viên ${register.name} của lớp ${register.class.name}  thực hiện bảo lưu không?`, () => {
            this.props.registerActions.changeStatusPause(register.id);
        });
    };

    changeMarkRegister = (register_id, bookmark) => {

        this.props.registerActions.changeMarkRegister(register_id, bookmark);

    };

    onSalerFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        }
        // if (res != this.state.selectedSalerId)
        //     this.props.registerActions.loadRegisterStudent(
        //         {...this.state, page: 1, selectedSalerId: res,},
        //     );
        this.setState({selectedSalerId: res, page: 1});
    };

    onCampaignFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        } else {
            res = '';
        }
        // if (res != this.state.campaignId)
        //     this.props.registerActions.loadRegisterStudent(
        //         {...this.state, campaignId: res, page: 1},
        //     );
        this.setState({campaignId: res, page: 1});
    };

    onMoneyFilterChange = (obj) => {
        let res = obj ? obj.value : '';
        // if (this.state.selectedMoneyFilter != res)
        //     this.props.registerActions.loadRegisterStudent(
        //         {...this.state, page: 1, selectedMoneyFilter: res,},
        //     );
        this.setState({selectedMoneyFilter: res, page: 1});
    };

    onClassStatusFilterChange = (obj, filter) => {
        let res = obj ? obj.value : '';
        let newfilter = filter ? filter : this.state.allClassFilter;
        if (res === 'waiting') {
            newfilter = newfilter.filter(item => (item.type === 'waiting'));
        } else if (res === 'active') {
            newfilter = newfilter.filter(item => (item.type === 'active'));
        }
        // this.props.registerActions.loadRegisterStudent(
        //     {
        //         ...this.state, page: 1,
        //         selectedClassId: '',
        //         selectedClassStatus: res,
        //     },
        // );

        this.setState({
            classFilter: this.getFilter(newfilter),
            selectedClassId: this.state.selectedClassId ? this.state.selectedClassId : '',
            selectedClassStatus: res,
            page: 1
        });
    };

    onTeleCallStatusFilterChange = (obj) => {
        let res = obj ? obj.value : '';
        // this.props.registerActions.loadRegisterStudent(
        //     {...this.state, page: 1, selectedTeleCallStatus: res,},
        // );

        this.setState({
            selectedTeleCallStatus: res,
            page: 1
        });
    };

    updateFormDate = (event) => {
        const field = event.target.name;
        let newState = {...this.state};
        newState[field] = event.target.value;
        // let {endTime,startTime} = this.state;
        // if ((!helper.isEmptyInput(startTime) && !helper.isEmptyInput(endTime)) || event.target.name == 'appointmentPayment') {
        //     this.setState({ ...newState});
        // } else {
        this.setState(newState);
        // }
    };

    getFilter = (arr, base_id) => {
        if (!arr) return [];
        if (!helper.isEmptyInput(base_id)) {
            arr = arr.filter((classItem) => classItem.base_id == base_id);
        }
        let data = arr.map(function (obj) {
            return {
                value: obj.id ? obj.id : obj.value,
                label: obj.name ? obj.name : obj.label,
                type: obj.type,
            };
        });
        let bol = data[0] && (data[0].value == '');
        return bol ? data : [{
            value: '',
            label: 'Tất cả'
        }, ...data];
    };

    getSalerFilter = (arr) => {
        if (!arr) return [];
        let data = arr.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name ? obj.name : obj.label,
                type: obj.type,
            };
        });

        return [{
            value: '',
            label: 'Tất cả'
        }, {
            value: '-1',
            label: 'Không có'
        }, ...data];
    };

    getBaseFilter = (arr) => {
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

    getSourceFilter = (arr) => {
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

    openFilterPanel = () => {
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    };

    closeModal = () => {
        this.setState({showModal: false});
    };

    openModal = () => {
        this.setState(
            {
                showModal: true,
                note: '',
                appointmentPayment: ''
            }
        );
    };

    closeModalChangeClass = () => {
        this.setState({showModalChangeClass: false});
    };

    openModalChangeClass = (registerId) => {
        this.setState({
            showModalChangeClass: true,
            selectRegisterId: registerId
        });
        this.props.registerActions.loadClasses(registerId);
    };

    viewCall = (register) => {
        this.props.registerActions.loadHistoryCallStudent(register.student_id, register.id);
        this.props.registerActions.loadRegisterByStudent(register.student_id);
        this.setState({register});
        this.openModal();
    };

    loadRegisterStudentByCampaign = (campaignId) => {
        this.setState({
            page: 1,
            campaignId,
        });
        this.onCampaignFilterChange({value: campaignId});
    };

    loadRegisterStudent = (page) => {
        this.setState({
            page,
        });
        this.props.registerActions.loadRegisterStudent(
            {...this.state, page,},
        );
    };

    registersSearchChange = (value) => {
        this.setState({
            page: 1,
            query: value,
        });
    };

    onSearchRegisters = () => {
        this.props.registerActions.loadRegisterStudent(
            {...this.state},
        );
    }

    onBookmarkStatusFilterChange = (obj) => {
        let res = obj ? obj.value : '';
        // this.props.registerActions.loadRegisterStudent(
        //     {...this.state, page: 1, selectedBookmarkStatus: res,},
        // );

        this.setState({
            selectedBookmarkStatus: res,
            page: 1
        });
    };

    searchByText = (value, name) => {
        this.setState({
            page: 1,
            [name]: value,
        });
        // if (this.timeOut !== null) {
        //     clearTimeout(this.timeOut);
        // }
        // this.timeOut = setTimeout(function () {
        //     this.props.registerActions.loadRegisterStudent(
        //         {...this.state, page: 1, [name]: value,},
        //     );
        // }.bind(this), 500);
    };

    changeGens = (value) => {
        let gen = this.state.gens.filter(g => g.id == value)[0] || {};
        let startTime = gen.start_time || '';
        let endTime = gen.end_time || '';

        this.setState({
            page: 1,
            selectGenId: value,
            startTime, endTime,
        });
        this.props.registerActions.loadRegisterStudent(
            {
                ...this.state,
                page: 1,
                // selectGenId: value,
                startTime, endTime,
                selectedClassId: this.state.selectedClassId ? this.state.selectedClassId : ''
            },
        );
        this.props.registerActions.loadClassFilter(value);
    };

    addLeadSuccess = () => {
        this.props.registerActions.loadRegisterStudent({...this.state,},);
    };

    onFilterChange = (obj, field) => {
        this.setState({[field]: obj ? obj.id : ''});
        // this.props.registerActions.loadRegisterStudent({...this.state, page: 1, [field]: obj ? obj.id : ''});
    };

    applyFilter = () => {
        if (!this.props.isLoading) this.props.registerActions.loadRegisterStudent({
            ...this.state,
        });
    };


    changeCallStatusStudent = (callStatus, studentId) => {
        this.props.registerActions.changeCallStatusStudent(callStatus, studentId, this.props.telecallId, this.state.selectGenId, this.state.note, this.closeModal, '', this.state.appointmentPayment, this.state.dateTest);
    };

    deleteRegister = (register) => {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa đăng kí này không?", () => {
            this.props.registerActions.deleteRegisterStudent(register.id);
        });
    };

    confirmChangeClass = (classData) => {
        this.props.registerActions.confirmChangeClass(this.state.selectRegisterId, classData.id, this.closeModalChangeClass);
    };

    showLoadingModal = () => {
        this.props.registerActions.loadAllRegisterStudent({
            ...this.state,
            page: '',//page
            selectGenId: this.state.selectGenId,
            query: this.state.query,
            selectedSalerId: this.state.selectedSalerId,
            campaignId: this.state.campaignId,
            selectedClassId: this.state.selectedClassId,
            selectedMoneyFilter: this.state.selectedMoneyFilter,
            selectedClassStatus: this.state.selectedClassStatus,
            startTime: this.state.time.startTime,
            endTime: this.state.time.endTime,
            selectedBaseId: this.props.selectedBaseId,
            appointmentPayment: this.state.time.appointmentPayment,
            query_coupon: this.state.query_coupon,
            bookmark: this.state.selectedBookmarkStatus,
            exportExcel: this.closeLoadingModal
        });
    };

    closeLoadingModal = () => {

        let json = this.props.excel;
        if (!json || !json.registers || json.registers.length == 0) {
            helper.showErrorNotification("Không có dữ liệu");
            return;
        }
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 30}, {"wch": 30}, {"wch": 12}, {"wch": 12}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 15}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 22},];//độ rộng cột
        //begin điểm danh
        json = this.props.excel.registers.map((item, index) => {
            if (item) {
                /* eslint-disable */
                let titleCall = 'Chưa gọi';
                if (item.call_status === 'success') {
                    titleCall = 'Gọi thành công';
                } else if (item.call_status === 'failed') {
                    titleCall = 'Gọi thất bại';
                } else if (item.call_status === 'calling') {
                    titleCall = 'Đang gọi';
                }
                let res = {
                    'STT': index + 1,
                    'Lớp': item.class ? item.class.name : 'Không có',
                    'Loại lớp': item.class ? TYPE_CLASSES_OBJECT[item.class.type] : 'Không có',
                    'Môn học': item.class ? item.class.course_name : 'Không có',
                    'Gọi': titleCall,
                    'Họ tên': item.name,
                    'Email': item.email,
                    'Phone': item.phone,
                    'Thành phố': (item.class && item.class.base_province) ? item.class.base_province : 'Không có',
                    'Mã thẻ': item.code,
                    'Học phí': item.money,
                    'Saler': item.saler ? item.saler.name : "Không có",
                    'Chiến dịch': item.campaign ? item.campaign.name : "Không có",
                    'Cơ sở': (item.class && item.class.base_name) ? item.class.base_name : 'Không có',
                    'Nguồn': item.source ? item.source.name : "Không có",
                    'Cách tiếp cận': item.how_know ? item.how_know : "Không có",
                    'Ngày đăng kí': item.created_at,
                    'Ngày': item.created_at_date,
                    'Giờ': item.created_at_time,
                };
                /* eslint-enable */
                return res;
            }
        });
        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(json, wb, 'Danh sách', cols, []);
        let gen = this.state.gens.filter(gen => (gen.id == this.state.selectGenId));
        let startTime = moment(this.state.time.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.time.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let empt1 = helper.isEmptyInput(this.state.time.startTime);
        let empt2 = helper.isEmptyInput(this.state.time.endTime);
        helper.saveWorkBookToExcel(wb,
            'Danh sách đăng kí' +
            (
                (empt1 || empt2)
                    ? (gen[0] ? ` - Khóa ${gen[0].name}` : '')
                    :
                    (`${helper.isEmptyInput(this.state.time.startTime) ? '' : (' - ' + startTime)}` +
                        `${helper.isEmptyInput(this.state.time.endTime) ? '' : (' - ' + endTime)}`)
            )
        );
    };

    openModalChangeInfoStudent = (obj) => {
        this.setState({showChangeInfoStudent: true, selectedStudent: obj});
    };

    updateModalChangeInfoStudent = (e) => {
        let feild = e.target.name;
        let value = e.target.value;
        if (feild == "paid_status") {
            value = !this.state.selectedStudent.paid_status;
        }
        this.setState({selectedStudent: {...this.state.selectedStudent, [feild]: value}});
    };

    commitModalChangeInfoStudent(obj) {
        this.props.registerActions.changeInfoStudent(obj, this.closeModalChangeInfoStudent);
    }

    closeModalChangeInfoStudent = () => {
        this.setState({showChangeInfoStudent: false});


    };

    openCreateRegisterModal = () => {
        this.props.createRegisterActions.showCreateRegisterModal(true);
    };

    addMyLead = (userID) => {
        this.props.registerActions.uploadDistributionLead(userID, this.addLeadSuccess);
    };

    openModalRegisterDetail = (selectedStudentId) => {
        openModalRegisterDetail(`/sales/info-student/${selectedStudentId}`);
    };


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <CreateRegisterModalContainer/>
                </div>
                <div>


                    {!this.props.isLoadingGens &&
                    <div>

                        <div className="card" mask="purple">
                            <img className="img-absolute"/>
                            <div className="card-content">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="flex-row flex">
                                            <h2 className="card-title">
                                                <strong>Danh sách đăng kí</strong>
                                            </h2>
                                        </div>
                                        <div>
                                            <a
                                                onClick={this.showLoadingModal}
                                                className="text-white"
                                                disabled={
                                                    this.props.isLoadingGens ||
                                                    // this.props.isLoadingClassFilter ||
                                                    this.props.isLoading ||
                                                    this.props.isLoadingRegisters ||
                                                    this.props.isLoadingBaseFilter ||
                                                    this.props.isLoadingExcel
                                                }
                                            >
                                                Tải xuống
                                            </a>
                                        </div>
                                        <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                            <Search
                                                onChange={this.registersSearchChange}
                                                value={this.state.query}
                                                placeholder="Tìm kiếm học viên"
                                                className="round-white-seacrh"
                                                onSearch={this.onSearchRegisters}
                                            />
                                            <button
                                                onClick={this.openFilterPanel}
                                                className="btn btn-white btn-round btn-icon"
                                                disabled={
                                                    this.props.isLoadingGens ||
                                                    // this.props.isLoadingClassFilter ||
                                                    this.props.isLoadingBaseFilter ||
                                                    this.props.isLoading ||
                                                    this.props.isLoadingRegisters
                                                }
                                            >
                                                Lọc
                                            </button>
                                            {/*{*/}
                                            {/*    (this.state.selectGenId && this.state.selectGenId >= 0) &&*/}
                                            <Select
                                                options={this.state.gens}
                                                onChange={this.changeGens}
                                                value={this.state.selectGenId}
                                                defaultMessage="Chọn khóa học"
                                                name="gens"
                                            />
                                            {/*}*/}
                                            {/*<button*/}
                                            {/*    className="btn btn-white btn-round btn-icon"*/}
                                            {/*    type="button"*/}
                                            {/*    onClick={this.openCreateRegisterModal}*/}
                                            {/*>*/}
                                            {/*    Thêm đăng kí&nbsp;&nbsp;<i className="material-icons">*/}
                                            {/*    add*/}
                                            {/*</i>*/}

                                            {/*</button>*/}
                                            <CreateRegisterOverlay
                                                className="btn btn-white btn-round btn-icon"
                                                onSuccess={() => this.loadRegisterStudent(1)}
                                            />

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                            {this.tabViews.map((tab, key) => {
                                let className = tab.value == this.state.selectedSalerId ? 'active' : '';
                                return (<li className={className} key={key}
                                            onClick={() => this.openLinkWithFilter({"saler_id": tab.value})}>
                                    <a>{tab.text}</a>
                                </li>);
                            })}
                        </ul>
                        <Panel collapsible expanded={
                            this.state.openFilterPanel
                            &&
                            !(this.props.isLoadingGens ||
                                // this.props.isLoadingClassFilter ||
                                this.props.isLoadingBaseFilter ||
                                this.props.isLoadingRegisters)
                        }>
                            <div className="card-filter">

                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="">
                                            Theo lớp học
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoadingClassFilter || this.props.isLoading}
                                            className=""
                                            options={this.state.classFilter}
                                            onChange={this.onClassFilterChange}
                                            value={this.state.selectedClassId}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_class"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="">
                                            Theo Saler
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoadingSalerFilter || this.props.isLoading}
                                            options={this.state.salerFilter}
                                            onChange={this.onSalerFilterChange}
                                            value={this.state.selectedSalerId}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_saler"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="">
                                            Theo Chiến dịch
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoadingCampaignFilter || this.props.isLoading}
                                            options={this.state.campaignFilter}
                                            onChange={this.onCampaignFilterChange}
                                            value={this.state.campaignId}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_campaign"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="">
                                            Theo học phí
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading}
                                            options={this.state.moneyFilter}
                                            onChange={this.onMoneyFilterChange}
                                            value={this.state.selectedMoneyFilter}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_money"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Từ ngày</label>
                                        <FormInputDate
                                            label=""
                                            name="startTime"
                                            updateFormData={this.updateFormDate}

                                            id="form-start-time"
                                            value={this.state.startTime}
                                            maxDate={this.state.endTime}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Đến ngày</label>
                                        <FormInputDate
                                            label=""
                                            name="endTime"
                                            updateFormData={this.updateFormDate}
                                            id="form-end-time"
                                            value={this.state.endTime}
                                            minDate={this.state.startTime}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="">
                                            Theo trạng thái lớp
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading || this.isWaitListPage}
                                            options={this.state.classStatusFilter}
                                            onChange={this.onClassStatusFilterChange}
                                            value={this.state.selectedClassStatus}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_class_status"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="">
                                            Theo trạng thái cuộc gọi
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading || this.isWaitListPage}
                                            options={this.state.teleCallStatus}
                                            onChange={this.onTeleCallStatusFilterChange}
                                            value={this.state.selectedTeleCallStatus}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_class_status"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Hẹn ngày nộp tiền"
                                            name="appointmentPayment"
                                            updateFormData={this.updateFormDate}
                                            id="form-appointment-payment"
                                            value={this.state.appointmentPayment}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Hẹn ngày test"
                                            name="date_test"
                                            updateFormData={this.updateFormDate}
                                            id="form-date-test"
                                            value={this.state.date_test}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Search
                                            onChange={e => this.searchByText(e, 'query_coupon')}
                                            value={this.state.query_coupon}
                                            label="Tìm kiếm theo coupon"
                                            placeholder="Nhập coupon"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Search
                                            onChange={e => this.searchByText(e, 'query_note')}
                                            value={this.state.query_note}
                                            label="Tìm kiếm theo note"
                                            placeholder="Nhập note"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label>
                                            Theo đánh dấu
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading}
                                            options={this.state.bookmarkFilter}
                                            onChange={this.onBookmarkStatusFilterChange}
                                            value={this.state.selectedBookmarkStatus}
                                            defaultMessage="Tuỳ chọn"
                                            name="filter_bookmark_status"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="">
                                            Theo trạng thái
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading || this.props.isLoadingStatuses}
                                            options={this.state.statusFilter}
                                            onChange={e => this.onFilterChange(e, 'registerStatusId')}
                                            value={this.state.registerStatusId}
                                            defaultMessage="Tuỳ chọn"
                                            name="registerStatusId"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="">
                                            Theo nguồn
                                        </label>
                                        <ReactSelect
                                            disabled={this.props.isLoading || this.props.isLoadingSources}
                                            options={this.state.sourceFilter}
                                            onChange={e => this.onFilterChange(e, 'registerSourceId')}
                                            value={this.state.registerSourceId}
                                            defaultMessage="Tuỳ chọn"
                                            name="registerSourceId"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <div className="flex flex-end">
                                            <div className="btn button-green"
                                                 onClick={this.copyShareUrl}>Sao chép đường dẫn
                                            </div>
                                            <div className="btn button-green"
                                                 onClick={this.applyFilter}>Áp dụng
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="row hidden">
                                    <div className="col-sm-2">
                                        <div className={"flex"}>
                                            <div
                                                style={{
                                                    background: '#ffffff',
                                                    border: 'solid 1px',
                                                    height: '15px',
                                                    width: '30px',
                                                    margin: '3px 10px'
                                                }}/>
                                            < p> Chưa đóng tiền</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className={"flex"}>
                                            <div style={{
                                                background: '#dff0d8',
                                                height: '15px',
                                                width: '30px',
                                                margin: '3px 10px'
                                            }}/>
                                            <p>Đã nộp tiền</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className={"flex"}>
                                            <div
                                                style={{
                                                    background: '#fcf8e3',
                                                    height: '15px',
                                                    width: '30px',
                                                    margin: '3px 10px'
                                                }}/>
                                            <p>Danh sách chờ</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className={"flex"}>
                                            <div style={{
                                                background: '#f2dede',
                                                height: '15px',
                                                width: '30px',
                                                margin: '3px 10px'
                                            }}/>
                                            <p> Đang bảo lưu</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className={"flex"}>
                                            <div style={{
                                                background: '#daedf7',
                                                height: '15px',
                                                width: '30px',
                                                margin: '3px 10px'
                                            }}/>
                                            <p>Đang học lại</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className={"flex"}>
                                            <div style={{
                                                background: '#8c8c8c',
                                                height: '15px',
                                                width: '30px',
                                                margin: '3px 10px'
                                            }}/>
                                            <p>Đã học xong</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {
                            this.props.isLoadingRegisters ||
                            // this.props.isLoadingClassFilter ||
                            this.props.isLoadingBaseFilter ||
                            this.props.isLoading ?
                                <Loading/> :
                                (
                                    this.props.registers && this.props.registers.length > 0 ?
                                        <ListRegister
                                            openLinkWithFilter={this.openLinkWithFilter}
                                            genId={this.state.selectGenId}
                                            registers={this.props.registers}
                                            isChangingBookmark={this.props.isChangingBookmark}
                                            viewCall={this.viewCall}
                                            deleteRegister={this.deleteRegister}
                                            loadRegisterStudentBySaler={this.loadRegisterStudentBySaler}
                                            loadRegisterStudentByCampaign={this.loadRegisterStudentByCampaign}
                                            openModalChangeClass={this.openModalChangeClass}
                                            openModalChangeInfoStudent={this.openModalChangeInfoStudent}
                                            openModalRegisterDetail={this.openModalRegisterDetail}
                                            changeStatusPause={this.changeStatusPause}
                                            changeMarkRegister={this.changeMarkRegister}
                                            addMyLead={this.addMyLead}
                                        />
                                        :
                                        <EmptyData title={"Không có dữ liệu đăng kí học"}/>
                                )

                        }
                        {
                            this.props.registers && this.props.registers.length > 0 &&
                            <div className="row float-right">
                                <div
                                    className="col-md-12"
                                    style={{textAlign: "right"}}
                                >
                                    <Pagination
                                        totalPages={
                                            this.props.totalPages
                                        }
                                        currentPage={
                                            this.state.page
                                        }
                                        loadDataPage={this.loadRegisterStudent}
                                    />
                                </div>
                            </div>
                        }


                    </div>
                    }

                </div>


                <Modal show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>Thông tin học viên</Modal.Title>
                    </Modal.Header>
                    {this.state.register.name &&
                    <Modal.Body>

                        <div className="panel-group" id="accordion"
                             role="tablist" aria-multiselectable="true">
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab"
                                     id="headingOne">

                                    <a role="button" data-toggle="collapse"
                                       data-parent="#accordion"
                                       href="#collapseOne"
                                       aria-expanded="false"
                                       aria-controls="collapseOne"
                                       className="collapsed">
                                        <h4 className="panel-title">
                                            Thông tin học viên
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseOne"
                                     className="panel-collapse collapse"
                                     role="tabpanel"
                                     aria-labelledby="headingOne"
                                     aria-expanded="false"
                                     style={{height: '0px'}}>
                                    <div className="panel-body">
                                        <div className="flex-row-center"><i
                                            className="material-icons">account_circle</i><b>&nbsp; &nbsp; {this.state.register.name} </b>
                                        </div>
                                        <div className="flex-row-center"><i
                                            className="material-icons">phone</i><b>&nbsp; &nbsp; {helper.formatPhone(this.state.register.phone)} </b>
                                        </div>
                                        <div className="flex-row-center"><i
                                            className="material-icons">email</i>&nbsp; &nbsp; {this.state.register.email}
                                        </div>
                                        {this.state.register.university &&
                                        <div className="flex-row-center"><i
                                            className="material-icons">account_balance</i>&nbsp; &nbsp; {this.state.register.university}
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab"
                                 id="headingTwo">
                                <a className="collapsed" role="button"
                                   data-toggle="collapse"
                                   data-parent="#accordion"
                                   href="#collapseTwo" aria-expanded="false"
                                   aria-controls="collapseTwo">
                                    <h4 className="panel-title">
                                        Thông tin lớp học
                                        <i className="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseTwo"
                                 className="panel-collapse collapse"
                                 role="tabpanel"
                                 aria-labelledby="headingTwo"
                                 aria-expanded="false"
                                 style={{height: '0px'}}>
                                <div className="panel-body">
                                    <div className="flex-row-center">
                                        <i className="material-icons">class</i>
                                        <b>&nbsp; &nbsp;{this.state.register.class.name.trim()} </b>
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">access_time</i>
                                        <b>&nbsp; &nbsp; {this.state.register.class.study_time} </b>
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">home</i>&nbsp; &nbsp;
                                        {this.state.register.class.room + ' - ' + this.state.register.class.base}
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">date_range</i>&nbsp; &nbsp; {this.state.register.class.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab"
                                 id="headingThree">
                                <a className="collapsed" role="button"
                                   data-toggle="collapse"
                                   data-parent="#accordion"
                                   href="#collapseThree"
                                   aria-expanded="false"
                                   aria-controls="collapseThree">
                                    <h4 className="panel-title">
                                        Thông tin đăng kí
                                        <i className="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>

                            <div id="collapseThree"
                                 className="panel-collapse collapse"
                                 role="tabpanel"
                                 aria-labelledby="headingThree"
                                 aria-expanded="false"
                                 style={{height: '0px'}}>
                                {
                                    this.props.isLoadingRegistersByStudent ?
                                        <Loading/> :
                                        <ul className="timeline timeline-simple">
                                            {
                                                this.props.registersByStudent.map(function (register, index) {
                                                    return (
                                                        <li className="timeline-inverted"
                                                            key={index}>
                                                            <div
                                                                className="timeline-badge">
                                                                <img
                                                                    className="circle size-40-px"
                                                                    src={register.class.avatar_url}
                                                                    alt=""/>
                                                            </div>
                                                            <div
                                                                className="timeline-panel">
                                                                <h4>
                                                                    <b>{register.class.name}</b>
                                                                </h4>
                                                                <div
                                                                    className="timeline-body">
                                                                    <div
                                                                        className="flex-row-center">
                                                                        <i className="material-icons">access_time</i>
                                                                        <b>&nbsp; &nbsp; {register.class.study_time} </b>
                                                                    </div>
                                                                    <div
                                                                        className="flex-row-center">
                                                                        <i className="material-icons">home</i>&nbsp; &nbsp;
                                                                        {register.class.room && register.class.room + ' - '}
                                                                        {register.class.base}
                                                                    </div>
                                                                    <div
                                                                        className="flex-row-center">
                                                                        <i className="material-icons">date_range</i>&nbsp; &nbsp; {register.class.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                }
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab"
                                 id="headingFour">
                                <a className="collapsed" role="button"
                                   data-toggle="collapse"
                                   data-parent="#accordion"
                                   href="#collapseFour"
                                   aria-expanded="false"
                                   aria-controls="collapseFour">
                                    <h4 className="panel-title">
                                        Lịch sử gọi điện
                                        <i className="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>

                            <div id="collapseFour"
                                 className="panel-collapse collapse"
                                 role="tabpanel"
                                 aria-labelledby="headingFour"
                                 aria-expanded="false"
                                 style={{height: '0px'}}>
                                {
                                    this.props.isLoadingHistoryCall ?
                                        <Loading/> :
                                        <ul className="timeline timeline-simple">
                                            {
                                                this.props.historyCall.map((history, index) => {
                                                    let btn = '';
                                                    if (history.call_status === 'success') {
                                                        btn = ' success';
                                                    } else if (history.call_status === 'failed') {
                                                        btn = ' danger';
                                                    } else if (history.call_status === 'calling') {
                                                        btn = ' info';
                                                    }

                                                    return (
                                                        <li className="timeline-inverted"
                                                            key={index}>
                                                            <div
                                                                className={"timeline-badge " + btn}>
                                                                <i className="material-icons">phone</i>
                                                            </div>
                                                            <div
                                                                className="timeline-panel">
                                                                <div
                                                                    className="timeline-heading">
                                                                                    <span
                                                                                        className="label label-default"
                                                                                        style={{backgroundColor: '#' + history.caller.color}}>
                                                                                        {history.caller.name}</span>
                                                                    <span
                                                                        className="label label-default">{history.updated_at}</span>
                                                                </div>
                                                                <div
                                                                    className="timeline-body">
                                                                    {history.note}
                                                                </div>
                                                                {
                                                                    history.appointment_payment &&
                                                                    <div
                                                                        className="timeline-body">
                                                                        Hẹn
                                                                        nộp
                                                                        tiền: {history.appointment_payment}
                                                                    </div>
                                                                }
                                                                {
                                                                    history.date_test &&
                                                                    <div
                                                                        className="timeline-body">
                                                                        Hẹn nộp
                                                                        tiền: {history.date_test}
                                                                    </div>
                                                                }

                                                            </div>

                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                }
                            </div>
                        </div>

                        <br/>
                        <div className="form-group label-floating is-empty">
                            <label className="control-label">Ghi chú</label>
                            <input type="text" className="form-control"
                                   value={this.state.note}
                                   onChange={(event) => this.setState({note: event.target.value})}/>
                            <span className="material-input"/>
                            <span className="material-input"/></div>
                        <FormInputDate
                            label="Hẹn nộp tiền"
                            name="appointmentPayment"
                            updateFormData={(event) => {
                                this.setState({appointmentPayment: event.target.value});
                            }}
                            id="form-appointment_payment"
                            value={this.state.appointmentPayment}
                        />
                        <FormInputDate
                            label="Hẹn kiểm tra"
                            name="dateTest"
                            updateFormData={(event) => {
                                this.setState({dateTest: event.target.value});
                            }}
                            id="form-date_test"
                            value={this.state.dateTest}
                        />
                        {this.props.isChangingStatus ?
                            (
                                <div>
                                    <button type="button"
                                            className="btn btn-success btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        Đang cập nhật
                                    </button>
                                    <button type="button"
                                            className="btn btn-danger btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        Đang cập nhật
                                    </button>
                                </div>

                            )
                            :
                            (
                                this.props.isLoadingHistoryCall ?
                                    (
                                        <div>
                                            <button type="button"
                                                    className="btn btn-success btn-round disabled"
                                                    data-dismiss="modal"
                                            >
                                                <i className="material-icons">phone</i>
                                                Gọi thành công
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger btn-round disabled"
                                                    data-dismiss="modal"
                                            >
                                                <i className="material-icons">phone</i>
                                                Không gọi được
                                            </button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <button type="button"
                                                    className="btn btn-success btn-round"

                                                    data-dismiss="modal"
                                                    onClick={() => {
                                                        this.changeCallStatusStudent(1, this.state.register.student_id);
                                                    }}>
                                                <i className="material-icons">phone</i>
                                                Gọi thành công
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger btn-round"
                                                    data-dismiss="modal"
                                                    onClick={() => {
                                                        this.changeCallStatusStudent(0, this.state.register.student_id);
                                                    }}>
                                                <i className="material-icons">phone</i>
                                                Không gọi được
                                            </button>
                                        </div>
                                    )


                            )
                        }
                    </Modal.Body>
                    }
                </Modal>
                <Modal show={this.state.showModalChangeClass}
                       onHide={() => {
                           if (!this.props.isChangingClass)
                               this.closeModalChangeClass();
                       }}
                       bsSize="large"
                >
                    <Modal.Header closeButton={!this.props.isChangingClass}>
                        <Modal.Title>Thay đổi lớp đăng kí</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <ListClass
                            classes={this.props.classes}
                            registerId={this.state.selectRegisterId}
                            confirmChangeClass={this.confirmChangeClass}
                            isChangingClass={this.props.isChangingClass}
                        />


                    </Modal.Body>
                </Modal>

                <Modal
                    show={this.props.isLoadingExcel}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>
                <ChangeInfoStudentModal
                    showChangeInfoStudent={this.state.showChangeInfoStudent}
                    onHide={() => {
                        return this.setState({showChangeInfoStudent: false});
                    }}
                    updateData={this.updateModalChangeInfoStudent}
                    commitData={this.commitModalChangeInfoStudent}
                    info={this.state.selectedStudent}
                    isCommitting={this.props.isCommittingInfoStudent}
                />

            </div>
        );
    }

}

RegisterListContainer.propTypes = {
    registers: PropTypes.array.isRequired,
    gens: PropTypes.array.isRequired,
    classes: PropTypes.array.isRequired,
    campaignFilter: PropTypes.array.isRequired,
    classFilter: PropTypes.array.isRequired,
    salerFilter: PropTypes.array.isRequired,
    historyCall: PropTypes.array.isRequired,
    baseFilter: PropTypes.array.isRequired,
    registersByStudent: PropTypes.array.isRequired,
    registerActions: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    telecallId: PropTypes.number.isRequired,
    isLoadingRegisters: PropTypes.bool.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingHistoryCall: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isChangingStatus: PropTypes.bool.isRequired,
    isLoadingClasses: PropTypes.bool.isRequired,
    isChangingClass: PropTypes.bool.isRequired,
    isLoadingRegistersByStudent: PropTypes.bool.isRequired,
    isLoadingClassFilter: PropTypes.bool.isRequired,
    isLoadingSalerFilter: PropTypes.bool.isRequired,
    isLoadingCampaignFilter: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    createRegisterActions: PropTypes.object.isRequired,
    genId: PropTypes.number,
    loadSalerFilter: PropTypes.func,
    loadCampaignFilter: PropTypes.func,
    currentGen: PropTypes.object,
    excel: PropTypes.object,
    isLoadingExcel: PropTypes.bool,
    isCommittingInfoStudent: PropTypes.bool,
    isLoadingBaseFilter: PropTypes.bool,
    isChangingBookmark: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        campaignFilter: state.registerStudents.campaignFilter,
        classFilter: state.registerStudents.classFilter,
        salerFilter: state.registerStudents.salerFilter,
        baseFilter: state.registerStudents.baseFilter,
        registers: state.registerStudents.registers,
        classes: state.registerStudents.classes,
        totalPages: state.registerStudents.totalPages,
        currentPage: state.registerStudents.currentPage,
        totalCount: state.registerStudents.totalCount,
        limit: state.registerStudents.limit,
        telecallId: state.registerStudents.telecallId,
        gens: state.registerStudents.gens,
        registersByStudent: state.registerStudents.registersByStudent,
        historyCall: state.registerStudents.historyCall,
        isLoading: state.registerStudents.isLoading,
        isLoadingGens: state.registerStudents.isLoadingGens,
        isLoadingRegisters: state.registerStudents.isLoadingRegisters,
        isLoadingHistoryCall: state.registerStudents.isLoadingHistoryCall,
        isChangingStatus: state.registerStudents.isChangingStatus,
        isChangingClass: state.registerStudents.isChangingClass,
        isLoadingClasses: state.registerStudents.isLoadingClasses,
        isLoadingRegistersByStudent: state.registerStudents.isLoadingRegistersByStudent,
        isLoadingClassFilter: state.registerStudents.isLoadingClassFilter,
        isLoadingSalerFilter: state.registerStudents.isLoadingSalerFilter,
        isLoadingCampaignFilter: state.registerStudents.isLoadingCampaignFilter,
        isChangingBookmark: state.registerStudents.isChangingBookmark,
        genId: state.registerStudents.genId,
        currentGen: state.registerStudents.currentGen,
        excel: state.registerStudents.excel,
        isLoadingExcel: state.registerStudents.isLoadingExcel,
        isCommittingInfoStudent: state.registerStudents.isCommittingInfoStudent,
        isLoadingBaseFilter: state.registerStudents.isLoadingBaseFilter,
        sources: state.createRegister.sources,
        isLoadingSources: state.createRegister.isLoadingSources,
        statuses: state.infoStudent.statuses,
        isLoadingStudent: state.infoStudent.isLoadingStudent,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,
        selectedBaseId: state.global.selectedBaseId,
        user: state.login.user,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);
