import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import Select from 'react-select';
import * as surveyActions from '../survey/surveyActions';
import {loadAllCourses} from "../marketingCampaign/marketingCampaignApi";
import {addSurveyLesson} from "./surveyApi";

// Import actions here!!

class SurveyDisplayModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: {},
            courses: [],
            lesson: {},
            minutesDuration: 0,
            minuteStart: 0,
            isLoadingCourses: true
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleChangeLesson = this.handleChangeLesson.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.saveSurveyLesson = this.saveSurveyLesson.bind(this);
    }

    async componentWillMount() {
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
    }

    saveSurveyLesson() {
        addSurveyLesson(this.props.survey.id, this.state.lesson.value, this.state.minutesDuration, this.state.minuteStart);
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

    render() {
        return (
            <Modal show={this.props.showDisplaySettingModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt hiển thị</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
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
                                                label: lesson.name
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
                            </div>
                        )
                    }


                    <Modal.Footer>
                        <Button
                            disabled={
                                this.state.course === {} || this.state.lesson === {} || !this.state.minutesDuration
                            }
                            className="btn btn-rose" onClick={this.handleClose}>Thêm</Button>
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