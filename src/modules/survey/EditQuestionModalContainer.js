import React from 'react';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import * as surveyActions from "./surveyActions";
import {bindActionCreators} from "redux";
import Loading from "../../components/common/Loading";

class EditQuestionModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
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
                </Modal.Body>
                <Modal.Footer>
                    {
                        isSavingQuestion ? <Loading/> : (
                            <div>
                                <Button className="btn btn-rose" onClick={this.saveQuestion}>Lưu</Button>
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