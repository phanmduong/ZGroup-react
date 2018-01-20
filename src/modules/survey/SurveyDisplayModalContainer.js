import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import Select from 'react-select';
import * as surveyActions from '../survey/surveyActions';
import {loadAllCourses} from "../marketingCampaign/marketingCampaignApi";

// Import actions here!!

class SurveyDisplayModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: {},
            courses: [],
            isLoadingCourses: true
        };
        this.handleClose = this.handleClose.bind(this);
    }

    async componentWillMount() {
        const res = await loadAllCourses();
        const {courses} = res.data.data;
        this.setState({
            courses: courses.map(({id, name}) => {
                return {
                    value: id,
                    label: name
                };
            }),
            isLoadingCourses: false
        });
    }

    handleClose() {
        this.props.surveyActions.showSurveyDisplaySettingModal(false);
    }

    render() {
        return (
            <Modal show={this.props.showDisplaySettingModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt hiển thị</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        name="start"
                        isLoading={this.state.isLoadingCourses}
                        value={this.state.course}
                        options={this.state.courses}
                        onChange={this.changeStartBoard}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

SurveyDisplayModalContainer.propTypes = {
    showDisplaySettingModal: PropTypes.bool.isRequired,
    surveyActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showDisplaySettingModal: state.survey.showDisplaySettingModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDisplayModalContainer);