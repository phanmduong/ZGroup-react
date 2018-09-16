import React from 'react';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";
import {bindActionCreators} from "redux";
import Loading from "../../components/common/Loading";
import Select from 'react-select';
import {QUESTION_TYPE} from "../../constants/constants";
import ManyCorrectAnswerComponent from "./questionType/ManyCorrectAnswerComponent";
import OneCorrectAnswerComponent from "./questionType/OneCorrectAnswerComponent";

class EditQuestionModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.changeQuestionType = this.changeQuestionType.bind(this);
        this.renderAnswerEdit = this.renderAnswerEdit.bind(this);
    }

    handleClose() {
        this.props.surveyActions.toggleEditQuestion(false);
    }

    saveQuestion() {
        this.props.surveyActions.saveQuestion(this.props.question);
    }

    handleInputChange(event) {
        const field = event.target.name;
        const question = {...this.props.question};
        question[field] = event.target.value;
        this.props.surveyActions.updateQuestionFormData(question);
    }

    changeQuestionType(option) {
        const question = {...this.props.question};
        question["type"] = option.value;
        this.props.surveyActions.updateQuestionFormData(question);
    }

    renderAnswerEdit(question) {
        switch (question.type) {
            case 1:
                return (<OneCorrectAnswerComponent
                    updateQuestionFormData={this.props.surveyActions.updateQuestionFormData}
                    question={question}/>);
            case 2:
                return (<ManyCorrectAnswerComponent
                    updateQuestionFormData={this.props.surveyActions.updateQuestionFormData}
                    question={question}/>);
        }
    }


    render() {
        const {question, isSavingQuestion} = this.props;
        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Nội dung câu hỏi</ControlLabel>
                        <FormControl
                            style={{height: 100}}
                            componentClass="textarea"
                            name="content"
                            value={question.content}
                            placeholder="Nội dung câu hỏi"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Loại câu hỏi</ControlLabel>
                        <Select
                            clearable={false}
                            placeholder="Loại câu hỏi"
                            value={question.type}
                            name="cardLabels"
                            options={QUESTION_TYPE}
                            onChange={this.changeQuestionType}
                        />
                    </FormGroup>
                    {
                        this.renderAnswerEdit(question)
                    }

                </Modal.Body>
                <Modal.Footer>
                    {
                        isSavingQuestion ? <Loading/> : (
                            <div>
                                <Button
                                    disabled={question.type === undefined || question.type === null || !question.content}
                                    className="btn btn-rose"
                                    onClick={this.saveQuestion}>Lưu</Button>
                                <Button className="btn btn-default" onClick={this.handleClose}>Đóng</Button>
                            </div>
                        )
                    }

                </Modal.Footer>
            </Modal>
        );
    }
}

EditQuestionModalContainer.propTypes = {
    question: PropTypes.object.isRequired,
    surveyActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    isSavingQuestion: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        question: state.survey.question,
        showModal: state.survey.showEditQuestionModal,
        isSavingQuestion: state.survey.isSavingQuestion
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestionModalContainer);