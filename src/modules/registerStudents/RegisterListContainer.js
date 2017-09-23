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
import {Modal} from 'react-bootstrap';
import * as helper from '../../helpers/helper';

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
            selectRegisterId: 0
        };
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
    }

    componentWillMount() {
        this.props.registerActions.loadGensData();
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
            this.loadRegisterStudent(1, '');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingGens && nextProps.isLoadingGens !== this.props.isLoadingGens) {
            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            this.setState({
                gens: gens,
            });
        }

        if (!nextProps.isLoadingRegisters && nextProps.isLoadingRegisters !== this.props.isLoadingRegisters) {
            this.setState({
                selectGenId: nextProps.genId
            });
        }

        if (nextProps.params.salerId !== this.props.params.salerId) {
            this.props.registerActions.loadRegisterStudent(1, '', '', nextProps.params.salerId, '');
            this.setState({
                page: 1,
                query: '',
                campaignId: '',
            });
            this.salerId = nextProps.params.salerId;
        }
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

    loadRegisterStudent(page) {
        this.setState({
            page,
        });
        this.props.registerActions.loadRegisterStudent(page, this.state.selectGenId, this.state.query, this.salerId, this.state.campaignId);
    }

    registersSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
            campaignId: ''
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.registerActions.loadRegisterStudent(1, this.state.selectGenId, value, this.salerId, '');
        }.bind(this), 500);
    }

    changeGens(value) {
        this.setState({
            page: 1,
            campaignId: '',
            selectGenId: value
        });
        this.props.registerActions.loadRegisterStudent(1, value, this.state.query, this.salerId, '');
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
                            <h4 className="card-title">Danh sách học viên đăng kí</h4>
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
                                    <Search
                                        onChange={this.registersSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm học viên"
                                    />
                                    {
                                        this.props.isLoadingRegisters ? <Loading/> :
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
    historyCall: PropTypes.array.isRequired,
    registersByStudent: PropTypes.array.isRequired,
    registerActions: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    telecallId: PropTypes.number.isRequired,
    isLoadingRegisters: PropTypes.bool.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingHistoryCall: PropTypes.bool.isRequired,
    isChangingStatus: PropTypes.bool.isRequired,
    isLoadingClasses: PropTypes.bool.isRequired,
    isChangingClass: PropTypes.bool.isRequired,
    isLoadingRegistersByStudent: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    genId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        registers: state.registerStudents.registers,
        classes: state.registerStudents.classes,
        totalPages: state.registerStudents.totalPages,
        currentPage: state.registerStudents.currentPage,
        telecallId: state.registerStudents.telecallId,
        gens: state.registerStudents.gens,
        registersByStudent: state.registerStudents.registersByStudent,
        historyCall: state.registerStudents.historyCall,
        isLoadingGens: state.registerStudents.isLoadingGens,
        isLoadingRegisters: state.registerStudents.isLoading,
        isLoadingHistoryCall: state.registerStudents.isLoadingHistoryCall,
        isChangingStatus: state.registerStudents.isChangingStatus,
        isChangingClass: state.registerStudents.isChangingClass,
        isLoadingClasses: state.registerStudents.isLoadingClasses,
        isLoadingRegistersByStudent: state.registerStudents.isLoadingRegistersByStudent,
        genId: state.registerStudents.genId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);