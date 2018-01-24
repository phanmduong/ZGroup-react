import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import Select from 'react-select';
import * as surveyActions from '../survey/surveyActions';
import {loadAllCourses} from "../marketingCampaign/marketingCampaignApi";
import {addSurveyLesson, loadSurveyLessons, removeSurveyLesson} from "./surveyApi";
import Loading from "../../components/common/Loading";
import {showErrorMessage} from "../../helpers/helper";

// Import actions here!!

class SurveyDisplayModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: {},
            courses: [],
            lesson: {},
            surveyLessons: [],
            minutesDuration: 0,
            minuteStart: 0,
            isSavingSurveyLesson: false,
            isLoadingSurveyLesson: true,
            isLoadingCourses: true
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleChangeLesson = this.handleChangeLesson.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.saveSurveyLesson = this.saveSurveyLesson.bind(this);
        this.removeSurveyLesson = this.removeSurveyLesson.bind(this);
        this.loadSurveyLesson = this.loadSurveyLesson.bind(this);
    }

    // async componentWillMount() {
    //
    //
    // }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.showDisplaySettingModal && !this.props.showDisplaySettingModal) {
            const res = await loadAllCourses();
            const {courses} = res.data.data;
            this.setState({
                courses: courses.map(({id, name, lessons}) => {
                    return {
                        value: id,
                        label: name,
                        lessons
                    };
                }),
                isLoadingCourses: false
            });
            this.loadSurveyLesson();
        }
    }

    async loadSurveyLesson() {
        this.setState({
            isLoadingSurveyLesson: true
        });
        const surveyLessonRes = await loadSurveyLessons(this.props.survey.id);
        this.setState({
            surveyLessons: surveyLessonRes.data.data.survey_lessons,
            isLoadingSurveyLesson: false
        });
    }

    async saveSurveyLesson() {
        this.setState({
            isSavingSurveyLesson: true
        });
        const res = await addSurveyLesson(
            this.props.survey.id,
            this.state.lesson.value,
            this.state.minutesDuration,
            this.state.minuteStart
        );
        this.setState({
            isSavingSurveyLesson: false,
            course: {},
            lesson: {}
        });
        if (res.data.status === 0) {
            showErrorMessage("Lỗi", res.data.message);
        } else {
            this.loadSurveyLesson();
        }
    }

    handleClose() {
        this.props.surveyActions.showSurveyDisplaySettingModal(false);
    }

    handleChangeCourse(course) {
        if (course)
            this.setState({course});
        else this.setState({course: {}});
    }

    handleChangeLesson(lesson) {
        this.setState({lesson});
    }

    handleFormInput(event) {
        let state = {...this.state};
        const field = event.target.name;
        state[field] = event.target.value;
        this.setState(state);
    }

    removeSurveyLesson(lessonId) {
        removeSurveyLesson(this.props.survey.id, lessonId);
        this.setState({
            surveyLessons: this.state.surveyLessons.filter((surveyLesson) => surveyLesson.lesson_id !== lessonId)
        });
    }

    render() {
        return (
            <Modal show={this.props.showDisplaySettingModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt hiển thị</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup style={{marginTop: 0}}>
                        <ControlLabel>Môn học hiển thị</ControlLabel>
                        <Select
                            name="course"
                            isLoading={this.state.isLoadingCourses}
                            value={this.state.course}
                            options={this.state.courses}
                            onChange={this.handleChangeCourse}/>
                    </FormGroup>
                    {
                        this.state.course.lessons && (
                            <div>
                                <FormGroup>
                                    <ControlLabel>Buổi học hiển thị</ControlLabel>
                                    <Select
                                        name="lesson"
                                        isLoading={this.state.isLoadingCourses}
                                        options={this.state.course.lessons.map((lesson) => {
                                            return {
                                                value: lesson.id,
                                                label: "Buổi " + lesson.order + ": " + lesson.name
                                            };
                                        })}
                                        value={this.state.lesson}
                                        onChange={this.handleChangeLesson}
                                    />
                                </FormGroup>
                                <FormGroup controlId="minutesDuration">
                                    <ControlLabel>Thời gian hiển thị (phút)</ControlLabel>
                                    <FormControl
                                        name="minutesDuration"
                                        type="number"
                                        value={this.state.minutesDuration}
                                        placeholder="Thời gian hiển thị (phút)"
                                        onChange={this.handleFormInput}
                                    />
                                </FormGroup>

                                <FormGroup controlId="minuteStart">
                                    <ControlLabel>Thời gian bắt đầu hiển thị (Phút thứ mấy của buổi học)</ControlLabel>
                                    <FormControl
                                        type="number"
                                        name="minuteStart"
                                        value={this.state.minuteStart}
                                        placeholder="Thời gian bắt đầu hiển thị (Phút thứ mấy của buổi học)"
                                        onChange={this.handleFormInput}
                                    />
                                </FormGroup>
                                <Button
                                    disabled={
                                        this.state.isSavingSurveyLesson ||
                                        this.state.course === {} || this.state.lesson === {} || !this.state.minutesDuration
                                    }
                                    className="btn btn-rose" onClick={this.saveSurveyLesson}>
                                    {
                                        this.state.isSavingSurveyLesson &&
                                        <i className="fa fa-spinner fa-spin disabled"/>
                                    }
                                    {" "}Thêm
                                </Button>
                            </div>
                        )
                    }
                    {
                        this.state.isLoadingSurveyLesson ? <Loading/> : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th/>
                                        <th>Môn học</th>
                                        <th>Buổi</th>
                                        <th>Hiển thị lúc</th>
                                        <th>Thời gian hiển thị</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.surveyLessons.map((surveyLesson, index) => {
                                            const tooltip = (
                                                <Tooltip id="tooltip">
                                                    {surveyLesson.lesson.name}
                                                </Tooltip>
                                            );
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img className="image-class-attendance-class-dashboard"
                                                             src={surveyLesson.course.icon_url}/>
                                                    </td>
                                                    <td className="text-rose">
                                                        <OverlayTrigger placement="top" overlay={tooltip}>
                                                            <div>
                                                                Buổi {surveyLesson.lesson.order}
                                                            </div>
                                                        </OverlayTrigger>
                                                    </td>
                                                    <td>{surveyLesson.course.name}</td>
                                                    <td><strong>Phút {surveyLesson.start_time_display}</strong></td>
                                                    <td><strong>{surveyLesson.time_display} phút</strong></td>
                                                    <td>
                                                        <a style={{color: "#575757"}}
                                                           onClick={() => this.removeSurveyLesson(surveyLesson.lesson_id)}>&times;</a>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }


                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        );
    }
}

SurveyDisplayModalContainer.propTypes = {
    showDisplaySettingModal: PropTypes.bool.isRequired,
    surveyActions: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showDisplaySettingModal: state.survey.showDisplaySettingModal,
        survey: state.survey.survey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDisplayModalContainer);