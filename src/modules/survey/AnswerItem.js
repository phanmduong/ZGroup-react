import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from "react-bootstrap";

class AnswerItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
        this.state = {
            editable: false
        };
    }

    handleChange(e) {
        const answer = {...this.props.answer};
        const field = e.target.name;
        answer[field] = e.target.value;
        this.props.updateAnswerToStore(answer);
    }

    toggleEdit(editable) {
        this.setState({
            editable
        });
    }

    saveAnswer() {
        this.props.saveAnswer(this.props.answer);
        this.toggleEdit(false);
    }

    render() {
        const {answer} = this.props;
        return (
            <div>
                {
                    this.state.editable ? (
                            <div style={{position: "relative", paddingLeft: 50}}>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: 7
                                    }}>
                                    <a onClick={this.saveAnswer}>
                                        <i style={{fontSize: "18px", marginRight: "5px"}}
                                           className="text-success material-icons">done</i>
                                    </a>
                                    <a onClick={() => this.toggleEdit(false)}>
                                        <i style={{color: "#c50000", fontSize: "18px", marginRight: "5px"}}
                                           className="material-icons">clear</i>
                                    </a>
                                </div>
                                <FormControl
                                    value={answer.content}
                                    componentClass="textarea"
                                    style={{height: 100}}
                                    name="content"
                                    onChange={this.handleChange}
                                    placeholder="Sửa nội dung câu trả lời"/>
                            </div>
                        )
                        : (
                            <div>
                                <a onClick={() => this.toggleEdit(true)}>
                                    <i style={{color: "#575757", fontSize: "18px", marginRight: "5px"}}
                                       className="material-icons">edit</i>
                                </a>
                                {answer.content}
                            </div>
                        )
                }
            </div>
        );
    }
}

AnswerItem.propTypes = {
    answer: PropTypes.object.isRequired,
    saveAnswer: PropTypes.func.isRequired,
    updateAnswerToStore: PropTypes.func.isRequired
};

export default AnswerItem;