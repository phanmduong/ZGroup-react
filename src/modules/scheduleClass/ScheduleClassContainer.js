/**
 * Created by phanmduong on 8/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import TabStudy from '../../components/common/TabStudy';
import Loading from '../../components/common/Loading';
import FormInputText from '../../components/common/FormInputText';
import ListScheduleClass from './ListScheduleClass';
import * as scheduleClassActions from './scheduleClassActions';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import Select from 'react-select';

class ScheduleClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            scheduleClass: {
                name: '',
                description: '',
                studySessionIds: [],
                id: 0
            },
            optionsSelect: [],
            valueSelected: []
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.addScheduleClass = this.addScheduleClass.bind(this);
        this.deleteScheduleClass = this.deleteScheduleClass.bind(this);
        this.editScheduleClass = this.editScheduleClass.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormDataState = this.updateFormDataState.bind(this);
        this.changeSelectState = this.changeSelectState.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
    }

    componentWillMount() {
        this.props.scheduleClassActions.loadScheduleClass();
        this.props.scheduleClassActions.loadStudySession();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingStudySession !== this.props.isLoadingStudySession && !nextProps.isLoadingStudySession) {
            let data = [];
            nextProps.studySessions.forEach(studySession => {
                data.push({
                    ...studySession, ...{
                        value: studySession.id,
                        label: studySession.weekday + ': ' + studySession.start_time + ' - ' + studySession.end_time
                    }
                });
            });
            this.setState({optionsSelect: data});
        }
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-add-schedule-class');
    }

    updateFormDataState(event) {
        const field = event.target.name;
        let scheduleClass = {...this.state.scheduleClass};
        scheduleClass[field] = event.target.value;
        this.setState({
            scheduleClass: scheduleClass
        });
    }

    updateFormData(event) {
        const field = event.target.name;
        let scheduleClass = {...this.props.scheduleClass};
        scheduleClass[field] = event.target.value;
        this.props.scheduleClassActions.updateScheduleClassFormData(scheduleClass);
    }

    changeSelect(value) {
        let seleted = [];
        value.forEach(v => {
            seleted.push(v.id);
        });
        let scheduleClass = {...this.props.scheduleClass};
        scheduleClass.studySessionIds = seleted;
        this.props.scheduleClassActions.updateScheduleClassFormData(scheduleClass);
    }

    changeSelectState(value) {
        let seleted = [];
        value.forEach(v => {
            seleted.push(v.id);
        });
        let scheduleClass = {...this.state.scheduleClass};
        scheduleClass.studySessionIds = seleted;
        this.setState({
            scheduleClass: scheduleClass
        });
    }

    checkValidate(scheduleClass) {
        if (scheduleClass.studySessionIds === undefined || scheduleClass.studySessionIds === null ||
            scheduleClass.studySessionIds.length <= 0) {
            helper.showTypeNotification('Vui lòng chọn ca học', 'warning');
            return false;
        }
        return true;
    }

    addScheduleClass() {
        if ($('#form-add-schedule-class').valid() && this.checkValidate(this.props.scheduleClass)) {
            this.props.scheduleClassActions.addScheduleClass(this.props.scheduleClass);
        }

    }

    editScheduleClass() {
        if ($('#form-edit-schedule-class').valid() && this.checkValidate(this.state.scheduleClass)) {
            this.props.scheduleClassActions.editScheduleClass(this.state.scheduleClass, this.closeModal);
        }
    }

    onClickEdit(scheduleClass) {
        helper.setFormValidation('#form-edit-schedule-class');
        this.setState({
            scheduleClass: {
                ...scheduleClass,
                studySessionIds: scheduleClass.study_session_ids
            },
        });
        this.openModal();
    }

    deleteScheduleClass(scheduleClass) {
        this.props.scheduleClassActions.deleteScheduleClass(scheduleClass.id);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({showModal: true});
    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <TabStudy url="teaching/scheduleclass"/>
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="tab-content">
                                                <h4 className="card-title"><strong style={{marginLeft: 6}}>Danh sách lịch học</strong>
                                                </h4>
                                                <br/>
                                                {this.props.isLoading ? <Loading/> :
                                                    <ListScheduleClass
                                                        scheduleClasses={this.props.scheduleClasses}
                                                        deleteScheduleClass={this.deleteScheduleClass}
                                                        onClickEdit={this.onClickEdit}
                                                    />
                                                }
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="tab-content">
                                                <h4 className="card-title">
                                                    <strong>Tạo lịch học</strong>
                                                </h4>
                                                {this.props.isLoadingStudySession ? <Loading/> :
                                                    (
                                                        <form id="form-add-schedule-class" onSubmit={(e) => {
                                                            e.preventDefault();
                                                        }}>
                                                            <FormInputText
                                                                label="Tên"
                                                                name="name"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.scheduleClass.name}
                                                                required={true}
                                                                type="text"
                                                            />
                                                            <FormInputText
                                                                label="Mô tả"
                                                                name="description"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.scheduleClass.description}
                                                                required={true}
                                                                type="text"
                                                            />
                                                            <Select
                                                                name="form-field-name"
                                                                value={this.props.scheduleClass.studySessionIds}
                                                                options={this.state.optionsSelect}
                                                                onChange={this.changeSelect}
                                                                multi
                                                                placeholder="Chọn ca học"
                                                            />
                                                            {
                                                                this.props.isSaving ?
                                                                    (
                                                                        <button
                                                                            className="btn btn-fill btn-rose disabled"
                                                                        >
                                                                            <i className="fa fa-spinner fa-spin"/> Đang
                                                                            tạo
                                                                        </button>
                                                                    )
                                                                    :
                                                                    <button
                                                                        className="btn btn-fill btn-rose"
                                                                        onClick={this.addScheduleClass}
                                                                    >
                                                                        Tạo
                                                                    </button>
                                                            }
                                                        </form>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa ca học</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-schedule-class" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText
                                label="Tên"
                                name="name"
                                updateFormData={this.updateFormDataState}
                                value={this.state.scheduleClass.name}
                                required={true}
                                type="text"
                            />
                            <FormInputText
                                label="Mô tả"
                                name="description"
                                updateFormData={this.updateFormDataState}
                                value={this.state.scheduleClass.description}
                                required={true}
                                type="text"
                            />
                            <Select
                                name="form-field-name"
                                value={this.state.scheduleClass.studySessionIds}
                                options={this.state.optionsSelect}
                                onChange={this.changeSelectState}
                                multi
                                placeholder="Chọn ca học"
                            />
                            {
                                this.props.isEditing ?
                                    (
                                        <button
                                            className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                        </button>
                                    )
                                    :
                                    <button
                                        className="btn btn-fill btn-rose"
                                        onClick={this.editScheduleClass}
                                    >
                                        Cập nhật
                                    </button>
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ScheduleClassContainer.propTypes = {
    scheduleClassActions: PropTypes.object.isRequired,
    scheduleClasses: PropTypes.array.isRequired,
    scheduleClass: PropTypes.object.isRequired,
    studySessions: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isLoadingStudySession: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        scheduleClasses: state.scheduleClass.scheduleClasses,
        scheduleClass: state.scheduleClass.scheduleClass,
        studySessions: state.scheduleClass.studySessions,
        isLoading: state.scheduleClass.isLoading,
        isSaving: state.scheduleClass.isSaving,
        isEditing: state.scheduleClass.isEditing,
        isLoadingStudySession: state.scheduleClass.isLoadingStudySession
    };
}

function mapDispatchToProps(dispatch) {
    return {
        scheduleClassActions: bindActionCreators(scheduleClassActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleClassContainer);
