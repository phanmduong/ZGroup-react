import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as surveyActions from "./surveyActions";

class AddAnswerInputContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            answer: {
                content: "",
                correct: false
            }
        };
        this.onChangeAnswerInput = this.onChangeAnswerInput.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    onChangeAnswerInput(event) {
        let value = event.target.value;

        if (!this.state.answer.content) {
            value = value.trim();
        }
        this.setState({
            answer: {
                ...this.state.answer,
                content: value
            }
        });
    }

    onEnterKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            this.props.surveyActions.saveAnswer(this.state.answer);
            this.setState({
                answer: {
                    content: "",
                    correct: false
                }
            });
        }
    }

    render() {
        return (
            <FormGroup controlId="Câu trả lời" style={{marginTop: 0}}>
                <ControlLabel>Thêm câu trả lời</ControlLabel>
                <FormControl
                    disabled={this.props.isSavingQuestion}
                    style={{height: 80}}
                    componentClass="textarea"
                    onKeyPress={this.onEnterKeyPress}
                    name="content"
                    value={this.state.answer.content || ""}
                    placeholder="Nội dung câu trả lời"
                    onChange={this.onChangeAnswerInput}/>
                <div>
                    <small>Bấm <b>Enter</b> để gửi bình luận</small>
                    <br/>
                    <small>Bấm <b>Shift + Enter</b> để xuống dòng</small>
                </div>
            </FormGroup>
        );
    }
}

AddAnswerInputContainer.propTypes = {
    isSavingQuestion: PropTypes.bool.isRequired,
    surveyActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isSavingQuestion: state.survey.isSavingQuestion
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnswerInputContainer);