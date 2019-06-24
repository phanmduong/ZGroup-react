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
import {Modal, OverlayTrigger, Panel, Tooltip} from 'react-bootstrap';
import * as helper from '../../helpers/helper';
import FormInputDate from '../../components/common/FormInputDate';
import moment from "moment";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from '../../constants/constants';
import ChangeInfoStudentModal from "./ChangeInfoStudentModal";
import * as createRegisterActions from './createRegisterActions';
import CreateRegisterModalContainer from './CreateRegisterModalContainer';

// import TooltipButton from '../../components/common/TooltipButton';

import Pagination from "../../components/common/Pagination";

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
            register: {},
            note: '',
            campaignId: '',
            selectRegisterId: 0,
            openFilterPanel: false,
            selectedClassId: '',
            selectedSalerId: '',
            selectedBaseId: '',
            selectedMoneyFilter: '',
            selectedClassStatus: '',
            selectedTeleCallStatus: '',
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
            teleCallStatus: [
                {value: '', label: 'Tất cả̉',},
                {value: '0', label: 'Chưa gọi',},
                {value: '1', label: 'Thành công',},
                {value: '2', label: 'Thất bại',},
            ],
            time: {
                startTime: '',
                endTime: '',
                appointmentPayment: ''
            },
            allClassFilter: [],
            selectedStudent: {},
            query_coupon: "",
            dateTest: ""
        };

        this.isWaitListPage = false;
        this.timeOut = null;
    }

    componentWillMount() {
        this.props.registerActions.loadGensData();
        this.props.registerActions.loadSalerFilter();
        this.props.registerActions.loadCampaignFilter();
        this.props.registerActions.loadBaseFilter();

        if (this.props.location.query && this.props.location.query.call_status) {
            this.setState({selectedTeleCallStatus: this.props.location.query.call_status});
        }
        if (this.props.route.path === '/sales/waitlist') {
            this.isWaitListPage = true;
            this.setState({selectedClassStatus: 'waiting', cardTitle: 'Danh sách chờ', query: ''});
        }
        if (this.props.params.salerId) {
            this.props.registerActions.loadRegisterStudent(1, '', '', this.props.params.salerId, '');
            this.setState({
                page: 1,
                query: '',
                campaignId: '',
                selectGenId: '',
                selectedSalerId: Number(this.props.params.salerId),
            });

        } else {
            if (this.props.params.genId && this.props.params.campaignId) {
                this.props.registerActions.loadRegisterStudent(1, this.props.params.genId, '', '', this.props.params.campaignId);
                this.setState({
                    page: 1,
                    query: '',
                    campaignId: Number(this.props.params.campaignId),
                    selectGenId: Number(this.props.params.genId),
                });

            } else {
                if (this.props.route.path === '/sales/waitlist') {
                    this.onClassStatusFilterChange({value: 'waiting'});
                }
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
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
        if (!nextProps.isLoadingGens && this.props.isLoadingGens) {

            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            const genId = nextProps.params.genId ? nextProps.params.genId : nextProps.currentGen.id;
            this.setState({
                gens: [{id: 0, name: ''}, ...gens],
                selectGenId: this.props.params.genId ? this.props.params.genId : nextProps.currentGen.id
            });

            this.props.registerActions.loadClassFilter(genId);
        }

        if (!nextProps.isLoadingRegisters && this.props.isLoadingRegisters) {
            this.setState({
                selectGenId: nextProps.genId
            });
        }

        if (nextProps.params.salerId && nextProps.params.salerId !== this.props.params.salerId) {
            this.props.registerActions.loadRegisterStudent(
                1,//page
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                Number(nextProps.params.salerId),
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
            this.setState({
                page: 1,
                selectedSalerId: Number(nextProps.params.salerId),
            });
        } else if (nextProps.location.pathname != this.props.location.pathname) {
            this.setState({
                query: '',
                showModal: false,
                showModalChangeClass: false,
                campaignId: '',
                selectRegisterId: 0,
                selectedClassId: '',
                selectedSalerId: '',
                selectedMoneyFilter: '',
                time: {
                    startTime: '',
                    endTime: '',
                    appointmentPayment: ''
                },
            });
            if (nextProps.route.path == '/sales/waitlist') {
                this.isWaitListPage = true;
                this.props.registerActions.loadRegisterStudent(
                    1,//page
                    this.state.selectGenId, '', '', '', '', '',
                    'waiting',
                );
                this.changeClassStatusFilter({value: 'waiting'});
                this.setState({
                    page: 1,
                    selectedClassStatus: 'waiting',
                    cardTitle: 'Danh sách chờ',
                });
            } else {
                this.changeClassStatusFilter({value: ''});
                this.isWaitListPage = false;
                this.setState({
                    page: 1,
                    selectedClassStatus: '',
                    cardTitle: 'Danh sách đăng kí học'
                });
                if (nextProps.params.salerId) {//1
                    this.props.registerActions.loadRegisterStudent(1, '', '', nextProps.params.salerId, '');
                    this.setState({
                        page: 1,
                        campaignId: '',
                        selectGenId: '',
                        selectedClassStatus: '',
                        selectedSalerId: nextProps.params.salerId,
                    });
                } else {//2
                    if (nextProps.params.genId && nextProps.params.campaignId) {
                        this.props.registerActions.loadRegisterStudent(1, nextProps.params.genId, '', '', nextProps.params.campaignId);
                        this.setState({
                            page: 1,
                            campaignId: Number(nextProps.params.campaignId),
                            selectGenId: Number(nextProps.params.genId)
                        });
                    } else {//3
                        this.props.registerActions.loadRegisterStudent(1, this.state.selectGenId);
                        this.setState({
                            page: 1,
                        });
                    }
                }
            }
        }
    }

    onClassFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        }
        if (res != this.state.selectedClassId)
            this.props.registerActions.loadRegisterStudent(
                1,//page
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                this.state.selectedSalerId,
                this.state.campaignId,
                obj ? obj.value : '',
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
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

    onBaseFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        }
        if (res != this.state.selectedBaseId)
            this.props.registerActions.loadRegisterStudent(
                1,//page
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                this.state.selectedSalerId,
                this.state.campaignId,
                '',
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                obj ? obj.value : '',
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
        this.setState({
            selectedBaseId: res,
            page: 1,
            selectedClassId: '',
            classFilter: this.getFilter(this.props.classFilter, res)
        });
    };

    onSalerFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        }
        if (res != this.state.selectedSalerId)
            this.props.registerActions.loadRegisterStudent(
                1,//page
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                obj ? obj.value : '',
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
        this.setState({selectedSalerId: res, page: 1});
    };

    onCampaignFilterChange = (obj) => {
        let res = '';
        if (obj) {
            res = obj.value;
        } else {
            res = '';
        }
        if (res != this.state.campaignId)
            this.props.registerActions.loadRegisterStudent(
                1,//page
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                this.state.selectedSalerId,
                obj ? obj.value : '',
                this.state.selectedClassId,
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
        this.setState({campaignId: res, page: 1});
    };

    onMoneyFilterChange = (obj) => {
        let res = obj ? obj.value : '';
        if (this.state.selectedMoneyFilter != res)
            this.props.registerActions.loadRegisterStudent(
                1,//page
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                this.state.selectedSalerId,
                this.state.campaignId,
                this.state.selectedClassId,
                res,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
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
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.limit,
            this.state.selectGenId,
            this.state.query,
            this.state.selectedSalerId,
            this.state.campaignId,
            '',
            this.state.selectedMoneyFilter,
            res,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.selectedBaseId,
            this.state.time.appointmentPayment,
            this.state.query_coupon,
            this.state.selectedTeleCallStatus
        );

        this.setState({
            classFilter: this.getFilter(newfilter),
            selectedClassId: '',
            selectedClassStatus: res,
            page: 1
        });
    };

    onTeleCallStatusFilterChange = (obj) => {
        let res = obj ? obj.value : '';
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.limit,
            this.state.selectGenId,
            this.state.query,
            this.state.selectedSalerId,
            this.state.campaignId,
            this.state.selectedClassId,
            this.state.selectedMoneyFilter,
            this.state.selectedClassStatus,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.selectedBaseId,
            this.state.time.appointmentPayment,
            this.state.query_coupon,
            res
        );

        this.setState({
            selectedTeleCallStatus: res,
            page: 1
        });
    };

    changeClassStatusFilter = (obj, filter) => {
        let res = obj ? obj.value : '';
        this.setState({selectedClassStatus: res, page: 1});

        let newfilter = filter ? filter : this.state.allClassFilter;
        if (res === 'waiting') {
            newfilter = newfilter.filter(item => (item.type === 'waiting'));
        } else if (res === 'active') {
            newfilter = newfilter.filter(item => (item.type === 'active'));
        }
        this.setState({classFilter: this.getFilter(newfilter), selectedClassId: ''});
    };

    updateFormDate = (event) => {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if ((!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) || event.target.name == 'appointmentPayment') {
            this.setState({time: time, page: 1});
            this.props.registerActions.loadRegisterStudent(
                1,
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                this.state.selectedSalerId,
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                time.startTime,
                time.endTime,
                this.state.selectedBaseId,
                time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
        } else {
            this.setState({time: time});
        }
    };

    getFilter = (arr, base_id) => {
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

    openModalChangeClass = (registerId, isGenNow) => {
        this.setState({
            showModalChangeClass: true,
            selectRegisterId: registerId
        });
        this.props.registerActions.loadClasses(registerId, isGenNow);
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
        this.props.registerActions.loadRegisterStudent(page,
            this.state.limit,
            this.state.selectGenId,
            this.state.query,
            this.state.selectedSalerId,
            this.state.campaignId,
            this.state.selectedClassId,
            this.state.selectedMoneyFilter,
            this.state.selectedClassStatus,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.selectedBaseId,
            this.state.time.appointmentPayment,
            this.state.query_coupon,
            this.state.selectedTeleCallStatus
        );
    };

    registersSearchChange = (value) => {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.registerActions.loadRegisterStudent(1,
                this.state.limit,
                this.state.selectGenId,
                value,
                this.state.selectedSalerId,
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                this.state.query_coupon,
                this.state.selectedTeleCallStatus
            );
        }.bind(this), 500);
    };

    searchByCoupon = (value) => {
        this.setState({
            page: 1,
            query_coupon: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.registerActions.loadRegisterStudent(1,
                this.state.limit,
                this.state.selectGenId,
                this.state.query,
                this.state.selectedSalerId,
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.selectedMoneyFilter,
                this.state.selectedClassStatus,
                this.state.time.startTime,
                this.state.time.endTime,
                this.state.selectedBaseId,
                this.state.time.appointmentPayment,
                value,
                this.state.selectedTeleCallStatus
            );
        }.bind(this), 500);
    };

    changeGens = (value) => {
        this.setState({
            page: 1,
            selectGenId: value
        });
        this.props.registerActions.loadRegisterStudent(1,
            this.state.limit,
            value,
            this.state.query,
            this.state.selectedSalerId,
            this.state.campaignId,
            '',
            this.state.selectedMoneyFilter,
            this.state.selectedClassStatus,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.selectedBaseId,
            this.state.time.appointmentPayment,
            this.state.query_coupon,
            this.state.selectedTeleCallStatus
        );
        this.props.registerActions.loadClassFilter(value);
    };

    changeCallStatusStudent = (callStatus, studentId) => {
        this.props.registerActions.changeCallStatusStudent(callStatus, studentId, this.props.telecallId, this.state.selectGenId, this.state.note, this.closeModal, '', this.state.appointmentPayment, this.state.dateTest);
    }

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
            selectedBaseId: this.state.selectedBaseId,
            appointmentPayment: this.state.time.appointmentPayment,
            query_coupon: this.state.query_coupon,
            exportExcel: this.closeLoadingModal
        });
    }

    closeLoadingModal = () => {

        let json = this.props.excel;
        if (!json || !json.registers || json.registers.length == 0) {
            helper.showErrorNotification("Không có dữ liệu");
            return;
        }
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 22}, {"wch": 22}, {"wch": 25}, {"wch": 12}, {"wch": 8}, {"wch": 22}, {"wch": 22}, {"wch": 15}, {"wch": 22},];//độ rộng cột
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
                    'Lớp': item.class ? item.class.name : '',
                    'Gọi': titleCall,
                    'Họ tên': item.name,
                    'Email': item.email,
                    'Phone': item.phone,
                    'Mã thẻ': item.code,
                    'Học phí': item.money,
                    'Saler': item.saler ? item.saler.name : "Không có",
                    'Chiến dịch': item.campaign ? item.campaign.name : "Không có",
                    'Cách tiếp cận': item.how_know ? item.how_know : "",
                    'Ngày đăng kí': item.created_at,
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

    addLeadSuccess = () => {
        this.props.registerActions.loadRegisterStudent(
            this.state.page,//page
            this.state.limit,
            this.state.selectGenId,
            this.state.query,
            this.state.selectedSalerId,
            this.state.campaignId,
            this.state.selectedClassId,
            this.state.selectedMoneyFilter,
            this.state.selectedClassStatus,
            this.state.time.startTime,
            this.state.time.endTime,
            this.state.selectedBaseId,
            this.state.time.appointmentPayment,
            this.state.query_coupon,
            this.state.selectedTeleCallStatus
        );
    };

    addMyLead = (userID) => {
        this.props.registerActions.uploadDistributionLead(userID, this.addLeadSuccess);
    };

    render() {
        const Filter = <Tooltip id="tooltip">Lọc</Tooltip>;
        const Export = <Tooltip id="tooltip">Xuất file excel</Tooltip>;
        const Add = <Tooltip id="tooltip">Thêm</Tooltip>;
        return (
            <div id="page-wrapper">
                <div className="row">
                    <CreateRegisterModalContainer/>
                    <div className="col-sm-3 col-xs-5">
                        {
                            (this.state.selectGenId && this.state.selectGenId >= 0) &&
                            <Select
                                options={this.state.gens}
                                onChange={this.changeGens}
                                value={this.state.selectGenId}
                                defaultMessage="Chọn khóa học"
                                name="gens"
                            />
                        }
                    </div>
                </div>
                <div>
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{display: "flex"}}>
                                        <h4 className="card-title">
                                            <strong>{this.state.cardTitle}</strong>
                                        </h4>
                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={Add}
                                            >
                                                <button
                                                    onClick={this.openCreateRegisterModal}
                                                    className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                    type="button">
                                                    <strong>+</strong>
                                                    <div className="ripple-container"/>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={Filter}
                                            >
                                                <button
                                                    onClick={this.openFilterPanel}
                                                    className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                    disabled={
                                                        this.props.isLoadingGens ||
                                                        this.props.isLoadingClassFilter ||
                                                        this.props.isLoadingBaseFilter ||
                                                        this.props.isLoading ||
                                                        this.props.isLoadingRegisters
                                                    }
                                                >
                                                    <i className="material-icons"
                                                       style={{margin: "0px -4px", top: 0}}
                                                    >filter_list</i>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={Export}
                                        >
                                            <button
                                                onClick={this.showLoadingModal}
                                                className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                disabled={
                                                    this.props.isLoadingGens ||
                                                    this.props.isLoadingClassFilter ||
                                                    this.props.isLoading ||
                                                    this.props.isLoadingRegisters ||
                                                    this.props.isLoadingBaseFilter ||
                                                    this.props.isLoadingExcel
                                                }
                                            >
                                                <i className="material-icons"
                                                   style={{margin: "0px -4px", top: 0}}
                                                >file_download</i>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                {this.props.isLoadingGens ? <Loading/> :
                                    <div>
                                        <div className="row">
                                            <Search
                                                className="col-sm-12"
                                                onChange={this.registersSearchChange}
                                                value={this.state.query}
                                                placeholder="Tìm kiếm học viên"
                                            />
                                        </div>
                                        <Panel collapsible expanded={
                                            this.state.openFilterPanel
                                            &&
                                            !(this.props.isLoadingGens ||
                                                this.props.isLoadingClassFilter ||
                                                this.props.isLoadingBaseFilter ||
                                                this.props.isLoadingRegisters)
                                        }>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label className="">
                                                        Theo cơ sở
                                                    </label>
                                                    <ReactSelect
                                                        disabled={this.props.isLoadingBaseFilter || this.props.isLoading}
                                                        className=""
                                                        options={this.state.baseFilter}
                                                        onChange={this.onBaseFilterChange}
                                                        value={this.state.selectedBaseId}
                                                        defaultMessage="Tuỳ chọn"
                                                        name="filter_base"
                                                    />
                                                </div>
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
                                                <div className="col-md-3 form-group">
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
                                                    <FormInputDate
                                                        label="Từ ngày"
                                                        name="startTime"
                                                        updateFormData={this.updateFormDate}

                                                        id="form-start-time"
                                                        value={this.state.time.startTime}
                                                        maxDate={this.state.time.endTime}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <FormInputDate
                                                        label="Đến ngày"
                                                        name="endTime"
                                                        updateFormData={this.updateFormDate}
                                                        id="form-end-time"
                                                        value={this.state.time.endTime}
                                                        minDate={this.state.time.startTime}
                                                    />
                                                </div>
                                                <div className="col-md-3 form-group">
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
                                                <div className="col-md-3 form-group">
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
                                                        value={this.state.time.appointmentPayment}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <Search
                                                        className="col-sm-12"
                                                        onChange={this.searchByCoupon}
                                                        value={this.state.query_coupon}
                                                        placeholder="Tìm kiếm theo coupon"
                                                    />
                                                </div>
                                            </div>

                                        </Panel>
                                        <div className="row">
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
                                        {
                                            this.props.isLoadingRegisters || this.props.isLoadingClassFilter || this.props.isLoadingBaseFilter ||
                                            this.props.isLoading ?
                                                <Loading/> :
                                                <ListRegister
                                                    genId={this.state.selectGenId}
                                                    registers={this.props.registers}
                                                    isChangingBookmark={this.props.isChangingBookmark}
                                                    viewCall={this.viewCall}
                                                    deleteRegister={this.deleteRegister}
                                                    loadRegisterStudentBySaler={this.loadRegisterStudentBySaler}
                                                    loadRegisterStudentByCampaign={this.loadRegisterStudentByCampaign}
                                                    openModalChangeClass={this.openModalChangeClass}
                                                    openModalChangeInfoStudent={this.openModalChangeInfoStudent}
                                                    changeStatusPause={this.changeStatusPause}
                                                    changeMarkRegister={this.changeMarkRegister}
                                                    addMyLead={this.addMyLead}
                                                />
                                        }
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
                                        {/*<ul className="pagination pagination-primary">*/}
                                        {/*{_.range(1, this.props.totalPages + 1).map(page => {*/}
                                        {/*if (Number(this.state.page) === page) {*/}
                                        {/*return (*/}
                                        {/*<li key={page} className="active">*/}
                                        {/*<a onClick={() => this.loadRegisterStudent(page)}>{page}</a>*/}
                                        {/*</li>*/}
                                        {/*);*/}
                                        {/*} else {*/}
                                        {/*return (*/}
                                        {/*<li key={page}>*/}
                                        {/*<a onClick={() => this.loadRegisterStudent(page)}>{page}</a>*/}
                                        {/*</li>*/}
                                        {/*);*/}
                                        {/*}*/}

                                        {/*})}*/}
                                        {/*</ul>*/}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
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
                                                                        tiền: {history.appointment_payment}
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
                        {this.props.isLoadingClasses ?
                            <Loading/>
                            :
                            <ListClass
                                classes={this.props.classes}
                                confirmChangeClass={this.confirmChangeClass}
                                isChangingClass={this.props.isChangingClass}
                            />

                        }
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
        isLoadingSalerFilter: state.registerStudents.isLoadingClassFilter,
        isLoadingCampaignFilter: state.registerStudents.isLoadingCampaignFilter,
        isChangingBookmark: state.registerStudents.isChangingBookmark,
        genId: state.registerStudents.genId,
        currentGen: state.registerStudents.currentGen,
        excel: state.registerStudents.excel,
        isLoadingExcel: state.registerStudents.isLoadingExcel,
        isCommittingInfoStudent: state.registerStudents.isCommittingInfoStudent,
        isLoadingBaseFilter: state.registerStudents.isLoadingBaseFilter,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);