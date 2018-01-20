import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import AddAnswerInputContainer from "../AddAnswerInputContainer";
import DeleteAnswerContainer from "../DeleteAnswerContainer";

class ManyCorrectAnswerComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onAnswerChecked = this.onAnswerChecked.bind(this);
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
                return a;
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
                                <ListGroupItem key={index} style={{position: "relative"}}>
                                    <div className="checkbox">
                                        <label>
                                            <input
                                                onChange={(event) => this.onAnswerChecked(index, event)}
                                                checked={answer.correct}
                                                type="checkbox"
                                                name="optionsCheckboxes"/>
                                            <span className="checkbox-material" style={{zIndex: 0}}>
                                                <span className="check"/>
                                            </span> {answer.content}

                                        </label>
                                    </div>
                                    <div style={{
                                        position: "absolute",
                                        right: 15,
                                        top: 10
                                    }}>
                                        <DeleteAnswerContainer answer={answer}/>
                                    </div>
                                </ListGroupItem>
                            );
                        })
                    }
                </ListGroup>
                <AddAnswerInputContainer/>
            </div>
        );
    }
}

ManyCorrectAnswerComponent.propTypes = {
    question: PropTypes.object.isRequired,
    updateQuestionFormData: PropTypes.func.isRequired
};

export default ManyCorrectAnswerComponent;