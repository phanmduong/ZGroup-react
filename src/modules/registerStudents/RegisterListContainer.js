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

class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            gens: [],
            selectGenId: '',
            showModal: false,
            showModalChangeClass: false,
            register: {},
            note: '',
            campaignId: '',
            selectRegisterId: 0,
            openFilterPanel: false,
            selectedClassId: '',
            selectedSalerId: '',
            paid_status: '',
            class_status: '',
            selectedMoneyFilter: 0,
            selectedClassStatus: 0,
            classFilter:[],
            salerFilter:[],
            campaignFilter:[],
            cardTitle: 'Danh sách đăng kí học',
            moneyFilter:[
                {value: 0, label: 'Tất cả',},
                {value: 1, label: 'Đã nộp',},
                {value: 2, label: 'Chưa nộp',},
            ],
            classStatusFilter:[
                {value: 0, label: 'Tất cả',},
                {value: 1, label: 'Hoạt động',},
                {value: 2, label: 'Chờ',},
            ],
            time:{
                startTime: '',
                endTime: '',
            },
            allClassFilter:[],
        };

        this.isWaitListPage=false;
        this.timeOut = null;
        this.salerId = '';
        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.changeGens = this.changeGens.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openModalChangeClass = this.openModalChangeClass.bind(this);
        this.closeModalChangeClass = this.closeModalChangeClass.bind(this);
        this.viewCall = this.viewCall.bind(this);
        this.changeCallStatusStudent = this.changeCallStatusStudent.bind(this);
        this.deleteRegister = this.deleteRegister.bind(this);
        this.loadRegisterStudentByCampaign = this.loadRegisterStudentByCampaign.bind(this);
        this.confirmChangeClass = this.confirmChangeClass.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.onClassFilterChange = this.onClassFilterChange.bind(this);
        this.onSalerFilterChange = this.onSalerFilterChange.bind(this);
        this.onCampaignFilterChange = this.onCampaignFilterChange.bind(this);
        this.onMoneyFilterChange = this.onMoneyFilterChange.bind(this);
        this.onClassStatusFilterChange = this.onClassStatusFilterChange.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
    }


    componentWillMount() {
        this.props.registerActions.loadGensData();
        this.props.registerActions.loadSalerFilter();
        this.props.registerActions.loadCampaignFilter();
        if(this.props.route.path ==='/manage/waitlist'){
            this.isWaitListPage=true;
            this.setState({class_status: 'waiting', cardTitle:'Danh sách chờ', query: ''});
        }
        if (this.props.params.salerId) {
            this.props.registerActions.loadRegisterStudent(1, '', '', this.props.params.salerId, '');
            this.setState({
                page: 1,
                query: '',
                campaignId: '',
                selectGenId: ''
            });
            this.salerId = this.props.params.salerId;
        } else {
            if (this.props.params.genId && this.props.params.campaignId) {
                this.setState({
                    page: 1,
                    query: '',
                    campaignId: this.props.params.campaignId,
                    selectGenId: this.props.params.genId
                });
                this.props.registerActions.loadRegisterStudent(1, this.props.params.genId, '', '', this.props.params.campaignId);
            } else {
                if(this.props.route.path ==='/manage/waitlist'){
                    this.onClassStatusFilterChange({value: 2});
                    //this.props.registerActions.loadRegisterStudent(1,this.state.selectGenId,'','','','','','waiting','','',);
                }else {
                    //this.loadRegisterStudent(1, '');
                }
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingClassFilter && this.props.isLoadingClassFilter) {
            this.setState({
                classFilter: this.getFilter(nextProps.classFilter),
                allClassFilter:this.getFilter(nextProps.classFilter),
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
        if (!nextProps.isLoadingGens && nextProps.isLoadingGens !== this.props.isLoadingGens) {

            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            this.setState({
                gens: gens,
                selectGenId: nextProps.currentGen.id
            });
            this.props.registerActions.loadClassFilter(nextProps.currentGen.id);
        }

        if (!nextProps.isLoadingRegisters && nextProps.isLoadingRegisters !== this.props.isLoadingRegisters) {
            this.setState({
                selectGenId: nextProps.genId
            });
        }

        if (nextProps.params.salerId !== this.props.params.salerId) {
            this.props.registerActions.loadRegisterStudent(1, this.state.selectGenId, '', nextProps.params.salerId, '');
            this.setState({
                page: 1,
                query: '',
                campaignId: '',
                selectedSalerId: nextProps.params.salerId,
            });
            this.salerId = nextProps.params.salerId;
        }else
        if(nextProps.location.pathname != this.props.location.pathname){
            this.setState({page: 1,
                showModal: false,
                showModalChangeClass: false,
                campaignId: '',
                selectRegisterId: 0,
                selectedClassId: '',
                paid_status: '',
                time:{
                    startTime: '',
                    endTime: '',
                },});
            if(nextProps.route.path=='/manage/waitlist'){
                this.isWaitListPage=true;
                this.setState({class_status: 'waiting',  selectedClassStatus: 2, cardTitle:'Danh sách chờ', query: ''});
                this.onClassStatusFilterChange({value: 2});
            }
            else {
                this.onClassStatusFilterChange();
                this.isWaitListPage=false;
                this.setState({ selectedClassStatus : 0, cardTitle: 'Danh sách đăng kí học', query: ''});
                if (this.props.params.salerId) {
                this.props.registerActions.loadRegisterStudent(1, '', '', this.props.params.salerId, '');
                this.setState({
                    page: 1,
                    query: '',
                    campaignId: '',
                    selectGenId: '',
                    class_status: 0,
                });
                this.salerId = this.props.params.salerId;
                 } else {
                if (this.props.params.genId && this.props.params.campaignId) {
                    this.setState({
                        page: 1,
                        query: '',
                        campaignId: this.props.params.campaignId,
                        selectGenId: this.props.params.genId
                    });
                    this.props.registerActions.loadRegisterStudent(1, this.props.params.genId, '', '', this.props.params.campaignId);
                } else {
                    this.props.registerActions.loadRegisterStudent(1,this.state.selectGenId,'','','','','','','','',);
                }
            }
            }
        }
    }

    onClassFilterChange(obj){
        if(obj){
            this.setState({ selectedClassId: obj.value});
        }
        else {
            this.setState({ selectedClassId: ''});
        }
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.selectGenId,
            this.state.query,
            this.salerId,
            this.state.campaignId,
            obj ? obj.value : '',
            this.state.paid_status,
            this.state.class_status,
            this.state.time.startTime,
            this.state.time.endTime,
        );
    }

    onSalerFilterChange(obj){
        if(obj){
            this.setState({ selectedSalerId: obj.value, page: 1});
            this.salerId = obj.value;
        }
        else {
            this.setState({  selectedSalerId: '',page : 1});
            this.salerId = '';
        }
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.selectGenId,
            this.state.query,
            obj ? obj.value : '',
            this.state.campaignId,
            this.state.selectedClassId,
            this.state.paid_status,
            this.state.class_status,
            this.state.time.startTime,
            this.state.time.endTime,
        );
    }

    onCampaignFilterChange(obj){
        if(obj){
            this.setState({campaignId: obj.value});
        }
        else {
            this.setState({campaignId: ''});
        }
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.selectGenId,
            this.state.query,
            this.state.selectedSalerId,
            obj ? obj.value : '',
            this.state.selectedClassId,
            this.state.paid_status,
            this.state.class_status,
            this.state.time.startTime,
            this.state.time.endTime,
        );
    }

    onMoneyFilterChange(obj){
        let num = obj ? obj.value : 0 ;
        let res = '';
        switch(num){
            case 1: {res = 1; break;}
            case 2: {res = 0;break;}
            default: res = '';
        }
        if(obj){
            this.setState({selectedMoneyFilter: obj.value, paid_status: res});
        }
        else {
            this.setState({selectedMoneyFilter: 0, paid_status: res});
        }
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.selectGenId,
            this.state.query,
            this.state.selectedSalerId,
            this.state.campaignId,
            this.state.selectedClassId,
            res,
            this.state.class_status,
            this.state.time.startTime,
            this.state.time.endTime,
        );
    }

    onClassStatusFilterChange(obj, filter){
        let num = obj ? obj.value : 0 ;
        let res = '';
        switch(num){
            case 1: {res = 'active'; break;}
            case 2: {res = 'waiting';break;}
            default: res = '';
        }
        if(obj){
            this.setState({selectedClassStatus: obj.value, class_status: res});
        }
        else {
            this.setState({selectedClassStatus: 0, class_status: res});
        }
        let newfilter = filter ? filter : this.state.allClassFilter;
        if(res==='waiting'){
            newfilter = newfilter.filter(item => (item.type === 'waiting'));
        } else
        if(res==='active'){
            newfilter = newfilter.filter(item => (item.type === 'active'));
        }
        this.setState({classFilter: this.getFilter(newfilter), selectedClassId: ''});
        this.props.registerActions.loadRegisterStudent(
            1,//page
            this.state.selectGenId,
            '',
            this.state.selectedSalerId,
            this.state.campaignId,
            '',
            this.state.paid_status,
            res,
            this.state.time.startTime,
            this.state.time.endTime,
        );
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.registerActions.loadRegisterStudent(
                1,
                this.state.selectGenId,
                this.state.query,
                this.salerId,
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.paid_status,
                this.state.class_status,
                time.startTime,
                time.endTime
                );
            this.setState({time: time, page: 1});
        } else {
            this.setState({time: time});
        }
    }

    getFilter(arr) {
        let data = arr.map(function (obj) {
            return {
                value: obj.id ? obj.id : obj.value,
                label: obj.name ? obj.name : obj.label,
                type: obj.type,
            };
        });
        let bol = data[0] && (data[0].value == '');
        return bol ?  data : [{
            value: '',
            label: 'Tất cả'
        }, ...data];
    }

    getSalerFilter(arr) {
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
        },{
            value: '-1',
            label: 'Không có'
        }, ...data];
    }

    openFilterPanel(){
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState(
            {
                showModal: true,
                note: ''
            }
        );
    }

    closeModalChangeClass() {
        this.setState({showModalChangeClass: false});
    }

    openModalChangeClass(registerId) {
        this.setState({
            showModalChangeClass: true,
            selectRegisterId: registerId
        });
        this.props.registerActions.loadClasses(registerId);
    }

    viewCall(register) {
        this.props.registerActions.loadHistoryCallStudent(register.student_id, register.id);
        this.props.registerActions.loadRegisterByStudent(register.student_id);
        this.setState({register});
        this.openModal();
    }

    loadRegisterStudentByCampaign(campaignId) {
        this.setState({
            page: 1,
            campaignId,
        });
        this.props.registerActions.loadRegisterStudent(1, this.state.selectGenId, this.state.query, this.salerId, campaignId);
    }

    loadRegisterStudent(page, campaignid) {
        this.setState({
            page,
        });
        this.props.registerActions.loadRegisterStudent(page,
            this.state.selectGenId,
            this.state.query,
            this.salerId,
            campaignid ? campaignid : this.state.campaignId,
            this.state.selectedClassId,
            this.state.paid_status,
            this.state.class_status,
            this.state.time.startTime,
            this.state.time.endTime,
            );
    }

    registersSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.registerActions.loadRegisterStudent(1,
                this.state.selectGenId,
                value,
                this.salerId,
                this.state.campaignId,
                this.state.selectedClassId,
                this.state.paid_status,
                this.state.class_status,
                this.state.time.startTime,
                this.state.time.endTime,
            );
        }.bind(this), 500);
    }

    changeGens(value) {
        this.setState({
            page: 1,
            selectGenId: value
        });
        this.props.registerActions.loadRegisterStudent(1, value,
            this.state.query,
            this.salerId,
            this.state.campaignId,
            this.state.selectedClassId,
            this.state.paid_status,
            this.state.class_status,);
        this.props.registerActions.loadClassFilter(value);
    }

    changeCallStatusStudent(callStatus, studentId) {
        this.props.registerActions.changeCallStatusStudent(callStatus, studentId, this.props.telecallId, this.state.selectGenId, this.state.note, this.closeModal);
    }

    deleteRegister(register) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa đăng kí này không?", () => {
            this.props.registerActions.deleteRegisterStudent(register.id);
        });
    }

    confirmChangeClass(classData) {
        this.props.registerActions.confirmChangeClass(this.state.selectRegisterId, classData.id, this.closeModalChangeClass);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">{this.state.cardTitle}</h4>
                            {this.props.isLoadingGens ? <Loading/> :
                                <div>
                                    {
                                        (this.state.selectGenId && this.state.selectGenId > 0) &&
                                        <Select
                                            options={this.state.gens}
                                            onChange={this.changeGens}
                                            value={this.state.selectGenId}
                                            defaultMessage="Chọn khóa học"
                                            name="gens"
                                        />
                                    }
                                    <div className="row">
                                        <Search
                                            className="col-sm-9"
                                            onChange={this.registersSearchChange}
                                            value={this.state.query}
                                            placeholder="Tìm kiếm học viên"
                                        />
                                        <div className="col-sm-3 text-align-right">
                                            <button
                                                onClick={this.openFilterPanel}
                                                className="btn btn-info btn-rose"
                                                disabled={
                                                    this.props.isLoadingGens ||
                                                    this.props.isLoadingClassFilter ||
                                                    this.props.isLoadingRegisters
                                                }
                                            >
                                                <i className="material-icons">filter_list</i>
                                                Lọc
                                            </button>

                                        </div>
                                    </div>
                                    <Panel collapsible expanded={
                                        this.state.openFilterPanel
                                        &&
                                        !(this.props.isLoadingGens ||
                                         this.props.isLoadingClassFilter ||
                                         this.props.isLoading ||
                                         this.props.isLoadingRegisters)
                                    }>
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
                                                    disabled={this.props.isLoadingSalerFilter}
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
                                                    disabled={this.props.isLoadingCampaignFilter}
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
                                        </div>
                                        <div className="row">
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
                                        </div>

                                    </Panel>
                                    {
                                        this.props.isLoadingRegisters || this.props.isLoadingClassFilter || this.props.isLoading ? <Loading/> :
                                            <ListRegister
                                                registers={this.props.registers}
                                                viewCall={this.viewCall}
                                                deleteRegister={this.deleteRegister}
                                                loadRegisterStudentBySaler={this.loadRegisterStudentBySaler}
                                                loadRegisterStudentByCampaign={this.loadRegisterStudentByCampaign}
                                                openModalChangeClass={this.openModalChangeClass}

                                            />
                                    }
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadRegisterStudent(page)}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadRegisterStudent(page)}>{page}</a>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>Thông tin học viên</Modal.Title>
                    </Modal.Header>
                    {this.state.register.name &&
                    <Modal.Body>

                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingOne">

                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                                       aria-expanded="false" aria-controls="collapseOne" className="collapsed">
                                        <h4 className="panel-title">
                                            Thông tin học viên
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseOne" className="panel-collapse collapse" role="tabpanel"
                                     aria-labelledby="headingOne" aria-expanded="false" style={{height: '0px'}}>
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
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingTwo">
                                    <a className="collapsed" role="button" data-toggle="collapse"
                                       data-parent="#accordion" href="#collapseTwo" aria-expanded="false"
                                       aria-controls="collapseTwo">
                                        <h4 className="panel-title">
                                            Thông tin lớp học
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel"
                                     aria-labelledby="headingTwo" aria-expanded="false" style={{height: '0px'}}>
                                    <div className="panel-body">
                                        <div className="flex-row-center">
                                            <i className="material-icons">class</i>
                                            <b>&nbsp; &nbsp;{this.state.register.class.name.trim()} </b></div>
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
                                <div className="panel-heading" role="tab" id="headingThree">
                                    <a className="collapsed" role="button" data-toggle="collapse"
                                       data-parent="#accordion" href="#collapseThree" aria-expanded="false"
                                       aria-controls="collapseThree">
                                        <h4 className="panel-title">
                                            Thông tin đăng kí
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </h4>
                                    </a>
                                </div>

                                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel"
                                     aria-labelledby="headingThree" aria-expanded="false" style={{height: '0px'}}>
                                    {
                                        this.props.isLoadingRegistersByStudent ? <Loading/> :
                                            <ul className="timeline timeline-simple">
                                                {
                                                    this.props.registersByStudent.map(function (register, index) {
                                                        return (
                                                            <li className="timeline-inverted" key={index}>
                                                                <div className="timeline-badge">
                                                                    <img className="circle size-40-px"
                                                                         src={register.class.avatar_url} alt=""/>
                                                                </div>
                                                                <div className="timeline-panel">
                                                                    <h4>
                                                                        <b>{register.class.name}</b>
                                                                    </h4>
                                                                    <div className="timeline-body">
                                                                        <div className="flex-row-center">
                                                                            <i className="material-icons">access_time</i>
                                                                            <b>&nbsp; &nbsp; {register.class.study_time} </b>
                                                                        </div>
                                                                        <div className="flex-row-center">
                                                                            <i className="material-icons">home</i>&nbsp; &nbsp;
                                                                            {register.class.room && register.class.room + ' - '}
                                                                            {register.class.base}
                                                                        </div>
                                                                        <div className="flex-row-center">
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
                                <div className="panel-heading" role="tab" id="headingFour">
                                    <a className="collapsed" role="button" data-toggle="collapse"
                                       data-parent="#accordion" href="#collapseFour" aria-expanded="false"
                                       aria-controls="collapseFour">
                                        <h4 className="panel-title">
                                            Lịch sử gọi điện
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </h4>
                                    </a>
                                </div>

                                <div id="collapseFour" className="panel-collapse collapse" role="tabpanel"
                                     aria-labelledby="headingFour" aria-expanded="false" style={{height: '0px'}}>
                                    {
                                        this.props.isLoadingHistoryCall ? <Loading/> :
                                            <ul className="timeline timeline-simple">
                                                {
                                                    this.props.historyCall.map((history, index) => {
                                                        let btn = '';
                                                        if (history.call_status === 'success') {
                                                            btn = ' success';
                                                        }
                                                        else if (history.call_status === 'failed') {
                                                            btn = ' danger';
                                                        } else if (history.call_status === 'calling') {
                                                            btn = ' info';
                                                        }

                                                        return (
                                                            <li className="timeline-inverted" key={index}>
                                                                <div className={"timeline-badge " + btn}>
                                                                    <i className="material-icons">phone</i>
                                                                </div>
                                                                <div className="timeline-panel">
                                                                    <div className="timeline-heading">
                                                                        <span className="label label-default"
                                                                              style={{backgroundColor: '#' + history.caller.color}}>
                                                                            {history.caller.name}</span> <span
                                                                        className="label label-default">{history.updated_at}</span>
                                                                    </div>
                                                                    <div className="timeline-body">
                                                                        {history.note}
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
                        </div>
                        <br/>
                        <div className="form-group label-floating is-empty">
                            <label className="control-label">Ghi chú</label>
                            <input type="text" className="form-control"
                                   value={this.state.note}
                                   onChange={(event) => this.setState({note: event.target.value})}/>
                            <span className="material-input"/>
                            <span className="material-input"/></div>
                        {this.props.isChangingStatus ?
                            (
                                <div>
                                    <button type="button" className="btn btn-success btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                    <button type="button" className="btn btn-danger btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                </div>

                            )
                            :
                            (
                                this.props.isLoadingHistoryCall ?
                                    (
                                        <div>
                                            <button type="button" className="btn btn-success btn-round disabled"
                                                    data-dismiss="modal"
                                            ><i className="material-icons">phone</i>
                                                Gọi thành công
                                            </button>
                                            <button type="button" className="btn btn-danger btn-round disabled"
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
                                            <button type="button" className="btn btn-success btn-round"
                                                    data-dismiss="modal"
                                                    onClick={() => {
                                                        this.changeCallStatusStudent(1, this.state.register.student_id);
                                                    }}>
                                                <i className="material-icons">phone</i>
                                                Gọi thành công
                                            </button>
                                            <button type="button" className="btn btn-danger btn-round"
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
    registersByStudent: PropTypes.array.isRequired,
    registerActions: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
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
    genId: PropTypes.number,
    loadSalerFilter: PropTypes.func,
    loadCampaignFilter: PropTypes.func,
    currentGen: PropTypes.obj,
};

function mapStateToProps(state) {
    return {
        campaignFilter: state.registerStudents.campaignFilter,
        classFilter: state.registerStudents.classFilter,
        salerFilter: state.registerStudents.salerFilter,
        registers: state.registerStudents.registers,
        classes: state.registerStudents.classes,
        totalPages: state.registerStudents.totalPages,
        currentPage: state.registerStudents.currentPage,
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
        genId: state.registerStudents.genId,
        currentGen: state.registerStudents.currentGen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);