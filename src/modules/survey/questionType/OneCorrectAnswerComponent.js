import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, ListGroup, ListGroupItem} from "react-bootstrap";

class OneCorrectAnswerComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onAnswerChecked = this.onAnswerChecked.bind(this);
        this.state = {
            answer: ""
        };
        this.onChangeAnswerInput = this.onChangeAnswerInput.bind(this);
    }

    onChangeAnswerInput(event) {
        this.setState({
            answer: event.target.value
        });
    }

    onAnswerChecked(index, event) {
        const question = {
            ...this.props.question,
            answers: this.props.question.answers.map((a, i) => {
                if (index === i) {
                    return {
                        ...a,
                        correct: event.target.checked
                    };
                }
                return {
                    ...a,
                    correct: false
                };

            })
        };
        this.props.updateQuestionFormData(question);
    }

    render() {
        const {question} = this.props;
        return (
            <div>
                <ListGroup>
                    {
                        question.answers && question.answers.map((answer, index) => {
                            return (
                                <ListGroupItem key={index}>
                                    <div className="radio">
                                        <label>
                                            <input
                                                checked={answer.correct}
                                                onChange={(event) => this.onAnswerChecked(index, event)}
                                                type="radio"
                                                name="answerChecked"/>
                                            <span className="circle"/>
                                            <span className="check"/>
                                            {answer.content}
                                        </label>
                                    </div>
                                </ListGroupItem>
                            );
                        })
                    }
                    <ListGroupItem>
                        <FormGroup controlId="Câu trả lời" style={{marginTop: 0}}>
                            <ControlLabel>Nội dung câu trả lời</ControlLabel>
                            <FormControl
                                style={{height: 80}}
                                componentClass="textarea"
                                name="content"
                                value={this.state.answer}
                                placeholder="Nội dung câu trả lời"
                                onChange={this.handleInputChange}/>
                        </FormGroup>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

OneCorrectAnswerComponent.propTypes = {
    question: PropTypes.object.isRequired,
    updateQuestionFormData: PropTypes.func.isRequired
};

export default OneCorrectAnswerComponent;