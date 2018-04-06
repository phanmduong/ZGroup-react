/**
 * Created by phanmduong on 8/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TabStudy from '../../components/common/TabStudy';
import Select from '../../components/common/Select';
import Loading from '../../components/common/Loading';
import TimePicker from '../../components/common/TimePicker';
import {DAY_OF_WEEK} from '../../constants/constants';
import ListStudySession from './ListStudySession';
import * as studySessionActions from './studySessionActions';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

class StudySessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            studySession: {
                weekday: '',
                start_time: '',
                end_time: '',
                id: 0
            }
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeDay = this.changeDay.bind(this);
        this.addStudySession = this.addStudySession.bind(this);
        this.deleteStudySession = this.deleteStudySession.bind(this);
        this.editStudySession = this.editStudySession.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormDataState = this.updateFormDataState.bind(this);
        this.changeDayState = this.changeDayState.bind(this);
    }

    componentWillMount() {
        this.props.studySessionActions.loadStudySession();
    }

    updateFormDataState(event) {
        const field = event.target.name;
        let studySession = {...this.state.studySession};
        studySession[field] = event.target.value;
        this.setState({
            studySession: studySession
        });
    }

    updateFormData(event) {
        const field = event.target.name;
        let studySession = {...this.props.studySession};
        studySession[field] = event.target.value;
        this.props.studySessionActions.updateStudySessionFormData(studySession);
    }

    changeDay(value) {
        let studySession = {...this.props.studySession};
        studySession.weekday = value;
        this.props.studySessionActions.updateStudySessionFormData(studySession);
    }

    changeDayState(value) {
        let studySession = {...this.state.studySession};
        studySession.weekday = value;
        this.setState({
            studySession: studySession
        });
    }

    checkValidate(studySession) {
        if (helper.isEmptyInput(studySession.weekday)) {
            helper.showTypeNotification('Vui lòng chọn ngày', 'warning');
            return false;
        }
        if (helper.isEmptyInput(studySession.start_time)) {
            helper.showTypeNotification('Vui lòng thời gian bắt đầu', 'warning');
            return false;
        }
        if (helper.isEmptyInput(studySession.end_time)) {
            helper.showTypeNotification('Vui lòng thời gian kết thúc', 'warning');
            return false;
        }
        return true;
    }

    addStudySession() {
        if (this.checkValidate(this.props.studySession)) {
            this.props.studySessionActions.addStudySession(this.props.studySession);
        }

    }

    editStudySession() {
        if (this.checkValidate(this.state.studySession)) {
            this.props.studySessionActions.editStudySession(this.state.studySession, this.closeModal);
        }
    }

    onClickEdit(studySession) {
        this.setState({
            studySession: studySession
        });
        this.openModal();
    }

    deleteStudySession(studySession) {
        this.props.studySessionActions.deleteStudySession(studySession.id);
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
                    <TabStudy url="manage/studysession"/>
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="tab-content">
                                                <h4 className="card-title">
                                                    <strong style={{marginLeft: 6}}>Danh sách ca học</strong>
                                                </h4>
                                                <br/><br/>
                                                {this.props.isLoading ? <Loading/> :
                                                    <ListStudySession
                                                        studySessions={this.props.studySessions}
                                                        deleteStudySession={this.deleteStudySession}
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
                                                    <strong>Tạo ca học</strong>
                                                </h4>
                                                <Select
                                                    options={DAY_OF_WEEK}
                                                    defaultMessage="Chọn ngày trong tuần"
                                                    onChange={this.changeDay}
                                                    value={this.props.studySession.weekday}
                                                />
                                                <TimePicker
                                                    label="Thời gian bắt đầu"
                                                    value={this.props.studySession.start_time}
                                                    onChange={this.updateFormData}
                                                    name="start_time"
                                                    id="start_time"
                                                />
                                                <TimePicker
                                                    label="Thời gian kết thúc"
                                                    value={this.props.studySession.end_time}
                                                    onChange={this.updateFormData}
                                                    name="end_time"
                                                    id="end_time"
                                                />
                                                {
                                                    this.props.isSaving ?
                                                        (
                                                            <button
                                                                className="btn btn-fill btn-rose disabled"
                                                            >
                                                                <i className="fa fa-spinner fa-spin"/> Đang tạo
                                                            </button>
                                                        )
                                                        :
                                                        <button
                                                            className="btn btn-fill btn-rose"
                                                            onClick={this.addStudySession}
                                                        >
                                                            Tạo
                                                        </button>
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
                        <Select
                            options={DAY_OF_WEEK}
                            defaultMessage="Chọn ngày trong tuần"
                            onChange={this.changeDayState}
                            value={this.state.studySession.weekday}
                        />
                        <TimePicker
                            label="Thời gian bắt đầu"
                            value={this.state.studySession.start_time}
                            onChange={this.updateFormDataState}
                            name="start_time"
                            id="start_time1"
                        />
                        <TimePicker
                            label="Thời gian kết thúc"
                            value={this.state.studySession.end_time}
                            onChange={this.updateFormDataState}
                            name="end_time"
                            id="end_time1"
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
                                    onClick={this.editStudySession}
                                >
                                    Cập nhật
                                </button>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

StudySessionContainer.propTypes = {
    studySessionActions: PropTypes.object.isRequired,
    studySessions: PropTypes.array.isRequired,
    studySession: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        studySessions: state.studySession.studySessions,
        studySession: state.studySession.studySession,
        isLoading: state.studySession.isLoading,
        isSaving: state.studySession.isSaving,
        isEditing: state.studySession.isEditing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studySessionActions: bindActionCreators(studySessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudySessionContainer);
